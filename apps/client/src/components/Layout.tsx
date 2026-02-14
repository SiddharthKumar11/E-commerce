import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { authService } from '../services/authService';

export default function Layout() {
    const { setUser } = useAuthStore();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                try {
                    const response = await authService.getCurrentUser();
                    setUser(response.data.user);
                } catch (error) {
                    // Token invalid or expired
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('userId');
                }
            }
        };

        checkAuth();
    }, [setUser]);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
