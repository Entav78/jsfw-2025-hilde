import { Outlet } from 'react-router-dom';
import Header from '@/components/Header/Header';

function Layout() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="p-4">
        <Outlet />
      </main>
      <footer className="p-4 text-center text-sm opacity-60">
        &copy; {new Date().getFullYear()} HildeShop. All rights reserved.
      </footer>
    </div>
  );
}

export default Layout;
