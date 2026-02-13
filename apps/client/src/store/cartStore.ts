import { create } from 'zustand';

interface CartItem {
    product: any;
    quantity: number;
    price: number;
    name: string;
    image: string;
}

interface CartState {
    items: CartItem[];
    totalAmount: number;
    setCart: (items: CartItem[], totalAmount: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
    items: [],
    totalAmount: 0,
    setCart: (items, totalAmount) => set({ items, totalAmount }),
    clearCart: () => set({ items: [], totalAmount: 0 }),
}));
