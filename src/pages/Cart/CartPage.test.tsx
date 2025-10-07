import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import Cart from './Cart';
import { CartContext } from '@/context/cart';
import type { ReactElement } from 'react';
import type { CartItem } from '@/types/cart';

// --------------------
// Mock data
// --------------------

const mockCart: CartItem[] = [
  {
    id: '1',
    title: 'Test Product',
    price: 100,
    discountedPrice: 80,
    quantity: 1,
    image: {
      url: 'https://via.placeholder.com/150',
      alt: 'Test image',
    },
  },
];

const savingsCart: CartItem[] = [
  {
    id: '2',
    title: 'Savings Test',
    price: 200,
    discountedPrice: 150,
    quantity: 2,
    image: {
      url: 'https://example.com/image.jpg',
      alt: 'Test Image',
    },
  },
];

// --------------------
// Helper function
// --------------------

const renderWithMockCart = (
  ui: ReactElement,
  { cart = [] }: { cart?: CartItem[] } = {}
) => {
  const mockCartContext = {
    cart,
    addToCart: vi.fn(),
    removeFromCart: vi.fn(),
    updateQuantity: vi.fn(),
    clearCart: vi.fn(),
    decreaseQuantity: vi.fn(),
  };

  return render(
    <CartContext.Provider value={mockCartContext}>
      <BrowserRouter>{ui}</BrowserRouter>
    </CartContext.Provider>
  );
};

// --------------------
// Tests
// --------------------

describe('Cart component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders empty cart message', () => {
    renderWithMockCart(<Cart />);
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  test('renders cart items with correct values', () => {
    renderWithMockCart(<Cart />, { cart: mockCart });
    expect(screen.getByTestId('cart-item-qty')).toHaveTextContent('80 kr x 1');
  });

  test('displays cart total and savings correctly', () => {
    renderWithMockCart(<Cart />, { cart: savingsCart });
    expect(screen.getByTestId('cart-total')).toHaveTextContent(
      'Total: 300.00 kr'
    );
    expect(screen.getByTestId('cart-saved')).toHaveTextContent(
      'You saved 100.00 kr!'
    );
  });

  test('increases quantity when + button is clicked', () => {
    const updateQuantityMock = vi.fn();

    const mockCartContext = {
      cart: mockCart,
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
      updateQuantity: updateQuantityMock,
      clearCart: vi.fn(),
      decreaseQuantity: vi.fn(),
    };

    render(
      <CartContext.Provider value={mockCartContext}>
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
      </CartContext.Provider>
    );

    const plusButton = screen.getByText('+');
    fireEvent.click(plusButton);

    expect(updateQuantityMock).toHaveBeenCalledWith('1', 2); // expects id and new quantity
  });

  test('removes item from cart when Remove button is clicked', () => {
    const removeMock = vi.fn();
    const cart = [...mockCart];

    const mockContext = {
      cart,
      addToCart: vi.fn(),
      removeFromCart: removeMock,
      updateQuantity: vi.fn(),
      clearCart: vi.fn(),
      decreaseQuantity: vi.fn(),
    };

    render(
      <CartContext.Provider value={mockContext}>
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
      </CartContext.Provider>
    );

    const removeButton = screen.getByText(/remove/i);
    fireEvent.click(removeButton);

    expect(removeMock).toHaveBeenCalledTimes(1);
    expect(removeMock).toHaveBeenCalledWith('1'); // '1' is mockCart[0].id
  });

  test('calls decreaseQuantity when - button is clicked', () => {
    const decreaseQuantityMock = vi.fn();

    const mockCartContext = {
      cart: [
        {
          id: '1',
          title: 'Test Product',
          price: 100,
          discountedPrice: 80,
          quantity: 2,
          image: {
            url: 'https://via.placeholder.com/150',
            alt: 'Test image',
          },
        },
      ],
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      clearCart: vi.fn(),
      decreaseQuantity: decreaseQuantityMock,
    };

    render(
      <CartContext.Provider value={mockCartContext}>
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
      </CartContext.Provider>
    );

    const minusButton = screen.getByText('-');
    fireEvent.click(minusButton);

    expect(decreaseQuantityMock).toHaveBeenCalledWith('1');
  });
});
