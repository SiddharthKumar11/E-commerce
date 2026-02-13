import { Request, Response, NextFunction } from 'express';
import { AppError } from '../core/AppError';
import { verifyAccessToken } from '../utils/jwt.utils';

export interface AuthRequest extends Request {
    user?: {
        userId: string;
        email: string;
        role: string;
    };
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new AppError('No token provided', 401);
        }

        const token = authHeader.split(' ')[1];

        const decoded = verifyAccessToken(token);

        (req as AuthRequest).user = decoded;

        next();
    } catch (error: any) {
        if (error.name === 'JsonWebTokenError') {
            return next(new AppError('Invalid token', 401));
        }
        if (error.name === 'TokenExpiredError') {
            return next(new AppError('Token expired', 401));
        }
        next(error);
    }
};

export const authorize = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as AuthRequest).user;

        if (!user || !roles.includes(user.role)) {
            return next(new AppError('You do not have permission to perform this action', 403));
        }

        next();
    };
};
