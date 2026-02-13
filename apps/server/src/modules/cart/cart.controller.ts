import { Request, Response, NextFunction } from 'express';
import { CartService } from './cart.service';
import { AuthRequest } from '../../middleware/auth.middleware';

const cartService = new CartService();

export const getCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as AuthRequest).user?.userId;

        if (!userId) {
            throw new Error('User not authenticated');
        }

        const cart = await cartService.getCart(userId);

        res.status(200).json({
            status: 'success',
            data: { cart },
        });
    } catch (error) {
        next(error);
    }
};

export const addToCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as AuthRequest).user?.userId;
        const { productId, quantity } = req.body;

        if (!userId) {
            throw new Error('User not authenticated');
        }

        const cart = await cartService.addToCart(userId, productId, quantity || 1);

        res.status(200).json({
            status: 'success',
            data: { cart },
        });
    } catch (error) {
        next(error);
    }
};

export const updateCartItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as AuthRequest).user?.userId;
        const { productId } = req.params;
        const { quantity } = req.body;

        if (!userId) {
            throw new Error('User not authenticated');
        }

        const cart = await cartService.updateCartItem(userId, productId, quantity);

        res.status(200).json({
            status: 'success',
            data: { cart },
        });
    } catch (error) {
        next(error);
    }
};

export const removeFromCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as AuthRequest).user?.userId;
        const { productId } = req.params;

        if (!userId) {
            throw new Error('User not authenticated');
        }

        const cart = await cartService.removeFromCart(userId, productId);

        res.status(200).json({
            status: 'success',
            data: { cart },
        });
    } catch (error) {
        next(error);
    }
};

export const clearCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as AuthRequest).user?.userId;

        if (!userId) {
            throw new Error('User not authenticated');
        }

        await cartService.clearCart(userId);

        res.status(200).json({
            status: 'success',
            message: 'Cart cleared successfully',
        });
    } catch (error) {
        next(error);
    }
};
