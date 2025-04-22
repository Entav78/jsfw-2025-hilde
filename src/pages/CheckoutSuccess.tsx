import { useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { useCart } from '@/context/CartContext';

export default function CheckoutSuccess() {
  const { clearCart } = useCart();
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (!hasShownToast.current) {
      toast.success('Order placed successfully!');
      clearCart();
      hasShownToast.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold">Thank you for your purchase! 🥳</h1>
      <p className="mt-2 text-gray-300">
        You’ll receive a confirmation email shortly.
      </p>
    </div>
  );
}
