import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { successToast, errorToast } from "../utils/toast";
import {
  FaHeart,
  FaShoppingCart,
  FaBolt,
  FaStar,
  FaShippingFast,
  FaShieldAlt,
  FaUndo,
} from "react-icons/fa";
function ProductDetails({ cart, setCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);

  const [reviews, setReviews] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(true);

  const [reviewForm, setReviewForm] = useState({
  customerName: "",
  rating: 5,
  comment: "",
});

  useEffect(() => {
    fetchProduct();
    fetchReviews();
    // eslint-disable-next-line
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
      const allProducts = res.data || [];

      setProducts(allProducts);

      const found = allProducts.find(
        (item) => String(item._id) === String(id)
      );

      setProduct(found || null);
    } catch (error) {
      console.error(error);
      errorToast("Failed to load product.");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      setReviewLoading(true);

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/reviews/${id}`
      );

      setReviews(res.data || []);
    } catch (error) {
      console.error(error);
      setReviews([]);
    } finally {
      setReviewLoading(false);
    }
  };

  const averageRating = useMemo(() => {
    if (!reviews.length) return 0;

    const total = reviews.reduce(
      (sum, item) => sum + Number(item.rating || 0),
      0
    );

    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  const addToCart = () => {
    if (!product) return;

    if (product.stock === 0) {
      errorToast("Product is out of stock.");
      return;
    }

    const existing = cart.find(
      (item) => item._id === product._id
    );

    if (existing) {
      if (existing.quantity >= product.stock) {
        errorToast("No more stock available.");
        return;
      }

      const updated = cart.map((item) =>
        item._id === product._id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );

      setCart(updated);
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }

    successToast("Added to cart.");
  };

  const handleBuyNow = () => {
    addToCart();

    if (product && product.stock > 0) {
      navigate("/cart");
    }
  };

  const addToWishlist = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

await axios.post(
  `${import.meta.env.VITE_API_URL}/api/wishlist`,
  {
    userId: user.id,
    productId: product._id,
  }
);
      

      successToast("Added to wishlist.");
    } catch (error) {
      console.error(error);
      errorToast("Failed to add wishlist.");
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
  `${import.meta.env.VITE_API_URL}/api/reviews`,
  {
    productId: id,
    customerName: reviewForm.customerName,
    rating: reviewForm.rating,
    comment: reviewForm.comment,
  }
);

      successToast("Review submitted.");

      setReviewForm({
        name: "",
        rating: 5,
        comment: "",
      });

      fetchReviews();
    } catch (error) {
      console.error(error);
      errorToast("Failed to submit review.");
    }
  };

  const relatedProducts = products.filter(
    (item) =>
      item.category === product?.category &&
      item._id !== product?._id
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-2xl font-bold">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600 text-3xl font-bold">
        Product Not Found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <img
            src={product.image}
            alt={product.name}
           className="w-full h-72 sm:h-96 lg:h-[520px] object-cover rounded-2xl shadow-2xl hover:scale-105 transition duration-500"
          />
        </div>

        <div>
          <h1 className="text-3xl md:text-4xl font-bold">
            {product.name}
          </h1>

          <p className="mt-3 text-gray-500">
            Category: {product.category}
          </p>
          <div className="flex items-center gap-1 mt-3 text-yellow-500">
  <FaStar />
  <FaStar />
  <FaStar />
  <FaStar />
  <FaStar />

  <span className="ml-2 text-gray-600">
    ({reviews.length} Reviews)
  </span>
</div>
          <p className="mt-4 text-2xl md:text-3xl font-bold text-green-600">
            ₹{product.price}
          </p>
          <p className="text-sm text-gray-500 mt-2">
Inclusive of all taxes
</p>

          <p className="mt-6 text-gray-700 leading-7">
            {product.description}
          </p>

          <div className="mt-6">
            {product.stock === 0 ? (
              <span className="bg-red-500 text-white px-4 py-2 rounded-full">
                Out of Stock
              </span>
            ) : product.stock <= 5 ? (
              <span className="bg-orange-500 text-white px-4 py-2 rounded-full">
                Only {product.stock} Left 🔥
              </span>
            ) : (
              <span className="bg-green-600 text-white px-4 py-2 rounded-full">
                In Stock ({product.stock})
              </span>
            )}
          </div>
          <div className="mt-8 space-y-4">

  <div className="flex items-center gap-3">
    <FaShippingFast className="text-blue-600 text-xl" />
    <span className="text-gray-700">
      Free Delivery Available
    </span>
  </div>

  <div className="flex items-center gap-3">
    <FaShieldAlt className="text-green-600 text-xl" />
    <span className="text-gray-700">
      100% Secure Payment
    </span>
  </div>

  <div className="flex items-center gap-3">
    <FaUndo className="text-orange-500 text-xl" />
    <span className="text-gray-700">
      7 Days Easy Return
    </span>
  </div>

</div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <button
              onClick={addToCart}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              <FaShoppingCart className="inline mr-2"/>
Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              <FaBolt className="inline mr-2"/>
Buy Now
            </button>

            <button
              onClick={addToWishlist}
              className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition"
            >
              <FaHeart className="inline mr-2"/>
Wishlist
            </button>
          </div>

          <div className="mt-10">
            <h2 className="text-xl md:text-2xl font-bold">
              Reviews
            </h2>

            <p className="mt-2 text-lg">
              ⭐ Average Rating: {averageRating} / 5
            </p>

            {reviewLoading ? (
              <p className="mt-4">Loading Reviews...</p>
            ) : reviews.length === 0 ? (
              <p className="mt-4 text-gray-500">
                No reviews yet.
              </p>
            ) : (
              <div className="space-y-4 mt-6">
                {reviews.map((review) => (
                  <div
                    key={review._id}
                    className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100 hover:shadow-2xl transition duration-300"
                  >
                    <div className="flex justify-between items-center">
  <h3 className="font-bold text-lg">
    {review.name}
  </h3>

  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
    ⭐ {review.rating}/5
  </span>
</div>

                    <p className="mt-4 text-gray-600 leading-7">
  {review.comment}
</p>
                  </div>
                ))}
              </div>
            )}

            <form
              onSubmit={submitReview}
              className="mt-8 space-y-4"
            >
              <input
                type="text"
                placeholder="Your Name"
                value={reviewForm.customerName}
                onChange={(e) =>
  setReviewForm({
    ...reviewForm,
    customerName: e.target.value,
  })
}
                required
                className="w-full border rounded-lg p-3"
              />

              <select
                value={reviewForm.rating}
                onChange={(e) =>
                  setReviewForm({
                    ...reviewForm,
                    rating: Number(e.target.value),
                  })
                }
                className="w-full border rounded-lg p-3"
              >
                <option value={5}>5</option>
                <option value={4}>4</option>
                <option value={3}>3</option>
                <option value={2}>2</option>
                <option value={1}>1</option>
              </select>

              <textarea
                rows="4"
                placeholder="Write your review..."
                value={reviewForm.comment}
                onChange={(e) =>
                  setReviewForm({
                    ...reviewForm,
                    comment: e.target.value,
                  })
                }
                required
                className="w-full border rounded-lg p-3"
              />

              <button
                type="submit"
                className="bg-black text-white px-6 py-3 rounded-lg"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8">
          Related Products
        </h2>

        {relatedProducts.length === 0 ? (
          <p>No related products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <div
                key={item._id}
                className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-56 sm:h-60 object-cover"
                />

                <div className="p-4">
                  <h3 className="font-bold text-lg">
                    {item.name}
                  </h3>

                  <p className="text-green-600 font-semibold mt-2">
                    ₹{item.price}
                  </p>

                  <button
                    onClick={() =>
                      navigate(`/product/${item._id}`)
                    }
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;