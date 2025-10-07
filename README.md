# HildeShop 🛒

An eCommerce web application built with React, TypeScript, and Tailwind CSS. The site fetches products from Noroff's API, allows users to browse and search products, add items to a cart, adjust quantities, complete checkout, and contact the store via a validated form.

---

## 🚀 Live Site

**Netlify:** https\://jsfw-2025-hilde.netlify.app/

---

## 📂 Features

- 🔍 Search products with auto-filtering
- 🛒 Add, update, and remove items from the cart
- 💵 View total and savings
- ✅ Checkout with success confirmation
- 📬 Contact form with validation
- 📱 Fully responsive design
- 🔔 Toast notifications for user feedback

---

## 🛠️ Technologies Used

- **React** with **React Router**
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React Hot Toast** for notifications
- **Jest + React Testing Library** (via Vitest) for testing
- **Netlify** for deployment

---

## 📦 Installation

Clone the repo and install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## 🧪 Tests

Run unit tests:

```bash
npm run test
```

Tested components/pages:

- Header
- Cart page
- Contact form
- Home page (includes search/sort logic)

---

## ✅ Requirements Checklist

- Homepage lists all products from the API

- Search bar filters products live by title

- Sorting options by price, name, and discount

- Individual product page with detailed view and reviews

- Add to Cart with toast confirmation

- Cart page with quantity updates, total, and removal

- Checkout button with redirect to success page

- Checkout success page clears cart and confirms order

- Contact page with validation (name, subject, email, message)

- Toast notifications for key actions (add, remove, submit)

- Responsive design (mobile, tablet, desktop)

- TypeScript used throughout with strict types

- Reusable components for layout, product cards, header

- Tests for Header, CartPage, ContactPage, and HomePage

- Netlify deployment live and functional

---

## ✍️ Portfolio 2 polish (2025)

As part of Portfolio 2 I made a couple of small, high‑impact improvements.

### 1) Reliable routing on Netlify

Single‑page routing now works on hard refresh and deep links.

- Added a SPA fallback so all requests serve `index.html`.
- Works with either of these setups:
  - **`public/200.html`** present in the build (current approach), **or**
  - Netlify **`_redirects`** file with:

```txt
/*  /index.html  200
```

### 2) React context split for better DX and tests

Previously the cart context/provider lived in one file, which triggered a Fast Refresh
warning and made tests noisier.

- **New structure**
  - `src/context/cart.ts` — exports **`CartContext`** + **`useCart`** (no component code)
  - `src/context/CartProvider.tsx` — exports **`CartProvider`** component
- **Benefits**
  - Removes Fast Refresh warning.
  - Clearer imports: use **`useCart`** where needed, and wrap trees with **`CartProvider`** once.
  - Simpler test setup—wrap tested components with **`CartProvider`**.

<!-- markdownlint-disable MD033 -->

<summary>Example imports</summary>

```tsx
// main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { CartProvider } from '@/context/CartProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>
);
```

```tsx
// any component/page
import { useCart } from '@/context/cart';
```

</details>

## 👩‍💻 Author

Hilde-Kathrine | [GitHub](https://github.com/Entav78)

---

## 📄 License

MIT — free to use and modify as you like.
