import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
  FaHeart,
  FaSearch,
  FaChevronDown,
} from "react-icons/fa";
import { successToast } from "../utils/toast";

const Navbar = ({ cart = [] }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(storedUser);
      }
    } else {
      setUser(null);
    }
  }, [location]);

  useEffect(() => {
    const closeMenus = () => {
      setDropdownOpen(false);
    };

    window.addEventListener("click", closeMenus);

    return () => window.removeEventListener("click", closeMenus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userToken");
    successToast("Logged out successfully");
    setDropdownOpen(false);
    setMobileMenu(false);
    navigate("/login");
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const value = search.trim();

      if (value) {
        navigate(`/products?search=${encodeURIComponent(value)}`);
      } else {
        navigate("/products");
      }

      setMobileMenu(false);
    }
  };

  const closeAllMenus = () => {
    setDropdownOpen(false);
    setMobileMenu(false);
  };

  const navClass = (path) =>
    location.pathname === path
      ? "text-yellow-300"
      : "text-white hover:text-yellow-300";

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl md:text-2xl font-bold text-white tracking-wide hover:scale-105 transition-transform duration-300"
          >
            ShopSphere
          </Link>

          {/* Search */}
          <div className="hidden md:flex flex-1 justify-center px-8">
            <div className="relative w-full max-w-2xl">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleSearch}
                className="w-full pl-11 pr-4 py-2 rounded-full outline-none bg-white shadow-md focus:ring-2 focus:ring-yellow-300"
              />
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`${navClass(
                "/"
              )} font-medium transition duration-300`}
            >
              Home
            </Link>

            <Link
              to="/products"
              className={`${navClass(
                "/products"
              )} font-medium transition duration-300`}
            >
              Products
            </Link>

            <Link
              to="/wishlist"
              className={`${navClass(
                "/wishlist"
              )} text-xl transition duration-300 hover:scale-110`}
            >
              <FaHeart />
            </Link>

            <Link
              to="/cart"
              className="relative text-white hover:text-yellow-300 transition duration-300 hover:scale-110"
            >
              <FaShoppingCart className="text-xl" />

              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>

            {!user ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-full bg-white text-blue-700 font-semibold hover:bg-yellow-300 transition duration-300"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-4 py-2 rounded-full border border-white text-white hover:bg-white hover:text-blue-700 transition duration-300"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDropdownOpen(!dropdownOpen);
                  }}
                  className="flex items-center gap-2 text-white hover:text-yellow-300 transition"
                >
                  <FaUser />
                  <span>{user.name || "Account"}</span>
                  <FaChevronDown
                    className={`transition-transform duration-300 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {dropdownOpen && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl overflow-hidden"
                  >
                    <Link
                      to="/profile"
                      onClick={closeAllMenus}
                      className="block px-5 py-3 hover:bg-gray-100"
                    >
                      👤 My Profile
                    </Link>

                    <Link
                      to="/orders"
                      onClick={closeAllMenus}
                      className="block px-5 py-3 hover:bg-gray-100"
                    >
                      📦 My Orders
                    </Link>

                    {user?.isAdmin && (
  <Link
    to="/admin-login"
    className="block px-5 py-3 hover:bg-gray-100 text-gray-700"
    onClick={closeAllMenus}
  >
    🔐 Admin Login
  </Link>
)}

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-5 py-3 hover:bg-red-50 text-red-600"
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden text-white text-2xl"
          >
            {mobileMenu ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Search */}
        {mobileMenu && (
          <div className="md:hidden pb-4">
            <div className="relative mt-2">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleSearch}
                className="w-full pl-11 pr-4 py-2 rounded-full outline-none"
              />
            </div>

            <div className="flex flex-col mt-5 space-y-4">
              <Link
                to="/"
                onClick={closeAllMenus}
                className={`${navClass("/")} font-medium`}
              >
                Home
              </Link>

              <Link
                to="/products"
                onClick={closeAllMenus}
                className={`${navClass("/products")} font-medium`}
              >
                Products
              </Link>

              <Link
                to="/wishlist"
                onClick={closeAllMenus}
                className={`${navClass("/wishlist")} flex items-center gap-2`}
              >
                <FaHeart />
                Wishlist
              </Link>

              <Link
                to="/cart"
                onClick={closeAllMenus}
                className={`${navClass("/cart")} flex items-center gap-2`}
              >
                <FaShoppingCart />
                Cart ({cart.length})
              </Link>

              {!user ? (
                <>
                  <Link
                    to="/login"
                    onClick={closeAllMenus}
                    className="bg-white text-blue-700 px-4 py-2 rounded-lg text-center font-semibold"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeAllMenus}
                    className="border border-white text-white px-4 py-2 rounded-lg text-center"
                  >
                    Register
                  </Link>

                  <Link
                    to="/admin-login"
                    onClick={closeAllMenus}
                    className="text-white"
                  >
                    Admin Login
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/profile"
                    onClick={closeAllMenus}
                    className="text-white"
                  >
                    👤 My Profile
                  </Link>

                  <Link
                    to="/orders"
                    onClick={closeAllMenus}
                    className="text-white"
                  >
                    📦 My Orders
                  </Link>

                  <Link
                    to="/admin-login"
                    onClick={closeAllMenus}
                    className="text-white"
                  >
                    🔐 Admin Login
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="text-left text-red-200 hover:text-red-100"
                  >
                    🚪 Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;