import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
function Wishlist() {
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

      console.log(res.data);

      setWishlist(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeWishlist = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/wishlist/${id}`
      );

      fetchWishlist();
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return (
      <div className="text-center mt-20 text-3xl font-bold">
        Please Login First
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
         My Wishlist
      </h1>
      <p className="text-center text-gray-500 mb-10">
  Your favourite products in one place.
</p>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20">
  <div className="text-7xl">💖</div>

  <h2 className="mt-6 text-3xl font-bold text-gray-700">
    Your Wishlist is Empty
  </h2>

  <p className="mt-2 text-gray-500">
    Save your favourite products here.
  </p>

  <button
    onClick={() => window.location.href="/products"}
    className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
  >
    Continue Shopping
  </button>
</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100"
            >
              <img
                src={item.product?.image}
                alt={item.product?.name}
                className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
              />

              <div className="p-5">
                <h2 className="mt-2 text-xl font-bold line-clamp-1">
                  {item.product?.name}
                </h2>

                <p className="mt-3 text-2xl font-bold text-green-600">
                  ₹{item.product?.price?.toLocaleString()}
                </p>

                <button
  onClick={() => removeWishlist(item._id)}
  className="mt-5 w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition"
>
  <FaTrashAlt />
  Remove
</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;