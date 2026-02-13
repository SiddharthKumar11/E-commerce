import { Link } from 'react-router-dom';
import { ShoppingBag, TruckIcon, Shield, HeadphonesIcon, Award, ArrowRight, Star } from 'lucide-react';

export default function Home() {
    const featuredProducts = [
        { id: 1, name: 'Premium Headphones', price: 299, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', rating: 4.8 },
        { id: 2, name: 'Smart Watch', price: 399, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', rating: 4.9 },
        { id: 3, name: 'Wireless Speaker', price: 199, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400', rating: 4.7 },
        { id: 4, name: 'Camera Lens', price: 599, image: 'https://images.unsplash.com/photo-1606400082777-ef05f3c5cde2?w=400', rating: 4.6 },
    ];

    return (
        <div className="animate-fadeIn">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary to-gray-800 dark:from-gray-900 dark:to-black text-white py-20 md:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-block bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
                                New Collection 2024
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                                Discover Premium Products
                            </h1>
                            <p className="text-xl text-gray-300 mb-8">
                                Shop the latest trends with unbeatable quality and prices. Your satisfaction is our priority.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    to="/products"
                                    className="inline-flex items-center justify-center bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors group"
                                >
                                    Shop Now
                                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                                </Link>
                                <Link
                                    to="/products"
                                    className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
                                >
                                    Browse Collection
                                </Link>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="grid grid-cols-2 gap-4">
                                <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300" alt="Product" className="rounded-lg shadow-lg" />
                                <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300" alt="Product" className="rounded-lg shadow-lg mt-8" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { icon: TruckIcon, title: 'Free Shipping', desc: 'On orders over $50' },
                            { icon: Shield, title: 'Secure Payment', desc: '100% secure transactions' },
                            { icon: HeadphonesIcon, title: '24/7 Support', desc: 'Dedicated customer service' },
                            { icon: Award, title: 'Easy Returns', desc: '30-day return policy' }
                        ].map((feature, index) => (
                            <div key={index} className="text-center">
                                <div className="bg-accent/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <feature.icon className="text-accent" size={28} />
                                </div>
                                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-12">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Featured Products</h2>
                            <p className="text-gray-600 dark:text-gray-400">Handpicked items just for you</p>
                        </div>
                        <Link to="/products" className="link font-medium flex items-center">
                            View All
                            <ArrowRight className="ml-1" size={18} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredProducts.map((product) => (
                            <div key={product.id} className="card-product group">
                                <div className="relative overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-3 right-3 bg-white dark:bg-gray-800 px-2 py-1 rounded-full flex items-center space-x-1 shadow-sm">
                                        <Star className="text-yellow-400 fill-current" size={14} />
                                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{product.rating}</span>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">{product.name}</h3>
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                                        <Link to="/products" className="btn-primary text-sm py-2 px-4">
                                            View
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">Shop by Category</h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {['Electronics', 'Fashion', 'Home & Living', 'Sports'].map((category, index) => (
                            <Link
                                key={index}
                                to="/products"
                                className="group relative overflow-hidden rounded-lg aspect-square bg-gray-200 dark:bg-gray-800 hover:shadow-lg transition-all"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-gray-800/80 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-white transition-colors z-10">
                                        {category}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Promotional Banner */}
            <section className="py-20 bg-accent">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <div className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm font-medium mb-6">
                        Limited Time Offer
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Get 20% Off Your First Order</h2>
                    <p className="text-xl mb-10 text-blue-100 max-w-2xl mx-auto">
                        Sign up today and enjoy exclusive discounts on premium products
                    </p>
                    <Link
                        to="/register"
                        className="inline-flex items-center bg-white text-accent px-10 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg"
                    >
                        Sign Up Now
                        <ArrowRight className="ml-2" size={20} />
                    </Link>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">Ready to Start Shopping?</h2>
                    <p className="text-xl mb-10 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Browse our collection of quality products and enjoy exclusive deals
                    </p>
                    <Link
                        to="/products"
                        className="inline-flex items-center btn-primary text-lg px-10 py-4"
                    >
                        <ShoppingBag className="mr-3" size={24} />
                        Explore Products
                    </Link>
                </div>
            </section>
        </div>
    );
}
