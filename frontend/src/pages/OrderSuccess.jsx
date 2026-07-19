import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

function OrderSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-lg w-full text-center">

        <FaCheckCircle
          className="text-green-500 mx-auto mb-6 animate-bounce"
          size={90}
        />

        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Payment Successful!
        </h1>

        <p className="text-gray-600 text-lg mb-6">
          Thank you for shopping with <b>ShopSphere</b>.
          <br />
          Your order has been placed successfully.
        </p>

        <div className="bg-gray-100 rounded-xl p-5 mb-6 text-left space-y-2">
          <p>
            <span className="font-semibold">Order Status:</span>{" "}
            Confirmed
          </p>

          <p>
            <span className="font-semibold">Payment:</span>{" "}
            Successful
          </p>

          <p>
            <span className="font-semibold">Estimated Delivery:</span>{" "}
            3-5 Business Days
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Link
            to="/my-orders"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold"
          >
            My Orders
          </Link>

          <Link
            to="/products"
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;