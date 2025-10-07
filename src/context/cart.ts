import { createContext, useContext } from 'react';
import type { CartItem } from '@/types/cart';

export interface CartContextProps {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, newQuantity: number) => void;
  decreaseQuantity: (id: string) => void;
  // total?: number;
  // count?: number;
}

export const CartContext = createContext<CartContextProps | undefined>(
  undefined
);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
};
