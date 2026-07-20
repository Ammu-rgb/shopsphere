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
        📦 My Orders
      </h1>

      {orders.length === 0 ? (
        <h2 className="text-center text-2xl text-gray-500">
          No Orders Yet
        </h2>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex justify-between flex-wrap gap-4 mb-5">
                <div>
                  <p className="font-bold">Order ID:</p>

                  <p className="text-gray-600 break-all">
                    {order._id}
                  </p>
                </div>

                <div>
                  <p className="font-bold">
                    Total Amount
                  </p>

                  <p className="text-green-600 text-xl font-bold">
                    ₹{order.totalAmount}
                  </p>
                </div>

                <div>
                  <p className="font-bold">
                    Status
                  </p>

                  <span
                    className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(
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
                  className="flex items-center gap-5 border-b py-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <h2 className="text-xl font-bold">
                      {item.name}
                    </h2>

                    <p>
                      Quantity: {item.quantity}
                    </p>

                    <p className="text-green-600 font-semibold">
                      ₹{item.price}
                    </p>
                  </div>
                </div>
              ))}

              <div className="mt-5 text-right text-gray-500">
                Ordered on{" "}
                {new Date(
                  order.createdAt
                ).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;