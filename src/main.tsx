import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CartProvider } from '@/context/CartProvider';
import '@/styles/style.scss';
import App from '@/App.tsx';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <App />
      <Toaster position="top-center" reverseOrder={false} />
    </CartProvider>
  </StrictMode>
);
