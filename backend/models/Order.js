const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},

    customer: {
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },

    products: [
      {
        productId: String,
        name: String,
        image: String,
        price: Number,
        quantity: Number,
      },
    ],

    totalItems: Number,

    totalAmount: Number,

    paymentMethod: {
      type: String,
      default: "Cash on Delivery",
    },

    orderStatus: {
  type: String,
  enum: [
    "Pending",
    "Confirmed",
    "Packed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
  ],
  default: "Pending",
},

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);