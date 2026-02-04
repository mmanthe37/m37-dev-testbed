import Stripe from 'stripe';
import { prisma } from '../lib/prisma';
import { User } from '@prisma/client';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
  typescript: true,
});

/**
 * Finds a Stripe Customer by their ID or creates a new one if they don't exist.
 * This function is idempotent and ensures a user has one and only one Stripe Customer object.
 * @param userId The internal UUID of the user.
 * @returns The Stripe Customer object.
 */
export const findOrCreateStripeCustomer = async (userId: string): Promise<Stripe.Customer> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error(`User with ID ${userId} not found.`);
  }

  if (user.stripeCustomerId) {
    try {
      const customer = await stripe.customers.retrieve(user.stripeCustomerId);
      if (!customer.deleted) {
        return customer;
      }
    } catch (error) {
      console.warn(`Could not retrieve Stripe customer ${user.stripeCustomerId}. A new one will be created.`);
    }
  }

  // Create a new Stripe Customer
  const customer = await stripe.customers.create({
    email: user.email,
    name: user.displayName,
    metadata: {
      internalUserId: userId,
      walletAddress: user.walletAddress || 'N/A',
    },
  });

  // Update our database with the new Stripe Customer ID
  await prisma.user.update({
    where: { id: userId },
    data: { stripeCustomerId: customer.id },
  });

  return customer;
};

/**
 * Creates a Stripe Checkout Session for a one-time payment or subscription.
 * @param userId The user initiating the checkout.
 * @param priceId The ID of the Stripe Price object.
 * @param mode The mode of the checkout session ('subscription' or 'payment').
 * @returns The created Stripe Checkout Session object.
 */
export const createCheckoutSession = async (userId: string, priceId: string, mode: 'subscription' | 'payment'): Promise<Stripe.Checkout.Session> => {
  const customer = await findOrCreateStripeCustomer(userId);
  const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode,
    customer: customer.id,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${CLIENT_URL}/dashboard/billing?status=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${CLIENT_URL}/dashboard/billing?status=cancelled`,
    metadata: {
      internalUserId: userId,
    }
  });

  return session;
};

/**
 * Creates a Stripe Billing Portal Session for a customer to manage their subscription.
 * @param customerId The Stripe Customer ID.
 * @returns The created Stripe Billing Portal Session object.
 */
export const createBillingPortalSession = async (customerId: string): Promise<Stripe.BillingPortal.Session> => {
    const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
    
    const portalSession = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: `${CLIENT_URL}/dashboard/billing`,
    });

    return portalSession;
};