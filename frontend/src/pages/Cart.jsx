import { useNavigate } from "react-router-dom";
import {
  FaTrash,
  FaShoppingCart,
  FaMinus,
  FaPlus,
  FaTruck,
  FaShieldAlt,
  FaTag,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { successToast } from "../utils/toast";
function Cart({ cart, setCart }) {
  const navigate = useNavigate();

  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item._id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setCart(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
  };

  const removeFromCart = async (id) => {
  const result = await Swal.fire({
    title: "Remove this item?",

    html: `
      <div style="font-size:15px;color:${
        document.documentElement.classList.contains("dark")
          ? "#9CA3AF"
          : "#6B7280"
      }">
        This product will be removed from your shopping cart.
        <br><br>
        You can add it again anytime from the Products page.
      </div>
    `,

    icon: "warning",

    background: document.documentElement.classList.contains("dark")
      ? "#111827"
      : "#ffffff",

    color: document.documentElement.classList.contains("dark")
      ? "#ffffff"
      : "#111827",

    showCancelButton: true,

    confirmButtonText: "Remove",

    cancelButtonText: "Keep Item",

    confirmButtonColor: "#DC2626",

    cancelButtonColor: "#2563EB",

    reverseButtons: true,

    focusCancel: true,

    width: "440px",
  });

  if (!result.isConfirmed) return;

  const updatedCart = cart.filter((item) => item._id !== id);

  setCart(updatedCart);

  successToast(
    "Item Removed",
    "The product has been removed from your cart."
  );
};

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div  className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white px-4 sm:px-6 lg:px-8 py-8 transition-all duration-300">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 flex justify-center items-center gap-3">
  <FaShoppingCart className="text-blue-600" />
  Your Cart
</h1>

      {cart.length === 0 ? (
        <div className="text-center mt-20">
          <h2 className="text-3xl font-bold text-gray-700 dark:text-white">
            Your Cart is Empty
          </h2>

          <p className="text-gray-500 dark:text-gray-300 mt-2">
            Add some products to continue shopping.
          </p>
          <button
onClick={()=>navigate("/products")}
className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
>
Continue Shopping
</button>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item._id}
               className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 flex flex-col md:flex-row md:justify-between md:items-center gap-6 hover:shadow-xl transition border border-gray-200 dark:border-gray-700"
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 w-full">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-xl bg-gray-100"
                  />

                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {item.name}
                    </h2>

                    <p className="text-blue-600 font-semibold mt-2">
                      ₹{item.price.toLocaleString()}
                    </p>

                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() => decreaseQuantity(item._id)}
                        className="bg-red-500 hover:bg-red-600 text-white w-9 h-9 rounded-full flex items-center justify-center transition"
                      >
                        <FaMinus />
                      </button>

                      <span className="font-bold text-lg">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item._id)}
                        className="bg-green-600 hover:bg-green-700 text-white w-9 h-9 rounded-full flex items-center justify-center transition"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="text-center md:text-right w-full md:w-auto">
                  <h2 className="text-xl font-bold text-green-600">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </h2>

                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="mt-4 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl transition"
                  >
                    <>
  <FaTrash className="inline mr-2" />
  Remove
</>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-xl ml-auto border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between text-lg sm:text-xl font-semibold">
              <span>Total Items</span>
              <span>{totalItems}</span>
            </div>
            <hr className="my-5" />

<div className="space-y-3">

<div className="flex justify-between">
<span>Subtotal</span>
<span>₹{totalPrice.toLocaleString()}</span>
</div>

<div className="flex justify-between">
<span>Shipping</span>
<span className="text-green-600 font-semibold">
FREE
</span>
</div>

<div className="flex justify-between">
<span>GST</span>
<span>Included</span>
</div>

</div>

<hr className="my-5 border-gray-300 dark:border-gray-700" />
            <div className="flex justify-between text-2xl sm:text-3xl font-bold text-green-600 mt-4">
              <span>Grand Total</span>
              <span>₹{totalPrice.toLocaleString()}</span>
            </div>

            <button
  onClick={async () => {
    Swal.fire({
      title: "Preparing Secure Checkout...",
      text: "Please wait while we verify your cart.",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,

      background: document.documentElement.classList.contains("dark")
        ? "#111827"
        : "#ffffff",

      color: document.documentElement.classList.contains("dark")
        ? "#ffffff"
        : "#111827",

      didOpen: () => {
        Swal.showLoading();
      },
    });

    await new Promise((resolve) =>
      setTimeout(resolve, 1800)
    );

    Swal.close();

    navigate("/checkout");
  }}
  className="mt-6 w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 rounded-xl text-lg font-semibold transition duration-300 shadow-lg hover:shadow-xl"
>
  Proceed Secure Checkout →
</button>
            <div className="mt-6 space-y-3 text-sm text-gray-600 dark:text-gray-300">

  <div className="flex items-center gap-3">
    <FaTruck className="text-blue-600" />
    <span>Free Delivery Across India</span>
  </div>

  <div className="flex items-center gap-3">
    <FaShieldAlt className="text-green-600" />
    <span>100% Secure Payments</span>
  </div>

  <div className="flex items-center gap-3">
    <FaTag className="text-orange-500" />
    <span>Best Price Guaranteed</span>
  </div>

</div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;