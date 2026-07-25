import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { successToast, errorToast } from "../utils/toast";
function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/orders`
      );

      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, orderStatus) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/orders/${id}`,
        {
          orderStatus,
        }
      );

      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };
const deleteOrder = async (id) => {
  const result = await Swal.fire({
    title: "Delete this order?",

    html: `
      <div style="font-size:15px;color:${
        document.documentElement.classList.contains("dark")
          ? "#9CA3AF"
          : "#6B7280"
      }">
        This action is permanent.
        <br><br>
        Once deleted, this order cannot be recovered.
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

    confirmButtonText: "Delete",

    cancelButtonText: "Keep Order",

    confirmButtonColor: "#DC2626",

    cancelButtonColor: "#2563EB",

    reverseButtons: true,

    focusCancel: true,

    width: "440px",
  });

  if (!result.isConfirmed) return;

  try {
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/orders/${id}`
    );

    successToast(
      "Order Deleted",
      "The selected order has been deleted successfully."
    );

    fetchOrders();
  } catch (error) {
    errorToast(
      "Delete Failed",
      error.response?.data?.message || "Something went wrong."
    );
  }
};


 

  return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-all duration-300 px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        📦 Customer Orders
      </h1>

      {orders.length === 0 ? (
        <h2 className="text-center text-2xl text-gray-500 dark:text-gray-400">
          No Orders Found
        </h2>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-6 transition-all"
            >
             <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-5">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {order.customer.name}
                  </h2>

                  <p className="text-gray-700 dark:text-gray-300">
  {order.customer.phone}
</p>

<p className="text-gray-700 dark:text-gray-300">
  {order.customer.address},{" "}
  {order.customer.city},{" "}
  {order.customer.state}
</p>

<p className="text-gray-700 dark:text-gray-300">
  Pincode : {order.customer.pincode}
</p>
                </div>

                <div className="md:text-right">
                  <h2 className="text-2xl font-bold text-green-600">
                    ₹
                    {order.totalAmount.toLocaleString()}
                  </h2>

                  <p>
                    Items : {order.totalItems}
                  </p>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {new Date(
                      order.createdAt
                    ).toLocaleString()}
                  </p>
                </div>
              </div>

              <hr />

              <div className="mt-5">
                <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white">
                  Ordered Products
                </h3>

                {order.products.map((product) => (
                  <div
                    key={product.productId}
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-300 dark:border-gray-700 py-3 gap-3"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 rounded object-cover"
                      />

                      <div>
  <h4 className="font-semibold text-gray-900 dark:text-white">
    {product.name}
  </h4>

  <p className="text-gray-600 dark:text-gray-300">
    Qty : {product.quantity}
  </p>
</div>
                    </div>

                    <h4 className="font-bold text-green-600">
                      ₹
                      {(
                        product.price *
                        product.quantity
                      ).toLocaleString()}
                    </h4>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center mt-6">
                <select
                  value={order.orderStatus}
                  onChange={(e) =>
                    updateStatus(
                      order._id,
                      e.target.value
                    )
                  }
                 className="w-full sm:w-48 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white p-2 rounded-lg"
                >
                  <option>Pending</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                </select>

                <button
                  onClick={() =>
                    deleteOrder(order._id)
                  }
                 className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition"
                >
                  Delete Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Orders;