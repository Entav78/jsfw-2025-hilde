import { useEffect, useState } from 'react';
import { API_PRODUCTS } from '@/constants/api';
import ProductCard from '@/components/ProductCard/ProductCard';
import SearchBar from '@/components/SearchBar/SearchBar';

interface Product {
  id: string;
  title: string;
  price: number;
  discountedPrice: number;
  image: {
    url: string;
    alt: string;
  };
  rating: number;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(API_PRODUCTS);
        const json = await res.json();
        setProducts(json.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    }

    fetchProducts();
  }, []);

  const sortedProducts = [...products]
    .filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'discount-percent') {
        const aPercent = ((a.price - a.discountedPrice) / a.price) * 100;
        const bPercent = ((b.price - b.discountedPrice) / b.price) * 100;
        return bPercent - aPercent;
      }

      if (sortBy === 'discount-amount') {
        const aAmount = a.price - a.discountedPrice;
        const bAmount = b.price - b.discountedPrice;
        return bAmount - aAmount;
      }

      if (sortBy === 'price-asc') return a.discountedPrice - b.discountedPrice;
      if (sortBy === 'price-desc') return b.discountedPrice - a.discountedPrice;
      if (sortBy === 'name-asc') return a.title.localeCompare(b.title);
      if (sortBy === 'name-desc') return b.title.localeCompare(a.title);

      return 0;
    });

  return (
    <div className="mb-6">
      <SearchBar value={search} onChange={setSearch} />
      <div className="mt-2 flex gap-4 items-center">
        <label htmlFor="sort" className="font-semibold">
          Sort by:
        </label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border border-gray-600 rounded bg-black text-white"
        >
          <option value="">None</option>
          <option value="discount-percent">Biggest Discount (%)</option>
          <option value="discount-amount">Biggest Savings (kr)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
        </select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 xl:gap-8 mt-6">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
