import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/orders"
      );

      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, orderStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${id}`,
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
    const confirmDelete = window.confirm(
      "Delete this order?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/orders/${id}`
      );

      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        📦 Customer Orders
      </h1>

      {orders.length === 0 ? (
        <h2 className="text-center text-2xl text-gray-500">
          No Orders Found
        </h2>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-lg p-6"
            >
             <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-5">
                <div>
                  <h2 className="text-2xl font-bold">
                    {order.customer.name}
                  </h2>

                  <p>{order.customer.phone}</p>

                  <p>
                    {order.customer.address},{" "}
                    {order.customer.city},{" "}
                    {order.customer.state}
                  </p>

                  <p>Pincode : {order.customer.pincode}</p>
                </div>

                <div className="md:text-right">
                  <h2 className="text-2xl font-bold text-green-600">
                    ₹
                    {order.totalAmount.toLocaleString()}
                  </h2>

                  <p>
                    Items : {order.totalItems}
                  </p>

                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(
                      order.createdAt
                    ).toLocaleString()}
                  </p>
                </div>
              </div>

              <hr />

              <div className="mt-5">
                <h3 className="font-bold text-xl mb-3">
                  Ordered Products
                </h3>

                {order.products.map((product) => (
                  <div
                    key={product.productId}
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b py-3 gap-3"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 rounded object-cover"
                      />

                      <div>
                        <h4 className="font-semibold">
                          {product.name}
                        </h4>

                        <p>
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
                  className="w-full sm:w-48 border p-2 rounded-lg"
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