import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function FeaturedProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/products`
      );

      setProducts(res.data.slice(0, 4));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-20 bg-gray-50 dark:bg-gray-900 transition-all duration-300">

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white">
          ⭐ Featured Products
        </h2>

        <button
          onClick={() => navigate("/products")}
          className="text-blue-600 font-semibold hover:underline"
        >
          View All →
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">

        {products.map((product) => (

          <div
            key={product._id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col"
          >

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-36 sm:h-60 object-cover bg-gray-100"
            />

            <div className="p-3 sm:p-5 flex flex-col flex-1">

              <h3 className="text-sm sm:text-xl font-bold line-clamp-1 text-gray-900 dark:text-white">
                {product.name}
              </h3>

              <p className="text-gray-500 dark:text-gray-300 text-xs sm:text-base mt-2 line-clamp-2 flex-1">
                {product.description}
              </p>

              <p className="text-lg sm:text-2xl font-bold text-green-600 mt-3">
                ₹{product.price.toLocaleString()}
              </p>

              <button
                onClick={() => navigate(`/product/${product._id}`)}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-semibold transition"
              >
                View Product
              </button>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default FeaturedProducts;