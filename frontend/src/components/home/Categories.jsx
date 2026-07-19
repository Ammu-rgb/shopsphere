import { useNavigate } from "react-router-dom";

function Categories() {
  const navigate = useNavigate();

  const categories = [
    {
      emoji: "📱",
      name: "Electronics",
    },
    {
      emoji: "👕",
      name: "Fashion",
    },
    {
      emoji: "👟",
      name: "Shoes",
    },
    {
      emoji: "⌚",
      name: "Accessories",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-20">

      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-14">
        Shop by Categories
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">

        {categories.map((category, index) => (

          <div
            key={index}
            onClick={() =>
  navigate(`/products?category=${category.name}`)
}
            className="bg-white rounded-2xl shadow-lg p-5 sm:p-8 text-center cursor-pointer hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition-all duration-300"
          >

            <div className="text-5xl sm:text-6xl">
              {category.emoji}
            </div>

            <h3 className="text-lg sm:text-2xl font-bold mt-4 sm:mt-5">
              {category.name}
            </h3>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Categories;