import { useEffect, useState } from "react";
import axios from "axios";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    if (!user) return;

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/orders/user/${user.id}`
      );
      console.log(JSON.stringify(res.data, null, 2));
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";

      case "Confirmed":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";

      case "Packed":
        return "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300";

      case "Shipped":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300";

      case "Out for Delivery":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300";

      case "Delivered":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";

      case "Cancelled":
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";

      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Please Login First
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-all duration-300 p-4 sm:p-6 lg:p-10">
      <h1 className="text-4xl font-bold text-center mb-4">
        📦 My Orders
      </h1>

      <p className="text-center text-gray-500 dark:text-gray-400 mb-10">
        Track all your orders and their current status.
      </p>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <div className="text-7xl">📦</div>

          <h2 className="mt-6 text-3xl font-bold text-gray-700 dark:text-white">
            No Orders Yet
          </h2>

          <p className="mt-2 text-gray-500 dark:text-gray-400 text-center">
            Looks like you haven't placed an order yet.
          </p>

          <button
            onClick={() => (window.location.href = "/products")}
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-6"
            >
              {/* Top */}

              <div className="flex flex-wrap justify-between gap-6 mb-6">
                <div>
                  <p className="font-bold text-gray-700 dark:text-gray-300">
                    Order ID
                  </p>

                  <p className="text-sm text-gray-500 dark:text-gray-400 break-all">
                    {order._id}
                  </p>
                </div>

                <div>
                  <p className="font-bold text-gray-700 dark:text-gray-300">
                    Total Amount
                  </p>

                  <p className="text-2xl font-bold text-green-600">
                    ₹{Number(order.totalAmount).toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="font-bold text-gray-700 dark:text-gray-300">
                    Status
                  </p>

                  <span
                    className={`inline-block mt-2 px-5 py-2 rounded-full text-sm font-bold shadow ${getStatusColor(
                      order.orderStatus
                    )}`}
                  >
                    {order.orderStatus}
                  </span>
                </div>
              </div>

              <hr className="border-gray-300 dark:border-gray-700 mb-6" />

              {/* Products */}

              {order.products.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-center gap-5 py-5 border-b border-gray-200 dark:border-gray-700"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 rounded-xl object-cover bg-gray-100 dark:bg-gray-700"
                  />

                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {item.name}
                    </h2>

                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      Quantity: {item.quantity}
                    </p>

                    <p className="text-green-600 text-xl font-bold mt-2">
                      ₹{Number(item.price).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}

              {/* Footer */}

              <div className="mt-6 flex flex-col sm:flex-row justify-between gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span>
                  📅{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>

                <span>
                  🕒{" "}
                  {new Date(order.createdAt).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;