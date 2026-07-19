import { useNavigate } from "react-router-dom";

function WelcomeSection() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  return (
   <section className="bg-white py-14 sm:py-16 md:py-20">

      <div className="max-w-7xl mx-auto px-5 sm:px-8 text-center">

        <span className="inline-block bg-blue-100 text-blue-700 font-semibold px-4 sm:px-5 py-2 rounded-full mb-5 text-sm sm:text-base">
          🛍️ Welcome to ShopSphere
        </span>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 leading-tight">
          Discover Premium Products
          <br />
          At Amazing Prices
        </h2>

        <p className="mt-6 text-gray-600 text-base sm:text-lg max-w-3xl mx-auto leading-7 sm:leading-8">
          Shop the latest Electronics, Fashion, Shoes and Accessories
          with exciting offers, secure payments and lightning-fast
          delivery across India.
        </p>

        <div className="flex flex-wrap justify-center gap-5 mt-10">

          <button
            onClick={() => navigate("/products")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition duration-300 w-full sm:w-auto"
          >
            🛒 Shop Now
          </button>

          {user?.isAdmin && (
            <button
              onClick={() => navigate("/admin")}
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold transition duration-300 w-full sm:w-auto"
            >
              ⚙️ Admin Panel
            </button>
          )}

        </div>

      </div>

    </section>
  );
}

export default WelcomeSection;