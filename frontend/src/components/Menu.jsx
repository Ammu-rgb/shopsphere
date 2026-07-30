import { Link } from "react-router-dom";
import {
  Home,
  ShoppingBag,
  ShoppingCart,
  User,
  Heart,
  ClipboardList,
  Shield,
  LogOut,
  Store,
  X,
  Shirt,
  Smartphone,
  BookOpen,
  Sofa,
  Laptop,
} from "lucide-react";

const Menu = ({ menuOpen, setMenuOpen, user, handleLogout }) => {
  if (!menuOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={() => setMenuOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-screen w-80 max-w-[90%] bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col overflow-y-auto animate-fadeIn">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Menu
          </h2>

          <button
            onClick={() => setMenuOpen(false)}
            className="text-gray-600 dark:text-gray-300 hover:text-red-500 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* ================= GUEST ================= */}
        {!user ? (
          <div className="flex-1 p-5">

            {/* Welcome Card */}
            <div className="rounded-3xl bg-gradient-to-br from-[#2563eb] via-[#1d4ed8] to-[#0f172a] text-white p-7 shadow-2xl border border-blue-400/20">

              <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mx-auto shadow-xl">
                <Store size={38} className="text-white" />
              </div>

              <h2 className="text-2xl font-bold text-center mt-5 tracking-wide">
                Welcome to ShopSphere
              </h2>

              <p className="text-center text-[15px] text-blue-100 mt-3 leading-7 opacity-90">
                Login to save your wishlist, manage your cart and track your
                orders.
              </p>
            </div>

            {/* Login */}
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="mt-8 flex items-center justify-center gap-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <User size={18} />
              Login
            </Link>

            {/* Register */}
            <Link
              to="/register"
              onClick={() => setMenuOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 w-full border-2 border-blue-600 text-blue-600 dark:text-blue-400 py-3 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 font-semibold hover:bg-blue-50 dark:hover:bg-gray-800"
            >
              <User size={18} />
              Create Account
            </Link>

            <div className="my-6 border-t border-gray-200 dark:border-gray-700" />

            {/* Guest Navigation */}
            <div className="space-y-2">

              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 px-4 py-4 rounded-2xl hover:bg-blue-50 dark:hover:bg-gray-800 transition"
              >
                <Home size={20} className="text-blue-600" />
                <span className="font-medium dark:text-white">Home</span>
              </Link>

              <Link
                to="/products"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 px-4 py-4 rounded-2xl hover:bg-blue-50 dark:hover:bg-gray-800 transition"
              >
                <ShoppingBag size={20} className="text-blue-600" />
                <span className="font-medium dark:text-white">
                  Products
                </span>
              </Link>

              <Link
                to="/wishlist"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 px-4 py-4 rounded-2xl hover:bg-blue-50 dark:hover:bg-gray-800 transition"
              >
                <Heart size={20} className="text-red-500" />
                <span className="font-medium dark:text-white">
                  Wishlist
                </span>
              </Link>

              <Link
                to="/cart"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 px-4 py-4 rounded-2xl hover:bg-blue-50 dark:hover:bg-gray-800 transition"
              >
                <ShoppingCart size={20} className="text-green-600" />
                <span className="font-medium dark:text-white">Cart</span>
              </Link>
            </div>
          </div>
        ) : (
          /* ================= LOGGED IN ================= */
          <div className="flex-1 p-5">

            {/* Profile Card */}
            <div className="rounded-3xl bg-gradient-to-br from-[#2563eb] via-[#1d4ed8] to-[#0f172a] text-white p-6 shadow-2xl border border-blue-400/20">

              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mx-auto">
                <User size={32} />
              </div>

              <h2 className="text-xl font-bold text-center mt-4">
                {user.name}
              </h2>

              <p className="text-center text-sm text-blue-100 mt-1">
                Welcome Back 👋
              </p>
            </div>

            {/* Main User Navigation */}
            <div className="mt-6 space-y-2">

              {/* Profile */}
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 px-4 py-4 rounded-2xl hover:bg-blue-50 dark:hover:bg-gray-800 transition dark:text-white"
              >
                <User size={20} />
                My Profile
              </Link>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 px-4 py-4 rounded-2xl hover:bg-blue-50 dark:hover:bg-gray-800 transition dark:text-white"
              >
                <Heart size={20} className="text-red-500" />
                Wishlist
              </Link>

              {/* Orders */}
              <Link
                to="/my-orders"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 px-4 py-4 rounded-2xl hover:bg-blue-50 dark:hover:bg-gray-800 transition dark:text-white"
              >
                <ClipboardList size={20} />
                My Orders
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 px-4 py-4 rounded-2xl hover:bg-blue-50 dark:hover:bg-gray-800 transition dark:text-white"
              >
                <ShoppingCart size={20} />
                Cart
              </Link>

              {/* Admin */}
              {user?.isAdmin && (
                <Link
                  to="/admin-login"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-4 px-4 py-4 rounded-2xl hover:bg-blue-50 dark:hover:bg-gray-800 transition dark:text-white"
                >
                  <Shield size={20} />
                  Admin Panel
                </Link>
              )}

              {/* Divider */}
              <div className="my-4 border-t border-gray-700" />

              {/* Categories */}
              <div className="px-3">

                <h3 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                  Categories
                </h3>

                <div className="ml-3 space-y-3">

                  <Link
                    to="/products?category=Fashion"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 text-sm dark:text-gray-200 hover:text-blue-600 transition"
                  >
                    <Shirt size={18} className="text-gray-500" />
                    Fashion
                  </Link>

                  <Link
                    to="/products?category=Electronics"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 text-sm dark:text-gray-200 hover:text-blue-600 transition"
                  >
                    <Laptop size={18} className="text-gray-500" />
                    Electronics
                  </Link>

                  <Link
                    to="/products?category=Mobiles"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 text-sm dark:text-gray-200 hover:text-blue-600 transition"
                  >
                    <Smartphone size={18} className="text-gray-500" />
                    Mobiles
                  </Link>

                  <Link
                    to="/products?category=Shoes"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 text-sm dark:text-gray-200 hover:text-blue-600 transition"
                  >
                    <ShoppingBag size={18} className="text-gray-500" />
                    Shoes
                  </Link>

                  <Link
                    to="/products?category=Books"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 text-sm dark:text-gray-200 hover:text-blue-600 transition"
                  >
                    <BookOpen size={18} className="text-gray-500" />
                    Books
                  </Link>

                  <Link
                    to="/products?category=Home%20%26%20Living"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 text-sm dark:text-gray-200 hover:text-blue-600 transition"
                  >
                    <Sofa size={18} className="text-gray-500" />
                    Home & Living
                  </Link>

                </div>
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-full mt-5 flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl transition font-semibold"
              >
                <LogOut size={20} />
                Logout
              </button>

            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Menu;