import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import { CartProvider } from '@/context/CartProvider';
import { describe, test, expect } from 'vitest';

describe('Header', () => {
  test('renders logo and navigation links', () => {
    render(
      <CartProvider>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </CartProvider>
    );

    expect(screen.getByText(/hildeshop/i)).toBeInTheDocument();
    expect(screen.getByText(/cart/i)).toBeInTheDocument();
    expect(screen.getByText(/contact/i)).toBeInTheDocument();
  });
});
