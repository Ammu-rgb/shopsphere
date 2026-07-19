import { useNavigate } from "react-router-dom";

function HeroContent() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="relative z-10 h-full flex items-center">
      <div className="max-w-7xl mx-auto px-8">

        <span className="inline-block bg-yellow-400 text-black font-bold px-5 py-2 rounded-full shadow-lg">
          🔥 Flat 50% OFF Today
        </span>

        <h1 className="text-5xl md:text-7xl font-extrabold text-white mt-6 leading-tight">
          Welcome to
          <br />
          ShopSphere 🛒
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl leading-8">
          Discover thousands of premium products at unbeatable prices.
          Shop smarter, faster and easier with ShopSphere.
        </p>

        <div className="flex flex-wrap gap-5 mt-10">

          <button
            onClick={() => navigate("/products")}
            className="bg-white text-blue-700 font-bold px-8 py-4 rounded-xl hover:scale-105 transition duration-300 shadow-lg"
          >
            Shop Now
          </button>

          {user?.isAdmin && (
            <button
              onClick={() => navigate("/admin")}
              className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-700 transition duration-300"
            >
              Admin Panel
            </button>
          )}

        </div>

      </div>
    </div>
  );
}

export default HeroContent;