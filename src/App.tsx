import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import Home from '@/pages/Home';
import Product from '@/pages/Product';
import Cart from '@/pages/Cart/Cart';
import CheckoutSuccess from '@/pages/CheckoutSuccess';
import ContactPage from '@/pages/ContactPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/checkoutSuccess" element={<CheckoutSuccess />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
