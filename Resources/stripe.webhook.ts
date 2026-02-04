import Stripe from 'stripe';
import { Request, Response } from 'express';
import { stripe } from '../services/stripe.service';
import { prisma } from '../lib/prisma';

/**
 * Handles incoming webhooks from Stripe.
 * Verifies the signature and routes the event to the appropriate handler.
 */
export const handleStripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error(`Webhook signature verification failed: ${errorMessage}`);
    return res.status(400).send(`Webhook Error: ${errorMessage}`);
  }

  console.log(`Received Stripe event: ${event.type}`);

  // Route event to specific handler
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        await handleSubscriptionChange(event.data.object as Stripe.Subscription);
        break;
      default:
        console.warn(`Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error(`Error handling event ${event.type}:`, error);
    return res.status(500).json({ error: 'Webhook handler failed.' });
  }

  res.status(200).json({ received: true });
};

/**
 * Handles the 'checkout.session.completed' event.
 * This is where a subscription is first created in our database.
 */
const handleCheckoutSessionCompleted = async (session: Stripe.Checkout.Session) => {
  const userId = session.metadata?.internalUserId;
  const stripeSubscriptionId = session.subscription as string;

  if (!userId || !stripeSubscriptionId) {
    throw new Error('Missing metadata from checkout session.');
  }

  const subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId);
  
  const priceId = subscription.items.data[0]?.price.id;
  const tier = subscription.items.data[0]?.price.lookup_key; // Assumes you set lookup_keys like 'pro_tier' in Stripe

  if (!tier) {
    throw new Error(`Price ID ${priceId} does not have a lookup_key for tier.`);
  }

  await prisma.subscription.create({
    data: {
      userId: userId,
      tier: tier,
      status: subscription.status,
      stripeSubscriptionId: subscription.id,
      stripePriceId: priceId,
      stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
    },
  });

  // Most importantly, update the user's tier
  await prisma.user.update({
    where: { id: userId },
    data: { tier: tier },
  });
};

/**
 * Handles subscription updates or cancellations.
 * This keeps our system in sync with changes made in the Stripe Billing Portal.
 */
const handleSubscriptionChange = async (subscription: Stripe.Subscription) => {
  const stripeSubscriptionId = subscription.id;

  const newStatus = subscription.status;
  const tier = subscription.items.data[0]?.price.lookup_key;

  if (!tier) {
      console.warn(`Subscription ${stripeSubscriptionId} has no tier lookup_key. Skipping update.`);
      return;
  }

  await prisma.subscription.update({
    where: { stripeSubscriptionId: stripeSubscriptionId },
    data: {
      status: newStatus,
      stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
      stripePriceId: subscription.items.data[0]?.price.id,
      tier: tier,
    },
  });

  // If the subscription is no longer active, downgrade the user to the free tier.
  // We check for 'canceled' status specifically if `cancel_at_period_end` is false.
  if (newStatus !== 'active' && newStatus !== 'trialing') {
    const dbSubscription = await prisma.subscription.findUnique({
        where: { stripeSubscriptionId },
        select: { userId: true }
    });

    if (dbSubscription) {
        await prisma.user.update({
            where: { id: dbSubscription.userId },
            data: { tier: 'free' },
        });
    }
  }
};