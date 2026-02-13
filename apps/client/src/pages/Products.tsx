import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productService, Product } from '../services/productService';
import { cartService } from '../services/cartService';
import { Star, ShoppingCart, Search, Filter, X, Heart } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        minPrice: '',
        maxPrice: '',
        category: '',
        minRating: '',
        inStock: false
    });

    useEffect(() => {
        fetchProducts();
    }, [search, sortBy]);

    const fetchProducts = async () => {
        try {
            const params: any = { search };
            if (sortBy) {
                if (sortBy === 'price_asc') params.sort = 'price';
                if (sortBy === 'price_desc') params.sort = '-price';
                if (sortBy === 'newest') params.sort = '-createdAt';
            }
            const response = await productService.getProducts(params);
            setProducts(response.data.products);
        } catch (error) {
            toast.error('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async (productId: string) => {
        try {
            await cartService.addToCart(productId, 1);
            toast.success('Added to cart!');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to add to cart');
        }
    };

    const applyFilters = () => {
        // Filter logic would be applied here
        setShowFilters(false);
        fetchProducts();
    };

    const clearFilters = () => {
        setFilters({
            minPrice: '',
            maxPrice: '',
            category: '',
            minRating: '',
            inStock: false
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">Loading products...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">All Products</h1>
                <p className="text-gray-600 dark:text-gray-400">Discover our complete collection</p>
            </div>

            {/* Filters & Sort */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="btn-secondary flex items-center justify-center space-x-2"
                >
                    <Filter size={18} />
                    <span>Filters</span>
                </button>

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="input-field flex-1 sm:max-w-xs"
                >
                    <option value="">Sort By</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="newest">Newest</option>
                </select>
            </div>

            {/* Filter Panel */}
            {showFilters && (
                <div className="card mb-8 animate-fadeIn">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Filters</h3>
                        <button onClick={() => setShowFilters(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Price Range</label>
                            <div className="flex space-x-2">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    className="input-field text-sm"
                                    value={filters.minPrice}
                                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                                />
                                <input
                                    type="number"
                                    placeholder="Max"
                                    className="input-field text-sm"
                                    value={filters.maxPrice}
                                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                            <select
                                className="input-field text-sm"
                                value={filters.category}
                                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                            >
                                <option value="">All Categories</option>
                                <option value="electronics">Electronics</option>
                                <option value="fashion">Fashion</option>
                                <option value="home">Home & Living</option>
                                <option value="sports">Sports</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Min Rating</label>
                            <select
                                className="input-field text-sm"
                                value={filters.minRating}
                                onChange={(e) => setFilters({ ...filters, minRating: e.target.value })}
                            >
                                <option value="">Any Rating</option>
                                <option value="4">4★ & above</option>
                                <option value="3">3★ & above</option>
                                <option value="2">2★ & above</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={filters.inStock}
                                onChange={(e) => setFilters({ ...filters, inStock: e.target.checked })}
                                className="rounded border-gray-300 text-accent focus:ring-accent"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">In Stock Only</span>
                        </label>
                    </div>

                    <div className="flex space-x-3 mt-6">
                        <button onClick={applyFilters} className="btn-primary flex-1">Apply Filters</button>
                        <button onClick={clearFilters} className="btn-secondary">Clear</button>
                    </div>
                </div>
            )}

            {/* Products Grid */}
            {products.length === 0 ? (
                <div className="text-center py-20">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">No products found</h3>
                    <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filters</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div key={product._id} className="card-product group">
                            <Link to={`/products/${product.slug}`} className="block">
                                <div className="relative overflow-hidden">
                                    <img
                                        src={product.images[0] || 'https://via.placeholder.com/400'}
                                        alt={product.name}
                                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-3 right-3 bg-white dark:bg-gray-800 px-2 py-1 rounded-full flex items-center space-x-1 shadow-sm">
                                        <Star className="text-yellow-400 fill-current" size={14} />
                                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{product.rating.average.toFixed(1)}</span>
                                    </div>
                                    {product.inventory.stock < 10 && product.inventory.stock > 0 && (
                                        <div className="absolute top-3 left-3">
                                            <span className="badge-error text-xs">Only {product.inventory.stock} left!</span>
                                        </div>
                                    )}
                                    {product.inventory.stock === 0 && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                            <span className="badge-error">Out of Stock</span>
                                        </div>
                                    )}
                                    <button className="absolute top-3 left-3 bg-white dark:bg-gray-800 p-2 rounded-full shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors opacity-0 group-hover:opacity-100">
                                        <Heart size={18} className="text-gray-600 dark:text-gray-400" />
                                    </button>
                                </div>
                            </Link>

                            <div className="p-4">
                                <Link to={`/products/${product.slug}`}>
                                    <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white group-hover:text-accent transition-colors line-clamp-1">
                                        {product.name}
                                    </h3>
                                </Link>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">{product.description}</p>

                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <span className="text-2xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                                        {product.compareAtPrice && (
                                            <span className="ml-2 text-sm text-gray-400 line-through">${product.compareAtPrice}</span>
                                        )}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                        <span>({product.rating.count})</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleAddToCart(product._id)}
                                    disabled={product.inventory.stock === 0}
                                    className={`w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg font-semibold transition-all ${product.inventory.stock === 0
                                            ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                                            : 'btn-primary'
                                        }`}
                                >
                                    <ShoppingCart size={18} />
                                    <span>{product.inventory.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
