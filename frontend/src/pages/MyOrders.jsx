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

      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Status Badge Color
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Confirmed":
        return "bg-blue-100 text-blue-700";

      case "Packed":
        return "bg-indigo-100 text-indigo-700";

      case "Shipped":
        return "bg-purple-100 text-purple-700";

      case "Out for Delivery":
        return "bg-orange-100 text-orange-700";

      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (!user) {
    return (
      <div className="text-center mt-20 text-3xl font-bold">
        Please Login First
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        My Orders
      </h1>
      <p className="text-center text-gray-500 mb-10">
  Track all your orders and their current status.
</p>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20">

  <div className="text-7xl">
    📦
  </div>

  <h2 className="mt-6 text-3xl font-bold text-gray-700">
    No Orders Yet
  </h2>

  <p className="mt-2 text-gray-500">
    Looks like you haven't placed an order yet.
  </p>

  <button
    onClick={() => window.location.href="/products"}
    className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold"
  >
    Continue Shopping
  </button>

</div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex justify-between flex-wrap gap-4 mb-5">
                <div>
                  <p className="font-bold">Order ID:</p>

                  <p className="text-sm text-gray-500 break-all">
                    {order._id}
                  </p>
                </div>

                <div>
                  <p className="font-bold">
                    Total Amount
                  </p>

                  <p className="text-green-600 text-xl font-bold">
                   ₹{Number(order.totalAmount).toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="font-bold">
                    Status
                  </p>

                  <span
                    className={`inline-block px-5 py-2 rounded-full text-sm font-bold shadow ${getStatusColor(
                      order.orderStatus
                    )}`}
                  >
                    {order.orderStatus}
                  </span>
                </div>
              </div>

              <hr className="mb-5" />

              {order.products.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-center gap-5 border-b py-5"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 rounded-xl object-cover shadow"
                  />

                  <div className="flex-1">
                    <h2 className="text-xl font-bold">
                      {item.name}
                    </h2>

                    <p>
                      Quantity: {item.quantity}
                    </p>

                    <p className="text-xl font-bold text-green-600 mt-2">
                      ₹{item.price}
                    </p>
                  </div>
                </div>
              ))}

              <div className="mt-6 flex justify-between items-center text-gray-500 text-sm">
                <span>
📅 {new Date(order.createdAt).toLocaleDateString()}
</span>

<span>
🕒 {new Date(order.createdAt).toLocaleTimeString()}
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