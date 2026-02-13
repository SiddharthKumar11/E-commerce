import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cartService } from '../services/cartService';
import { useCartStore } from '../store/cartStore';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Cart() {
    const { items, totalAmount, setCart } = useCartStore();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const response = await cartService.getCart();
            setCart(response.data.cart.items, response.data.cart.totalAmount);
        } catch (error) {
            toast.error('Failed to load cart');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateQuantity = async (productId: string, quantity: number) => {
        if (quantity < 1) return;
        try {
            const response = await cartService.updateCartItem(productId, quantity);
            setCart(response.data.cart.items, response.data.cart.totalAmount);
            toast.success('Cart updated');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to update cart');
        }
    };

    const handleRemove = async (productId: string) => {
        try {
            const response = await cartService.removeFromCart(productId);
            setCart(response.data.cart.items, response.data.cart.totalAmount);
            toast.success('Item removed');
        } catch (error) {
            toast.error('Failed to remove item');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">Loading cart...</p>
                </div>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <div className="max-w-md mx-auto">
                    <ShoppingBag className="mx-auto text-gray-400 dark:text-gray-600 mb-6" size={80} />
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Your cart is empty</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">Looks like you haven't added anything to your cart yet</p>
                    <Link to="/products" className="btn-primary inline-flex items-center space-x-2">
                        <span>Continue Shopping</span>
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item: any) => (
                        <div key={item.product._id} className="card">
                            <div className="flex items-center space-x-4">
                                <img
                                    src={item.image || 'https://via.placeholder.com/150'}
                                    alt={item.name}
                                    className="w-24 h-24 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">{item.name}</h3>
                                    <p className="text-gray-600 dark:text-gray-400">${item.price}</p>
                                </div>

                                {/* Quantity Controls */}
                                <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                                    <button
                                        onClick={() => handleUpdateQuantity(item.product._id || item.product, item.quantity - 1)}
                                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="w-12 text-center font-semibold text-gray-900 dark:text-white">{item.quantity}</span>
                                    <button
                                        onClick={() => handleUpdateQuantity(item.product._id || item.product, item.quantity + 1)}
                                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>

                                {/* Price & Remove */}
                                <div className="text-right">
                                    <p className="font-bold text-xl text-gray-900 dark:text-white mb-2">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                    <button
                                        onClick={() => handleRemove(item.product._id || item.product)}
                                        className="text-error hover:text-error-700 transition-colors"
                                        title="Remove item"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="card sticky top-24">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                <span>Subtotal ({items.length} items)</span>
                                <span className="font-semibold">${totalAmount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                <span>Shipping</span>
                                <span className="font-semibold text-success">Free</span>
                            </div>
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                                <span>Total</span>
                                <span>${totalAmount.toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/checkout')}
                            className="w-full btn-primary flex items-center justify-center space-x-2 mb-4"
                        >
                            <span>Proceed to Checkout</span>
                            <ArrowRight size={18} />
                        </button>

                        <Link
                            to="/products"
                            className="w-full btn-secondary flex items-center justify-center"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
