import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Wishlist() {
    // Mock wishlist data - will be replaced with actual data from backend
    const wishlistItems = [
        {
            id: '1',
            name: 'Premium Headphones',
            price: 299,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
            inStock: true,
            rating: 4.8
        },
        {
            id: '2',
            name: 'Smart Watch',
            price: 399,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
            inStock: true,
            rating: 4.9
        },
        {
            id: '3',
            name: 'Wireless Speaker',
            price: 199,
            image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
            inStock: false,
            rating: 4.7
        }
    ];

    const handleRemove = (id: string) => {
        // Will be implemented with backend
        console.log('Remove from wishlist:', id);
    };

    const handleAddToCart = (id: string) => {
        // Will be implemented with backend
        console.log('Add to cart:', id);
    };

    if (wishlistItems.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center animate-fadeIn">
                <div className="max-w-md mx-auto">
                    <Heart className="mx-auto text-gray-400 dark:text-gray-600 mb-6" size={80} />
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Your wishlist is empty</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        Save items you love for later by clicking the heart icon
                    </p>
                    <Link to="/products" className="btn-primary inline-block">
                        Browse Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">My Wishlist</h1>
                    <p className="text-gray-600 dark:text-gray-400">{wishlistItems.length} items saved</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlistItems.map((item) => (
                    <div key={item.id} className="card-product group relative">
                        {/* Remove Button */}
                        <button
                            onClick={() => handleRemove(item.id)}
                            className="absolute top-3 right-3 z-10 bg-white dark:bg-gray-800 p-2 rounded-full shadow-sm hover:bg-error hover:text-white transition-colors"
                            title="Remove from wishlist"
                        >
                            <Trash2 size={18} />
                        </button>

                        <Link to={`/products/${item.id}`} className="block">
                            <div className="relative overflow-hidden rounded-t-lg">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                {!item.inStock && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                        <span className="badge-error">Out of Stock</span>
                                    </div>
                                )}
                            </div>
                        </Link>

                        <div className="p-4">
                            <Link to={`/products/${item.id}`}>
                                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white group-hover:text-accent transition-colors">
                                    {item.name}
                                </h3>
                            </Link>

                            <div className="flex items-center justify-between mb-4">
                                <span className="text-2xl font-bold text-gray-900 dark:text-white">${item.price}</span>
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                    <span>⭐ {item.rating}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => handleAddToCart(item.id)}
                                disabled={!item.inStock}
                                className={`w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg font-semibold transition-all ${item.inStock
                                        ? 'btn-primary'
                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                <ShoppingCart size={18} />
                                <span>{item.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-12 text-center">
                <Link to="/products" className="btn-secondary inline-block">
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
}
