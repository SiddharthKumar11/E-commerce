import api from './api';

export interface User {
    id: string;
    email: string;
    name: string;
    role: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    name: string;
    phone?: string;
}

export const authService = {
    async login(data: LoginData) {
        const response = await api.post('/auth/login', data);
        return response.data;
    },

    async register(data: RegisterData) {
        const response = await api.post('/auth/register', data);
        return response.data;
    },

    async logout() {
        const response = await api.post('/auth/logout');
        return response.data;
    },
};
