// src/context/CartProvider.tsx
import { useState, type ReactNode } from 'react';
import type { CartItem } from '@/types/cart';
import { CartContext } from './cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      return existing
        ? prev.map((p) =>
            p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
          )
        : [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) =>
    setCart((prev) => prev.filter((i) => i.id !== id));
  const clearCart = () => setCart([]);
  const updateQuantity = (id: string, quantity: number) =>
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
  const decreaseQuantity = (id: string) =>
    setCart((prev) =>
      prev.flatMap((i) =>
        i.id !== id
          ? [i]
          : i.quantity > 1
          ? [{ ...i, quantity: i.quantity - 1 }]
          : []
      )
    );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
