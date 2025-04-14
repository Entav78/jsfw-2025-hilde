import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function Header() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="p-4 bg-green-700">
      <nav className="flex justify-between items-center relative">
        <Link to="/" className="text-xl font-bold">
          🛍 HildeShop
        </Link>
        <div className="space-x-4">
          <Link to="/contact">Contact</Link>
          <Link to="/cart" className="relative inline-block">
            🛒 Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}
