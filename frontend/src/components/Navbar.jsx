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
  FaHome,
  FaBoxOpen,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import Menu from "./Menu";
import { successToast } from "../utils/toast";
import Swal from "sweetalert2";
const Navbar = ({
  cart = [],
  darkMode,
  setDarkMode,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [location]);

  const handleLogout = async () => {
  const result = await Swal.fire({
    title: "Sign out?",
    html: `
      <p style="font-size:15px;color:${
        darkMode ? "#9CA3AF" : "#6B7280"
      }">
        You’ll need to sign in again to access your account.
      </p>
    `,

    showCancelButton: true,

    confirmButtonText: "Logout",
    cancelButtonText: "Stay",

    confirmButtonColor: "#2563eb",
    cancelButtonColor: "#6b7280",

    background: darkMode ? "#111827" : "#ffffff",
    color: darkMode ? "#ffffff" : "#111827",

    width: "430px",

    reverseButtons: true,
  });

  if (result.isConfirmed) {
    localStorage.removeItem("user");
    localStorage.removeItem("userToken");

    successToast(
      "Logged Out 👋",
      "See you again soon!"
    );

    setMenuOpen(false);

    navigate("/login");
  }
};

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const value = search.trim();

      if (value) {
        navigate(`/products?search=${encodeURIComponent(value)}`);
      } else {
        navigate("/products");
      }
    }
  };

  const navClass = (path) =>
    location.pathname === path
      ? "text-yellow-300"
      : "text-white hover:text-yellow-300";

  return (
  <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 dark:from-gray-900 dark:via-gray-800 dark:to-black shadow-lg transition-all duration-300">

  <div className="max-w-7xl mx-auto px-4">

    <div className="flex items-center justify-between h-16">

      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-bold text-white tracking-wide"
      >
        ShopSphere
      </Link>

      {/* Desktop Search */}
      <div className="hidden md:flex flex-1 justify-center px-8">
        <div className="relative w-full max-w-xl">

          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            className="w-full pl-11 pr-4 py-2 rounded-full outline-none bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 transition"
          />

        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">

        <Link to="/" className={navClass("/")}>
          Home
        </Link>

        <Link
  to="#"
  onClick={async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Loading Products...",
      text: "Fetching the latest collection.",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,

      background: document.documentElement.classList.contains("dark")
        ? "#111827"
        : "#ffffff",

      color: document.documentElement.classList.contains("dark")
        ? "#ffffff"
        : "#111827",

      didOpen: () => {
        Swal.showLoading();
      },
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    Swal.close();

    navigate("/products");
  }}
  className={navClass("/products")}
>
  Products
</Link>

        <Link
          to="/wishlist"
          className="text-white hover:text-red-300 text-xl"
        >
          ❤️
        </Link>

        <Link
          to="/cart"
          className="relative text-white text-xl"
        >
          <FaShoppingCart />

          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              {cart.length}
            </span>
          )}

        </Link>

          <button
  onClick={() => setDarkMode(!darkMode)}
  className="text-white text-xl hover:text-yellow-300 transition"
>
  {darkMode ? <FaSun /> : <FaMoon />}
</button>

        {!user ? (
          <>
            <Link
              to="/login"
              className="bg-white text-blue-700 px-4 py-2 rounded-full font-semibold"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="border border-white px-4 py-2 rounded-full text-white"
            >
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 text-white"
          >
            <FaUser />
            {user.name}
          </button>
        )}

      </div>

      {/* Mobile Top Navbar */}

      <div className="md:hidden flex items-center gap-4">

        <button>
  <FaSearch className="text-white text-xl" />
</button>

<button
  onClick={() => setDarkMode(!darkMode)}
>
  {darkMode ? (
    <FaSun className="text-white text-xl" />
  ) : (
    <FaMoon className="text-white text-xl" />
  )}
</button>

<button
  onClick={() => setMenuOpen(!menuOpen)}
>
  <FaBars className="text-white text-2xl" />
</button>

      </div>

    </div>

  </div>
<Menu
  menuOpen={menuOpen}
  setMenuOpen={setMenuOpen}
  user={user}
  handleLogout={handleLogout}
/>
{/* Mobile Bottom Navigation */}
<div className="fixed bottom-0 left-0 w-full md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-700 shadow-lg transition flex justify-around items-center py-2 z-40">

  <Link
  to="/"
  className={`flex flex-col items-center ${
    location.pathname === "/"
      ? "text-blue-700"
      : "text-gray-500 dark:text-gray-300"
  }`}
>
  <FaHome className="text-xl" />
  <span className="text-xs">Home</span>
</Link>

  <Link
  to="/products"
  className={`flex flex-col items-center ${
    location.pathname === "/products"
      ? "text-blue-700"
      : "text-gray-500 dark:text-gray-300"
  }`}
>
  <FaBoxOpen className="text-xl" />
  <span className="text-xs">Products</span>
</Link>

  <Link
  to="/cart"
  className={`relative flex flex-col items-center ${
    location.pathname === "/cart"
      ? "text-blue-700"
      : "text-gray-500 dark:text-gray-300"
  }`}
>
  <FaShoppingCart className="text-xl" />

  {cart.length > 0 && (
    <span className="absolute -top-2 left-4 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-bold text-white">
      {cart.reduce((total, item) => total + item.quantity, 0)}
    </span>
  )}

  <span className="text-xs">Cart</span>
</Link>

  <Link
  to={user ? "/profile" : "/login"}
  className={`flex flex-col items-center ${
    location.pathname === "/profile" ||
    location.pathname === "/login"
      ? "text-blue-700"
      : "text-gray-500 dark:text-gray-300"
  }`}
>
  <FaUser className="text-xl" />

  <span className="text-xs">
    {user ? "Profile" : "Login"}
  </span>
</Link>

</div>
</nav>
  );
};

export default Navbar;