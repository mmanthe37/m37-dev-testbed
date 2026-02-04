import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3001';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        tier: string;
        [key: string]: any;
      };
    }
  }
}

/**
 * Real Authentication Middleware.
 * This middleware performs an RPC call to the Authentication Service to verify
 * the JWT and fetches the fresh user object, including their subscription tier.
 */
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized', message: 'No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const response = await axios.post(`${AUTH_SERVICE_URL}/verify-token`, { token });
    
    if (response.data.valid && response.data.user) {
      req.user = response.data.user; // Attach the fresh user object to the request
      next();
    } else {
      throw new Error('Invalid token response from Auth Service.');
    }
  } catch (error) {
    console.error('Token verification failed:', error);
    if (axios.isAxiosError(error) && error.response) {
        return res.status(error.response.status).json(error.response.data);
    }
    return res.status(401).json({ error: 'Unauthorized', message: 'Invalid or expired token.' });
  }
};