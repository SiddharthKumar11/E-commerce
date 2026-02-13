import { Link } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Package, Menu, X, Search, Heart, Moon, Sun } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { authService } from '../services/authService';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const { user, isAuthenticated, logout } = useAuthStore();
    const { items } = useCartStore();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await authService.logout();
            logout();
            toast.success('Logged out successfully');
        } catch (error) {
            toast.error('Logout failed');
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
        }
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="bg-primary p-2 rounded-lg">
                            <ShoppingCart className="text-white" size={24} />
                        </div>
                        <span className="text-xl font-bold text-primary dark:text-white hidden sm:block">E-Shop</span>
                    </Link>

                    {/* Search Bar - Desktop */}
                    <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-8">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </form>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link
                            to="/products"
                            className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white font-medium transition-colors"
                        >
                            Products
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/wishlist"
                                    className="relative text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors"
                                    title="Wishlist"
                                >
                                    <Heart size={22} />
                                </Link>

                                <Link
                                    to="/cart"
                                    className="relative text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors"
                                    title="Cart"
                                >
                                    <ShoppingCart size={22} />
                                    {items.length > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                                            {items.length}
                                        </span>
                                    )}
                                </Link>

                                <Link
                                    to="/orders"
                                    className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors"
                                    title="Orders"
                                >
                                    <Package size={22} />
                                </Link>

                                <div className="flex items-center space-x-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                    <User size={16} className="text-gray-600 dark:text-gray-400" />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{user?.name}</span>
                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="text-gray-700 dark:text-gray-300 hover:text-error transition-colors"
                                    title="Logout"
                                >
                                    <LogOut size={22} />
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white font-medium transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-primary hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}

                        {/* Dark Mode Toggle */}
                        <button
                            onClick={toggleDarkMode}
                            className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors"
                            title="Toggle Dark Mode"
                        >
                            {darkMode ? <Sun size={22} /> : <Moon size={22} />}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors"
                    >
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="md:hidden pb-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </form>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800 animate-slideIn">
                        <div className="flex flex-col space-y-4">
                            <Link
                                to="/products"
                                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white font-medium px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Products
                            </Link>

                            {isAuthenticated ? (
                                <>
                                    <Link
                                        to="/wishlist"
                                        className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white font-medium px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Wishlist
                                    </Link>

                                    <Link
                                        to="/cart"
                                        className="flex items-center justify-between text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <span className="font-medium">Cart</span>
                                        {items.length > 0 && (
                                            <span className="bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                                                {items.length}
                                            </span>
                                        )}
                                    </Link>

                                    <Link
                                        to="/orders"
                                        className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white font-medium px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Orders
                                    </Link>

                                    <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Hello, {user?.name}</span>
                                    </div>

                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setMobileMenuOpen(false);
                                        }}
                                        className="text-left text-error font-medium px-4 py-2 hover:bg-error-50 dark:hover:bg-error-900/20 rounded-lg transition-colors"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white font-medium px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="bg-primary text-white px-4 py-2 rounded-lg font-medium text-center"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}

                            <button
                                onClick={() => {
                                    toggleDarkMode();
                                    setMobileMenuOpen(false);
                                }}
                                className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white font-medium px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                            >
                                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                                <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
