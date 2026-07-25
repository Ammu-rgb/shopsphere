import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaTrashAlt,
  FaHeart,
  FaShoppingCart,
  FaArrowLeft,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { successToast, errorToast } from "../utils/toast";
import Swal from "sweetalert2";
const Wishlist = ({ cart, setCart }) => {
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    if (!user) return;

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/wishlist/${user.id}`
      );

      setWishlist(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeWishlist = async (id) => {
  const result = await Swal.fire({
    title: "Remove from Wishlist?",

    html: `
      <div style="font-size:15px;color:${
        document.documentElement.classList.contains("dark")
          ? "#9CA3AF"
          : "#6B7280"
      }">
        This product will be removed from your wishlist.
      </div>
    `,

    icon: "warning",

    background: document.documentElement.classList.contains("dark")
      ? "#111827"
      : "#ffffff",

    color: document.documentElement.classList.contains("dark")
      ? "#ffffff"
      : "#111827",

    showCancelButton: true,

    confirmButtonText: "Remove",

    cancelButtonText: "Keep",

    confirmButtonColor: "#DC2626",

    cancelButtonColor: "#2563EB",

    reverseButtons: true,

    focusCancel: true,

    width: "440px",
  });

  if (!result.isConfirmed) return;

  try {
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/wishlist/${id}`
    );

    successToast(
      "Removed",
      "Product removed from wishlist."
    );

    fetchWishlist();
  } catch (error) {
    console.log(error);

    errorToast(
      "Error",
      "Unable to remove product."
    );
  }
};

  const addToCart = async (product) => {
  if (!product) return;

  if (product.stock === 0) {
    return errorToast(
      "Out of Stock",
      `${product.name} is currently unavailable.`
    );
  }

  const result = await Swal.fire({
    title: "Add to Cart?",

    html: `
      <div style="font-size:15px;color:${
        document.documentElement.classList.contains("dark")
          ? "#9CA3AF"
          : "#6B7280"
      }">
        This product will be added to your shopping cart.
      </div>
    `,

    icon: "question",

    background: document.documentElement.classList.contains("dark")
      ? "#111827"
      : "#ffffff",

    color: document.documentElement.classList.contains("dark")
      ? "#ffffff"
      : "#111827",

    showCancelButton: true,

    confirmButtonText: "Add to Cart",

    cancelButtonText: "Cancel",

    confirmButtonColor: "#2563EB",

    cancelButtonColor: "#6B7280",

    reverseButtons: true,

    focusCancel: true,

    width: "440px",
  });

  if (!result.isConfirmed) return;

  setCart((prevCart) => {
    const existing = prevCart.find(
      (item) => item._id === product._id
    );

    if (existing) {
      if (existing.quantity >= product.stock) {
        errorToast(
          "Stock Limit",
          `Only ${product.stock} item(s) available.`
        );
        return prevCart;
      }

      successToast(
        "Cart Updated",
        `${product.name} quantity increased.`
      );

      return prevCart.map((item) =>
        item._id === product._id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    }

    successToast(
      "Added to Cart",
      `${product.name} added successfully.`
    );

    return [
      ...prevCart,
      {
        ...product,
        quantity: 1,
      },
    ];
  });
};

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition">

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-10 text-center max-w-md">

          <div className="text-6xl mb-5">
            🔒
          </div>

          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Login Required
          </h2>

          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Please login to access your wishlist.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
          >
            Login
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-all duration-300 px-4 sm:px-6 lg:px-8 py-8">

      {/* Header */}

      <div className="flex items-center justify-between mb-8">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-xl shadow hover:scale-105 transition"
        >
          <FaArrowLeft />
          Back
        </button>

        <div className="text-center flex-1">

          <h1 className="text-3xl md:text-4xl font-bold flex justify-center items-center gap-3">
            <FaHeart className="text-red-500" />
            My Wishlist
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Your favourite products in one place.
          </p>

        </div>

        <div className="w-24"></div>

      </div>

      {/* Empty */}

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20">

          <div className="text-8xl">
            
          </div>

          <h2 className="mt-6 text-3xl font-bold">
            Your Wishlist is Empty
          </h2>

          <p className="mt-3 text-gray-500 dark:text-gray-400">
            Save your favourite products here.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
          >
            Continue Shopping
          </button>

        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

          {wishlist.map((item) => (
            <div
              key={item._id}
              className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
            >
              <img
                src={item.product?.image}
                alt={item.product?.name}
                className="w-full aspect-square object-cover"
              />

              <div className="p-4 flex flex-col flex-1">

                <h2 className="font-bold text-lg line-clamp-2 min-h-[56px]">
                  {item.product?.name}
                </h2>

                <p className="text-blue-600 font-bold text-xl mt-2">
                  ₹{item.product?.price?.toLocaleString()}
                </p>

                {item.product?.stock > 0 ? (
                  <p className="text-green-600 font-semibold mt-2">
                    🟢 In Stock ({item.product.stock})
                  </p>
                ) : (
                  <p className="text-red-500 font-semibold mt-2">
                    🔴 Out of Stock
                  </p>
                )}

                <div className="mt-auto space-y-3 pt-5">

                  <button
                    onClick={() => addToCart(item.product)}
                    disabled={item.product?.stock === 0}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition ${
                      item.product?.stock === 0
                        ? "bg-gray-400 cursor-not-allowed text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    <FaShoppingCart />
                    Add to Cart
                  </button>

                  <button
                    onClick={() =>
                      removeWishlist(item._id)
                    }
                    className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition"
                  >
                    <FaTrashAlt />
                    Remove
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Wishlist;