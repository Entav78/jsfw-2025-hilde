import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from './HomePage';
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock fetch
beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            data: [
              {
                id: '1',
                title: 'Apple Watch',
                price: 5000,
                discountedPrice: 4000,
                image: { url: 'https://via.placeholder.com/150', alt: 'Watch' },
                rating: 4.5,
              },
              {
                id: '2',
                title: 'Samsung Galaxy',
                price: 7000,
                discountedPrice: 6500,
                image: { url: 'https://via.placeholder.com/150', alt: 'Phone' },
                rating: 4.8,
              },
            ],
          }),
      })
    )
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('HomePage', () => {
  test('renders products from API', async () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Wait for product cards to appear
    expect(await screen.findByText(/apple watch/i)).toBeInTheDocument();
    expect(await screen.findByText(/samsung galaxy/i)).toBeInTheDocument();
  });

  test('filters products based on search input', async () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Wait for products to be loaded
    await waitFor(() => screen.getByText(/apple watch/i));

    // Filter for Apple
    const searchInput = screen.getByPlaceholderText(/search products/i);
    fireEvent.change(searchInput, { target: { value: 'Apple' } });

    expect(screen.getByText(/apple watch/i)).toBeInTheDocument();
    expect(screen.queryByText(/samsung galaxy/i)).not.toBeInTheDocument();
  });
});
