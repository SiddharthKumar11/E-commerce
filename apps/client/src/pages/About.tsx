import { Users, Target, Award, Heart } from 'lucide-react';

export default function About() {
    return (
        <div className="animate-fadeIn">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary to-gray-800 dark:from-gray-900 dark:to-black text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl font-bold mb-4">About E-Shop</h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Your trusted partner for quality products and exceptional shopping experiences since 2024
                    </p>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                                E-Shop was founded with a simple mission: to make quality products accessible to everyone.
                                What started as a small online store has grown into a trusted marketplace serving thousands
                                of customers worldwide.
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                                We believe in the power of technology to transform shopping experiences. Our platform
                                combines cutting-edge technology with a customer-first approach to deliver unmatched
                                convenience and satisfaction.
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Today, we're proud to offer a curated selection of products across multiple categories,
                                backed by our commitment to quality, authenticity, and customer service.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <img
                                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400"
                                alt="Office"
                                className="rounded-lg shadow-lg"
                            />
                            <img
                                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400"
                                alt="Team"
                                className="rounded-lg shadow-lg mt-8"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: Users,
                                title: 'Customer First',
                                description: 'Your satisfaction is our top priority. We go above and beyond to ensure you have the best experience.'
                            },
                            {
                                icon: Target,
                                title: 'Quality Focus',
                                description: 'We carefully curate our products to ensure they meet our high standards of quality and authenticity.'
                            },
                            {
                                icon: Award,
                                title: 'Excellence',
                                description: 'We strive for excellence in everything we do, from product selection to customer service.'
                            },
                            {
                                icon: Heart,
                                title: 'Integrity',
                                description: 'We believe in honest business practices and building long-term relationships based on trust.'
                            }
                        ].map((value, index) => (
                            <div key={index} className="card text-center">
                                <div className="bg-accent/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <value.icon className="text-accent" size={32} />
                                </div>
                                <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-3">{value.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { number: '10K+', label: 'Happy Customers' },
                            { number: '5K+', label: 'Products' },
                            { number: '50+', label: 'Countries' },
                            { number: '99%', label: 'Satisfaction Rate' }
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">{stat.number}</div>
                                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">Meet Our Team</h2>
                    <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                        Our dedicated team works tirelessly to bring you the best shopping experience
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: 'John Smith', role: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400' },
                            { name: 'Sarah Johnson', role: 'Head of Operations', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400' },
                            { name: 'Michael Chen', role: 'Tech Lead', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400' }
                        ].map((member, index) => (
                            <div key={index} className="card text-center">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                                />
                                <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-1">{member.name}</h3>
                                <p className="text-accent font-medium">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Join Our Journey</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                        Be part of our growing community and experience the difference
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/products" className="btn-primary inline-block">
                            Start Shopping
                        </a>
                        <a href="/contact" className="btn-secondary inline-block">
                            Contact Us
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
