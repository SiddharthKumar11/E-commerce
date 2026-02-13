import { useState, useEffect } from 'react';
import { orderService } from '../services/orderService';
import { Package, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Orders() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await orderService.getOrders();
            setOrders(response.data.orders);
        } catch (error) {
            toast.error('Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        const colors: any = {
            PENDING: 'bg-yellow-100 text-yellow-800',
            PAID: 'bg-blue-100 text-blue-800',
            PROCESSING: 'bg-purple-100 text-purple-800',
            SHIPPED: 'bg-indigo-100 text-indigo-800',
            DELIVERED: 'bg-green-100 text-green-800',
            CANCELLED: 'bg-red-100 text-red-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    if (loading) {
        return <div className="text-center py-12">Loading orders...</div>;
    }

    if (orders.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                <Package size={64} className="mx-auto text-gray-400 mb-4" />
                <h2 className="text-2xl font-bold mb-4">No orders yet</h2>
                <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold mb-8">My Orders</h1>
            <div className="space-y-4">
                {orders.map((order) => (
                    <div key={order._id} className="card">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-sm text-gray-600">Order ID: {order._id}</p>
                                <div className="flex items-center text-sm text-gray-600 mt-1">
                                    <Calendar size={14} className="mr-1" />
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                {order.status}
                            </span>
                        </div>
                        <div className="space-y-2">
                            {order.items.map((item: any, index: number) => (
                                <div key={index} className="flex justify-between items-center">
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src={item.image || '/placeholder.jpg'}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                        <div>
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                        <div className="border-t mt-4 pt-4 flex justify-between items-center">
                            <span className="font-semibold">Total</span>
                            <span className="text-xl font-bold text-primary-600">${order.totalAmount.toFixed(2)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
