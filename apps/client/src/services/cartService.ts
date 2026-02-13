import api from './api';

export const cartService = {
    async getCart() {
        const response = await api.get('/cart');
        return response.data;
    },

    async addToCart(productId: string, quantity: number = 1) {
        const response = await api.post('/cart/items', { productId, quantity });
        return response.data;
    },

    async updateCartItem(productId: string, quantity: number) {
        const response = await api.put(`/cart/items/${productId}`, { quantity });
        return response.data;
    },

    async removeFromCart(productId: string) {
        const response = await api.delete(`/cart/items/${productId}`);
        return response.data;
    },

    async clearCart() {
        const response = await api.delete('/cart');
        return response.data;
    },
};
