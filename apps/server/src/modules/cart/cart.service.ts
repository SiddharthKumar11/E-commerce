import Cart, { ICart } from './cart.model';
import Product from '../products/product.model';
import { AppError } from '../../core/AppError';
import redisClient from '../../config/redis';

export class CartService {
    async getCart(userId: string): Promise<ICart> {
        let cart = await Cart.findOne({ user: userId }).populate('items.product', 'name price images inventory');

        if (!cart) {
            cart = await Cart.create({ user: userId, items: [] });
        }

        return cart;
    }

    async addToCart(userId: string, productId: string, quantity: number): Promise<ICart> {
        const product = await Product.findById(productId);

        if (!product) {
            throw new AppError('Product not found', 404);
        }

        if (product.inventory < quantity) {
            throw new AppError('Insufficient inventory', 400);
        }

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = await Cart.create({ user: userId, items: [] });
        }

        const existingItemIndex = cart.items.findIndex(
            (item) => item.product.toString() === productId
        );

        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            cart.items.push({
                product: product._id,
                quantity,
                price: product.price,
                name: product.name,
                image: product.images[0],
            } as any);
        }

        await cart.save();

        // Invalidate cart cache
        await redisClient.del(`cart:${userId}`);

        return cart;
    }

    async updateCartItem(userId: string, productId: string, quantity: number): Promise<ICart> {
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            throw new AppError('Cart not found', 404);
        }

        const itemIndex = cart.items.findIndex((item: any) => item.product.toString() === productId);

        if (itemIndex === -1) {
            throw new AppError('Item not found in cart', 404);
        }

        if (quantity === 0) {
            cart.items.splice(itemIndex, 1);
        } else {
            const product = await Product.findById(productId);
            if (product && product.inventory < quantity) {
                throw new AppError('Insufficient inventory', 400);
            }
            cart.items[itemIndex].quantity = quantity;
        }

        await cart.save();
        await redisClient.del(`cart:${userId}`);

        return cart;
    }

    async removeFromCart(userId: string, productId: string): Promise<ICart> {
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            throw new AppError('Cart not found', 404);
        }

        cart.items = cart.items.filter((item: any) => item.product.toString() !== productId);

        await cart.save();
        await redisClient.del(`cart:${userId}`);

        return cart;
    }

    async clearCart(userId: string): Promise<void> {
        await Cart.findOneAndUpdate({ user: userId }, { items: [], totalAmount: 0 });
        await redisClient.del(`cart:${userId}`);
    }
}
