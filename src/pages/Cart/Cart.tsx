import { useCart } from '@/context/cart';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, decreaseQuantity } =
    useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.discountedPrice * item.quantity,
    0
  );

  const totalSavings = cart.reduce(
    (sum, item) => sum + (item.price - item.discountedPrice) * item.quantity,
    0
  );

  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white text-black p-4 rounded shadow-sm border-b"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4">
                <img
                  src={item.image.url}
                  alt={item.image.alt}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h2 className="font-semibold">{item.title}</h2>
                  <p data-testid="cart-item-qty">
                    {item.discountedPrice} kr x {item.quantity}
                  </p>
                  <p className="text-sm text-gray-600">
                    Total: {(item.discountedPrice * item.quantity).toFixed(2)}{' '}
                    kr
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  className="bg-gray-200 text-black px-2 py-1 rounded hover:bg-gray-300"
                  onClick={() => decreaseQuantity(item.id)}
                  aria-label={`Decrease quantity of ${item.title}`}
                >
                  −
                </button>
                <span className="px-2">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="bg-gray-200 text-black px-2 py-1 rounded hover:bg-gray-300"
                  aria-label={`Increase quantity of ${item.title}`}
                >
                  +
                </button>
                <button
                  onClick={() => {
                    removeFromCart(item.id);
                    toast.success(`${item.title} removed from cart`);
                  }}
                  className="text-red-600 hover:underline ml-4"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-6">
            <p className="text-xl font-bold" data-testid="cart-total">
              Total: {total.toFixed(2)} kr
            </p>
            <p
              className="text-sm text-green-400 font-semibold"
              data-testid="cart-saved"
            >
              You saved {totalSavings.toFixed(2)} kr!
            </p>
            <button
              onClick={() => {
                clearCart();
                navigate('/CheckoutSuccess');
              }}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
