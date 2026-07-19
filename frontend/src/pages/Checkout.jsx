import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { useRef } from "react";
import { successToast, errorToast } from "../utils/toast";

function Checkout({ cart, setCart }) {
  const [couponCode, setCouponCode] = useState("");
const [discount, setDiscount] = useState(0);
const [appliedCoupon, setAppliedCoupon] = useState(null);
  const navigate = useNavigate();
  const debounceRef = useRef(null);
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    city: "",
    state: "",
    pincode: "",
    address: "",
  });
  const [addressOptions, setAddressOptions] = useState([]);
const [loadingAddress, setLoadingAddress] = useState(false);

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryCharge = subtotal >= 1000 ? 0 : 50;

  const grandTotal = subtotal + deliveryCharge;

 const handleChange = (e) => {
  const { name, value } = e.target;

  setAddress((prev) => ({
    ...prev,
    [name]: value,
  }));
};

  const searchAddress = async (input) => {
  if (input.length < 3) {
    setAddressOptions([]);
    return;
  }

  try {
    setLoadingAddress(true);

    const res = await axios.get(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
        input
      )}&filter=countrycode:in&limit=5&apiKey=361abeb5cc83402f91988c42ce5893d6`
    );

    const options = res.data.features.map((item) => ({
      label: item.properties.formatted,
      value: item.properties,
    }));

    setAddressOptions(options);
  } catch (error) {
    console.log(error);
  } finally {
    setLoadingAddress(false);
  }
};


  
  const placeOrder = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
  if (
    !address.name ||
    !address.phone ||
    !address.city ||
    !address.state ||
    !address.pincode ||
    !address.address
  ) {
    errorToast(
  "Missing Information",
  "Please fill all the required fields."
);
    return;
  }

  try {
    // Razorpay Order Create
    const { data } = await axios.post(
      "http://localhost:5000/api/payment/create-order",
      {
        amount: grandTotal,
      }
    );

    const options = {
      key: "rzp_test_TDNtS5zFqT1kIy",

      amount: data.amount,

      currency: data.currency,

      name: "ShopSphere",

      description: "Order Payment",

      order_id: data.id,

      handler: async function (response) {
        const verify = await axios.post(
  "http://localhost:5000/api/payment/verify-payment",
  {
    razorpay_order_id: response.razorpay_order_id,
    razorpay_payment_id: response.razorpay_payment_id,
    razorpay_signature: response.razorpay_signature,
  }
);

if (!verify.data.success) {
  errorToast(
  "Payment Failed",
  "Payment verification failed."
);
  return;
}
 const user = JSON.parse(localStorage.getItem("user"));

const orderData = {
  user: user.id,

  customer: address,

  products: cart.map((item) => ({
    productId: item._id,
    name: item.name,
    image: item.image,
    price: item.price,
    quantity: item.quantity,
  })),

  totalItems,

  totalAmount: grandTotal,

  paymentId: response.razorpay_payment_id,
};

        await axios.post(
          "http://localhost:5000/api/orders",
          orderData
        );

        successToast(
  "Payment Successful 🎉",
  "Your order has been placed."
);

        setCart([]);

navigate("/order-success");
      },

      prefill: {
        name: address.name,

        contact: address.phone,
      },

      theme: {
        color: "#2563eb",
      },
    };

    const razor = new window.Razorpay(options);

    razor.open();
  } catch (error) {
    console.log(error);

    errorToast(
  "Payment Failed",
  "Please try again."
);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-10">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Shipping Address */}
        <div className="bg-white rounded-xl shadow-lg p-5 md:p-6">
          <h2 className="text-2xl font-bold mb-5">
            Shipping Address
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={address.name}
              onChange={handleChange}
              className="border w-full p-3 rounded-lg text-sm sm:text-base"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={address.phone}
              onChange={handleChange}
              className="border w-full p-3 rounded-lg text-sm sm:text-base"
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={address.city}
              onChange={handleChange}
            className="border w-full p-3 rounded-lg text-sm sm:text-base"
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              value={address.state}
              onChange={handleChange}
              className="border w-full p-3 rounded-lg text-sm sm:text-base"
            />

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={address.pincode}
              onChange={handleChange}
              className="border w-full p-3 rounded-lg text-sm sm:text-base"
            />

          <div>
  <label className="block mb-2 font-semibold">
    Search Address
  </label>

<Select
  options={addressOptions}
  isLoading={loadingAddress}
  placeholder="Search your address..."
  isClearable
  noOptionsMessage={() => "Type at least 3 letters"}

  onInputChange={(value, meta) => {
    if (meta.action === "input-change") {
      clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(() => {
        searchAddress(value);
      }, 500);
    }

    return value;
  }}

  onChange={(selected) => {
    if (!selected) return;

    const item = selected.value;

    setAddress((prev) => ({
      ...prev,
      address: item.formatted || "",
      city: item.city || "",
      state: item.state || "",
      pincode: item.postcode || "",
    }));
  }}
/>

</div>

            <button
              onClick={placeOrder}
             className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-base sm:text-lg font-semibold transition"
            >
              Place Order
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow-lg p-5 md:p-6">
          <h2 className="text-2xl font-bold mb-5">
            Order Summary
          </h2>

          {cart.length === 0 ? (
            <p className="text-gray-500">
              No items in cart.
            </p>
          ) : (
            <>
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b py-3 gap-2"
                >
                  <div>
                    <h3 className="font-semibold">
                      {item.name}
                    </h3>

                    <p className="text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-bold">
                    ₹
                    {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}

              <div className="mt-6 space-y-3">
                <div className="flex justify-between text-sm sm:text-base">
                  <span>Total Items</span>
                  <span>{totalItems}</span>
                </div>

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span>
                    {deliveryCharge === 0
                      ? "FREE"
                      : `₹${deliveryCharge}`}
                  </span>
                </div>

                <hr />

                <div className="flex justify-between text-xl sm:text-2xl font-bold text-green-600">
                  <span>Grand Total</span>
                  <span>₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;