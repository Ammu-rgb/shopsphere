import { Link } from "react-router-dom";
import {
  FaHome,
  FaBoxOpen,
  FaShoppingCart,
  FaUser,
  FaHeart,
  FaClipboardList,
  FaUserShield,
  FaSignOutAlt,
  FaStore,
  FaTimes,
} from "react-icons/fa";

const Menu = ({ menuOpen, setMenuOpen, user, handleLogout }) => {
  if (!menuOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={() => setMenuOpen(false)}
      ></div>

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-screen w-80 max-w-[90%] bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col animate-fadeIn">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Menu
          </h2>

          <button
            onClick={() => setMenuOpen(false)}
            className="text-2xl text-gray-600 dark:text-gray-300 hover:text-red-500 transition"
          >
            <FaTimes />
          </button>
        </div>

        {/* Guest User */}
        {!user ? (
          <div className="flex-1 p-5">

            {/* Welcome Card */}
            <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-5 shadow-lg">

              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto">
                <FaStore className="text-3xl" />
              </div>

              <h2 className="text-xl font-bold text-center mt-4">
                Welcome to ShopSphere
              </h2>

              <p className="text-center text-sm text-blue-100 mt-2 leading-6">
                Login to save your wishlist,
                manage your cart and
                track your orders.
              </p>

            </div>

            {/* Buttons */}

            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="mt-6 flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
            >
              <FaUser />
              Login
            </Link>

            <Link
              to="/register"
              onClick={() => setMenuOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 w-full border-2 border-blue-600 text-blue-600 dark:text-blue-400 py-3 rounded-xl font-semibold hover:bg-blue-50 dark:hover:bg-gray-800 transition"
            >
              <FaUser />
              Create Account
            </Link>

            {/* Divider */}

            <div className="my-6 border-t border-gray-200 dark:border-gray-700"></div>

            {/* Navigation */}

            <div className="space-y-2">

              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <FaHome className="text-blue-600" />
                <span className="font-medium dark:text-white">
                  Home
                </span>
              </Link>

              <Link
                to="/products"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <FaBoxOpen className="text-blue-600" />
                <span className="font-medium dark:text-white">
                  Products
                </span>
              </Link>

              <Link
                to="/wishlist"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <FaHeart className="text-red-500" />
                <span className="font-medium dark:text-white">
                  Wishlist
                </span>
              </Link>

              <Link
                to="/cart"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <FaShoppingCart className="text-green-600" />
                <span className="font-medium dark:text-white">
                  Cart
                </span>
              </Link>

            </div>

          </div>
        ) : (
          /* Logged In User */
          <div className="flex-1 p-5">

            {/* Profile Card */}

            <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-5 shadow-lg">

              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto">
                <FaUser className="text-3xl" />
              </div>

              <h2 className="text-xl font-bold text-center mt-4">
                {user.name}
              </h2>

              <p className="text-center text-sm text-blue-100 mt-1">
                Welcome Back 👋
              </p>

            </div>

            <div className="mt-6 space-y-2">

              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition dark:text-white"
              >
                <FaUser />
                My Profile
              </Link>

              <Link
                to="/wishlist"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition dark:text-white"
              >
                <FaHeart className="text-red-500" />
                Wishlist
              </Link>

              <Link
                to="/my-orders"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition dark:text-white"
              >
                <FaClipboardList />
                My Orders
              </Link>

              <Link
                to="/cart"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition dark:text-white"
              >
                <FaShoppingCart />
                Cart
              </Link>

              {user?.isAdmin && (
                <Link
                  to="/admin-login"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition dark:text-white"
                >
                  <FaUserShield />
                  Admin Panel
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="w-full mt-4 flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl transition font-semibold"
              >
                <FaSignOutAlt />
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