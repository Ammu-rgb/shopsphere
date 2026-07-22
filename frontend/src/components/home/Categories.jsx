import { useNavigate } from "react-router-dom";
import { FaLaptop, FaTshirt } from "react-icons/fa";
import { GiRunningShoe } from "react-icons/gi";
import { IoWatch } from "react-icons/io5";

function Categories() {
  const navigate = useNavigate();

  const categories = [
    {
      icon: (
        <FaLaptop className="text-5xl sm:text-6xl text-blue-600" />
      ),
      name: "Electronics",
    },
    {
      icon: (
        <FaTshirt className="text-5xl sm:text-6xl text-pink-500" />
      ),
      name: "Fashion",
    },
    {
      icon: (
        <GiRunningShoe className="text-5xl sm:text-6xl text-gray-700" />
      ),
      name: "Shoes",
    },
    {
      icon: (
        <IoWatch className="text-5xl sm:text-6xl text-amber-500" />
      ),
      name: "Accessories",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-20 bg-gray-50 dark:bg-gray-900 transition-all duration-300">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-14 text-gray-900 dark:text-white">
        Shop by Categories
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() =>
              navigate(`/products?category=${category.name}`)
            }
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 sm:p-8 text-center cursor-pointer hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition-all duration-300 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex justify-center">
              {category.icon}
            </div>

            <h3 className="text-lg sm:text-2xl font-bold mt-5 text-gray-900 dark:text-white">
              {category.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;