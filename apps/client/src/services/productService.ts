import api from './api';

export interface Product {
    _id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    compareAtPrice?: number;
    images: string[];
    inventory: number;
    category: {
        _id: string;
        name: string;
        slug: string;
    };
    rating: {
        average: number;
        count: number;
    };
}

export const productService = {
    async getProducts(params?: any) {
        const response = await api.get('/products', { params });
        return response.data;
    },

    async getProduct(id: string) {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },

    async getProductBySlug(slug: string) {
        const response = await api.get(`/products/slug/${slug}`);
        return response.data;
    },
};
