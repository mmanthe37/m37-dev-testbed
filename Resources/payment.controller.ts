import { Request, Response, NextFunction } from 'express';
import { createCheckoutSession, createBillingPortalSession } from '../services/stripe.service';
import { prisma } from '../lib/prisma';

export const handleCreateCheckoutSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const { priceId, mode } = req.body;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized: User not identified.' });
    }
    if (!priceId || !mode) {
      return res.status(400).json({ error: 'priceId and mode are required.' });
    }

    const session = await createCheckoutSession(userId, priceId, mode);
    res.status(200).json({ success: true, data: { sessionId: session.id, url: session.url } });
  } catch (error) {
    next(error);
  }
};

export const handleCreateBillingPortalSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized: User not identified.' });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { stripeCustomerId: true }
        });

        if (!user?.stripeCustomerId) {
            return res.status(404).json({ error: 'Not Found', message: 'Stripe customer not found for this user.' });
        }

        const portalSession = await createBillingPortalSession(user.stripeCustomerId);
        res.status(200).json({ success: true, data: { url: portalSession.url } });
    } catch (error) {
        next(error);
    }
};