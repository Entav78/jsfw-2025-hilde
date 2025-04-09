import { Outlet, Link } from 'react-router-dom'

function Layout() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="p-4 bg-green-700">
        <nav className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">🛍 HildeShop</Link>
          <div className="space-x-4">
            <Link to="/cart">Cart</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </nav>
      </header>

      <main className="p-4">
        <Outlet />
      </main>

      <footer className="p-4 text-center text-sm opacity-60">
        &copy; {new Date().getFullYear()} HildeShop. All rights reserved.
      </footer>
    </div>
  )
}

export default Layout
