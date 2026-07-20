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
    <section className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-20">

      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-14">
         Featured Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">

        {products.map((product) => (

          <div
            key={product._id}
           className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 cursor-pointer flex flex-col"
          >

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-52 sm:h-60 object-cover bg-gray-100 transition duration-500 hover:scale-105"
            />

            <div className="p-4 sm:p-5 flex flex-col flex-1">

              <h3 className="text-lg sm:text-xl font-bold line-clamp-1">
                {product.name}
              </h3>

              <p className="text-gray-500 text-sm sm:text-base mt-2 line-clamp-2 flex-1">
                {product.description}
              </p>

              <p className="text-xl sm:text-2xl font-bold text-green-600 mt-4">
                ₹{product.price.toLocaleString()}
              </p>

              <button
                onClick={() => navigate(`/product/${product._id}`)}
               className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition duration-300 hover:scale-105"
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