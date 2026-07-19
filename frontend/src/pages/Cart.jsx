import { useNavigate } from "react-router-dom";

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

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
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
    <div  className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">
        🛒 Your Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center mt-20">
          <h2 className="text-3xl font-bold text-gray-600">
            Your Cart is Empty 😔
          </h2>

          <p className="text-gray-500 mt-2">
            Add some products to continue shopping.
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-lg p-5 flex flex-col md:flex-row md:justify-between md:items-center gap-6 hover:shadow-xl transition"
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 w-full">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-xl bg-gray-100"
                  />

                  <div>
                    <h2 className="text-xl font-bold">
                      {item.name}
                    </h2>

                    <p className="text-blue-600 font-semibold mt-2">
                      ₹{item.price.toLocaleString()}
                    </p>

                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() => decreaseQuantity(item._id)}
                        className="bg-red-500 text-white w-8 h-8 rounded-full"
                      >
                        -
                      </button>

                      <span className="font-bold text-lg">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item._id)}
                        className="bg-green-600 text-white w-8 h-8 rounded-full"
                      >
                        +
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
                    className="mt-4 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-white rounded-2xl shadow-xl p-6 max-w-xl ml-auto">
            <div className="flex justify-between text-lg sm:text-xl font-semibold">
              <span>Total Items</span>
              <span>{totalItems}</span>
            </div>

            <div className="flex justify-between text-2xl sm:text-3xl font-bold text-green-600 mt-4">
              <span>Grand Total</span>
              <span>₹{totalPrice.toLocaleString()}</span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="mt-6 w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 rounded-xl text-lg font-semibold transition duration-300 shadow-lg hover:shadow-xl"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;