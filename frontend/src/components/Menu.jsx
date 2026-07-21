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
} from "react-icons/fa";

const Menu = ({ menuOpen, setMenuOpen, user, handleLogout }) => {
  if (!menuOpen) return null;

  return (
    <div className="absolute top-16 right-4 w-64 bg-white rounded-xl shadow-2xl p-4 z-50">

      {!user ? (
        <>
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="block py-2 font-semibold text-blue-700"
          >
            Login
          </Link>

          <p className="text-sm text-gray-500 mt-2">
            Don't have an account?
          </p>

          <Link
            to="/register"
            onClick={() => setMenuOpen(false)}
            className="block py-2 font-semibold text-green-600"
          >
            Register
          </Link>
        </>
      ) : (
        <>
          <Link
            to="/profile"
            onClick={() => setMenuOpen(false)}
            className="block py-2 hover:text-blue-700"
          >
            <div className="flex items-center gap-3">
  <FaUser />
  <span>My Profile</span>
</div>
          </Link>

          <Link
            to="/wishlist"
            onClick={() => setMenuOpen(false)}
            className="block py-2 hover:text-blue-700"
          >
            <div className="flex items-center gap-3">
  <FaHeart />
  <span>Wishlist</span>
</div>
          </Link>

          <Link
            to="/orders"
            onClick={() => setMenuOpen(false)}
            className="block py-2 hover:text-blue-700"
          >
            <div className="flex items-center gap-3">
  <FaClipboardList />
  <span>My Orders</span>
</div>
          </Link>

          {user?.isAdmin && (
            <Link
              to="/admin-login"
              onClick={() => setMenuOpen(false)}
              className="block py-2 hover:text-blue-700"
            >
              <div className="flex items-center gap-3">
  <FaUserShield />
  <span>Admin Login</span>
</div>
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="w-full text-left py-2 text-red-600"
          >
            <div className="flex items-center gap-3">
  <FaSignOutAlt />
  <span>Logout</span>
</div>
          </button>
        </>
      )}

    </div>
  );
};

export default Menu;