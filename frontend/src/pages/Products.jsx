import { useEffect, useState } from "react";
import api from "../utils/api";
import { successToast, errorToast } from "../utils/toast";
import {
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";

function Products({ cart, setCart }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [searchParams] = useSearchParams();
 useEffect(() => {
  const keyword = searchParams.get("search");
  const selectedCategory =
    searchParams.get("category");

  if (keyword) {
    setSearch(keyword);
  } else {
    setSearch("");
  }

  if (selectedCategory) {
    setCategory(selectedCategory);
  } else {
    setCategory("All");
  }

  fetchProducts();
}, [location.search]);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");

      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = (product) => {
  if (product.stock === 0) {
    return errorToast(
      "Out of Stock",
      `${product.name} is currently unavailable.`
    );
  }

  setCart((prevCart) => {
    const existingProduct = prevCart.find(
      (item) => item._id === product._id
    );

    if (existingProduct) {
      if (existingProduct.quantity >= product.stock) {
        errorToast(
          "Stock Limit",
          `Only ${product.stock} item(s) available.`
        );
        return prevCart;
      }

      successToast(
        "Cart Updated 🛒",
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
      "Added to Cart 🛒",
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

      
 const filteredProducts = products
  .filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  })
  .sort((a, b) => {
    if (sortBy === "low") {
      return a.price - b.price;
    }

    if (sortBy === "high") {
      return b.price - a.price;
    }

    if (sortBy === "az") {
      return a.name.localeCompare(b.name);
    }

    return 0;
  });

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-10 transition-all duration-300">
      <h1 className="text-4xl font-bold text-center mb-10">
  {category === "All"
    ? "Our Products 🛍️"
    : `${category} Products`}
</h1>

      {/* Search + Filter */}

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-6 mb-10 transition-all">

  <div className="flex flex-col lg:flex-row gap-5">

    {/* Search */}

    <input
      type="text"
      placeholder="🔍 Search Products..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="flex-1 px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    />

    {/* Category */}

    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="w-full lg:w-60 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-black dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500"
    >
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>

    {/* Sort */}

    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      className="w-full lg:w-60 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-black dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500"
    >
      <option value="default">
        Featured
      </option>

      <option value="low">
        Price : Low → High
      </option>

      <option value="high">
        Price : High → Low
      </option>

      <option value="az">
        Name : A → Z
      </option>

    </select>

  </div>

  <p className="mt-5 text-gray-600 dark:text-gray-300 font-medium">
    Showing <span className="font-bold text-blue-600">
      {filteredProducts.length}
    </span> Products
  </p>

</div>

      {/* Products */}

      {filteredProducts.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          No Products Found 😔
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              onClick={() =>
                navigate(`/product/${product._id}`)
              }
            className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition duration-300 flex flex-col cursor-pointer"
            >
              <div className="absolute top-4 right-4 z-10">

  <button
    onClick={(e) => {
      e.stopPropagation();
    }}
    className="bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg hover:bg-red-50 dark:hover:bg-red-900 transition"
  >
    ❤️
  </button>

</div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-36 sm:h-48 lg:h-64 object-cover bg-gray-100 transition duration-500 hover:scale-105"
              />

              <div className="p-3 sm:p-5">
                <div className="flex justify-between items-center">

  <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
     Bestseller
  </span>

  <span className="text-yellow-500 font-semibold">
    ⭐ 4.8
  </span>

</div>
                <h2 className="text-sm sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white line-clamp-1 min-h-[24px]">
                  {product.name}
                </h2>

                <p className="text-blue-600 text-base sm:text-lg font-semibold mt-2">
                  ₹{product.price.toLocaleString()}
                </p>
              {product.stock === 0 ? (
  <p className="text-red-600 font-bold mt-2">
    🔴 Out of Stock
  </p>
) : product.stock <= 5 ? (
  <p className="text-orange-500 font-semibold mt-2">
    🟠 Only {product.stock} left
  </p>
) : (
  <p className="text-green-600 font-semibold mt-2">
    🟢 In Stock ({product.stock})
  </p>
)}

                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 line-clamp-2 min-h-[45px]">
  {product.description}
</p>

                <button
  disabled={product.stock === 0}
  onClick={(e) => {
    e.stopPropagation();
    addToCart(product);
  }}
  className={`mt-3 w-full py-2 text-sm sm:text-base rounded-lg text-white transition ${
    product.stock === 0
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700"
  }`}
>
  {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;