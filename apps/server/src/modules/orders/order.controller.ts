import { Request, Response, NextFunction } from 'express';
import { OrderService } from './order.service';
import { AuthRequest } from '../../middleware/auth.middleware';

const orderService = new OrderService();

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as AuthRequest).user?.userId;
        const { paymentMethod, shippingAddress } = req.body;

        if (!userId) {
            throw new Error('User not authenticated');
        }

        const order = await orderService.createOrder({
            userId,
            paymentMethod,
            shippingAddress,
        });

        res.status(201).json({
            status: 'success',
            data: { order },
        });
    } catch (error) {
        next(error);
    }
};

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as AuthRequest).user?.userId;

        if (!userId) {
            throw new Error('User not authenticated');
        }

        const orders = await orderService.getOrders(userId);

        res.status(200).json({
            status: 'success',
            data: { orders },
        });
    } catch (error) {
        next(error);
    }
};

export const getOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as AuthRequest).user?.userId;
        const { id } = req.params;

        if (!userId) {
            throw new Error('User not authenticated');
        }

        const order = await orderService.getOrderById(id, userId);

        res.status(200).json({
            status: 'success',
            data: { order },
        });
    } catch (error) {
        next(error);
    }
};

export const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { status, note } = req.body;

        const order = await orderService.updateOrderStatus(id, status, note);

        res.status(200).json({
            status: 'success',
            data: { order },
        });
    } catch (error) {
        next(error);
    }
};

export const cancelOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as AuthRequest).user?.userId;
        const { id } = req.params;

        if (!userId) {
            throw new Error('User not authenticated');
        }

        const order = await orderService.cancelOrder(id, userId);

        res.status(200).json({
            status: 'success',
            data: { order },
        });
    } catch (error) {
        next(error);
    }
};
