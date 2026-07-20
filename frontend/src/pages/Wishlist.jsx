import { useEffect, useState } from "react";
import axios from "axios";

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
        ❤️ My Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <h2 className="text-center text-xl md:text-2xl text-gray-600 mt-16">
          Wishlist is Empty
        </h2>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >
              <img
                src={item.product?.image}
                alt={item.product?.name}
                className="w-full h-52 sm:h-56 object-cover"
              />

              <div className="p-5">
                <h2 className="text-lg md:text-xl font-bold line-clamp-1">
                  {item.product?.name}
                </h2>

                <p className="text-green-600 text-lg font-bold mt-2">
                  ₹{item.product?.price?.toLocaleString()}
                </p>

                <button
                  onClick={() => removeWishlist(item._id)}
                  className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition"
                >
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