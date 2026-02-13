import mongoose from 'mongoose';
import Order, { IOrder } from './order.model';
import Cart from '../cart/cart.model';
import Product from '../products/product.model';
import { AppError } from '../../core/AppError';
import Logger from '../../core/Logger';

interface CreateOrderData {
    userId: string;
    paymentMethod: string;
    shippingAddress: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
}

export class OrderService {
    async createOrder(data: CreateOrderData): Promise<IOrder> {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            // Get user's cart
            const cart = await Cart.findOne({ user: data.userId }).session(session);

            if (!cart || cart.items.length === 0) {
                throw new AppError('Cart is empty', 400);
            }

            // Verify inventory and prepare bulk operations
            const bulkOps = [];
            for (const item of cart.items) {
                const product = await Product.findById(item.product).session(session);

                if (!product) {
                    throw new AppError(`Product ${item.name} not found`, 404);
                }

                if (product.inventory < item.quantity) {
                    throw new AppError(`Insufficient inventory for ${item.name}`, 400);
                }

                bulkOps.push({
                    updateOne: {
                        filter: { _id: item.product },
                        update: { $inc: { inventory: -item.quantity } },
                    },
                });
            }

            // Create order
            const order = await Order.create(
                [
                    {
                        user: data.userId,
                        items: cart.items,
                        totalAmount: cart.totalAmount,
                        paymentMethod: data.paymentMethod,
                        shippingAddress: data.shippingAddress,
                        status: 'PENDING',
                    },
                ],
                { session }
            );

            // Update inventory
            await Product.bulkWrite(bulkOps, { session });

            // Clear cart
            await Cart.findOneAndUpdate({ user: data.userId }, { items: [], totalAmount: 0 }, { session });

            await session.commitTransaction();

            Logger.info(`Order created: ${order[0]._id}`);

            return order[0];
        } catch (error) {
            await session.abortTransaction();
            Logger.error('Order creation failed:', error);
            throw error;
        } finally {
            session.endSession();
        }
    }

    async getOrders(userId: string): Promise<IOrder[]> {
        return await Order.find({ user: userId }).sort({ createdAt: -1 });
    }

    async getOrderById(orderId: string, userId: string): Promise<IOrder> {
        const order = await Order.findOne({ _id: orderId, user: userId });

        if (!order) {
            throw new AppError('Order not found', 404);
        }

        return order;
    }

    async updateOrderStatus(orderId: string, status: string, note?: string): Promise<IOrder> {
        const order = await Order.findById(orderId);

        if (!order) {
            throw new AppError('Order not found', 404);
        }

        order.status = status as any;
        if (note) {
            order.statusHistory.push({
                status,
                timestamp: new Date(),
                note,
            });
        }

        await order.save();

        Logger.info(`Order ${orderId} status updated to ${status}`);

        return order;
    }

    async cancelOrder(orderId: string, userId: string): Promise<IOrder> {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const order = await Order.findOne({ _id: orderId, user: userId }).session(session);

            if (!order) {
                throw new AppError('Order not found', 404);
            }

            if (order.status !== 'PENDING' && order.status !== 'PAID') {
                throw new AppError('Order cannot be cancelled', 400);
            }

            // Restore inventory
            const bulkOps = order.items.map((item) => ({
                updateOne: {
                    filter: { _id: item.product },
                    update: { $inc: { inventory: item.quantity } },
                },
            }));

            await Product.bulkWrite(bulkOps, { session });

            order.status = 'CANCELLED';
            await order.save({ session });

            await session.commitTransaction();

            Logger.info(`Order ${orderId} cancelled`);

            return order;
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }
}
