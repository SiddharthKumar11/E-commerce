import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productService, Product } from '../services/productService';
import { cartService } from '../services/cartService';
import { Star, ShoppingCart, Heart, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProductDetail() {
    const { slug } = useParams<{ slug: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        if (slug) {
            fetchProduct();
        }
    }, [slug]);

    const fetchProduct = async () => {
        try {
            const response = await productService.getProductBySlug(slug!);
            setProduct(response.data.product);
        } catch (error) {
            toast.error('Product not found');
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async () => {
        if (!product) return;
        try {
            await cartService.addToCart(product._id, quantity);
            toast.success('Added to cart!');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to add to cart');
        }
    };

    const incrementQuantity = () => {
        if (product && quantity < product.inventory) {
            setQuantity(quantity + 1);
        }
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">Loading product...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Product not found</h2>
                    <Link to="/products" className="link">← Back to Products</Link>
                </div>
            </div>
        );
    }

    const images = product.images.length > 0 ? product.images : ['https://via.placeholder.com/600'];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
            {/* Breadcrumb */}
            <div className="mb-6">
                <Link to="/products" className="link text-sm">← Back to Products</Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Image Gallery */}
                <div>
                    <div className="relative mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden aspect-square">
                        <img
                            src={images[selectedImage]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={() => setSelectedImage((selectedImage - 1 + images.length) % images.length)}
                                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={() => setSelectedImage((selectedImage + 1) % images.length)}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Thumbnail Gallery */}
                    {images.length > 1 && (
                        <div className="grid grid-cols-4 gap-2">
                            {images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index
                                        ? 'border-accent'
                                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                        }`}
                                >
                                    <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{product.name}</h1>

                    {/* Rating */}
                    <div className="flex items-center mb-6">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={20}
                                    className={i < Math.floor(product.rating.average) ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}
                                />
                            ))}
                        </div>
                        <span className="ml-2 text-gray-600 dark:text-gray-400">
                            {product.rating.average.toFixed(1)} ({product.rating.count} reviews)
                        </span>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                        <div className="flex items-baseline space-x-3">
                            <span className="text-4xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                            {product.compareAtPrice && (
                                <>
                                    <span className="text-2xl text-gray-400 line-through">${product.compareAtPrice}</span>
                                    <span className="badge-error">
                                        {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}% OFF
                                    </span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">{product.description}</p>

                    {/* Stock Status */}
                    <div className="mb-6">
                        {product.inventory > 0 ? (
                            <span className="badge-success">
                                In Stock ({product.inventory} available)
                            </span>
                        ) : (
                            <span className="badge-error">Out of Stock</span>
                        )}
                    </div>

                    {/* Quantity Selector */}
                    {product.inventory > 0 && (
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quantity</label>
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={decrementQuantity}
                                    className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 p-2 rounded-lg transition-colors"
                                    disabled={quantity <= 1}
                                >
                                    <Minus size={20} />
                                </button>
                                <span className="text-xl font-semibold text-gray-900 dark:text-white w-12 text-center">{quantity}</span>
                                <button
                                    onClick={incrementQuantity}
                                    className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 p-2 rounded-lg transition-colors"
                                    disabled={quantity >= product.inventory}
                                >
                                    <Plus size={20} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-4 mb-8">
                        <button
                            onClick={handleAddToCart}
                            disabled={product.inventory === 0}
                            className="flex-1 btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ShoppingCart size={20} />
                            <span>{product.inventory === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
                        </button>
                        <button className="btn-secondary p-3">
                            <Heart size={20} />
                        </button>
                    </div>

                    {/* Product Details */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">Product Details</h3>
                        <dl className="space-y-3">
                            <div className="flex justify-between">
                                <dt className="text-gray-600 dark:text-gray-400">SKU</dt>
                                <dd className="text-gray-900 dark:text-white font-medium">{product.sku}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-gray-600 dark:text-gray-400">Category</dt>
                                <dd className="text-gray-900 dark:text-white font-medium">{product.category.name}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>

            {/* Reviews Section (Placeholder) */}
            <div className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Customer Reviews</h2>
                <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-gray-600 dark:text-gray-400">Reviews feature coming soon!</p>
                </div>
            </div>
        </div>
    );
}
