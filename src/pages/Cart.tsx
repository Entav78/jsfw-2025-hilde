import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.discountedPrice * item.quantity,
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
              className="flex items-center justify-between border-b pb-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image.url}
                  alt={item.image.alt}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h2 className="font-semibold">{item.title}</h2>
                  <p>
                    {item.discountedPrice} kr x {item.quantity}
                  </p>
                  <p className="text-sm text-gray-500">
                    Total: {(item.discountedPrice * item.quantity).toFixed(2)}{' '}
                    kr
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="bg-gray-200 px-2 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="bg-gray-200 px-2 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => {
                    removeFromCart(item.id);
                    toast.success(`${item.title} removed from cart`);
                  }}
                  className="ml-4 text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-6">
            <p className="text-xl font-bold">Total: {total.toFixed(2)} kr</p>
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
