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
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-3 flex flex-row items-center gap-3 hover:shadow-xl transition border border-gray-200 dark:border-gray-700"
              >
               <div className="flex items-start gap-4 w-full">
                  <img
                    src={item.image}
                    alt={item.name}
                  className="w-24 h-24 rounded-xl object-cover flex-shrink-0 border border-gray-200 dark:border-gray-700"
                  />

                  <div className="flex-1 flex flex-col justify-between min-h-[96px]">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white leading-6">
                      {item.name}
                    </h2>

                    <p className="text-green-600 text-lg font-bold mt-1">
                      ₹{item.price.toLocaleString()}
                    </p>

                  <div className="mt-3 flex items-center w-fit rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden shadow-sm">

  <button
    onClick={() => decreaseQuantity(item._id)}
    className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-700 hover:bg-red-500 hover:text-white transition"
  >
    <FaMinus size={11} />
  </button>

  <span className="w-9 h-8 flex items-center justify-center font-semibold text-sm bg-white dark:bg-gray-800">
    {item.quantity}
  </span>

  <button
    onClick={() => increaseQuantity(item._id)}
    className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-700 hover:bg-green-600 hover:text-white transition"
  >
    <FaPlus size={11} />
  </button>

</div>
                  </div>
                </div>

              <div className="flex flex-col justify-between items-end h-24 min-w-[90px] flex-shrink-0">

              <h2 className="text-lg font-bold text-green-600">
    ₹{(item.price * item.quantity).toLocaleString()}
  </h2>

  <button
    onClick={() => removeFromCart(item._id)}
  className="flex items-center gap-1.5 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300"
  >
    <FaTrash />
    Remove
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