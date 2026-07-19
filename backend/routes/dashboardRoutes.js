const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const Order = require("../models/Order");

router.get("/", async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();

    const totalOrders = await Order.countDocuments();

    const orders = await Order.find();

    const totalRevenue = orders.reduce(
      (total, order) => total + order.totalAmount,
      0
    );

    const customers = new Set(
      orders.map((order) => order.customer.phone)
    );

    const totalCustomers = customers.size;

    res.json({
      totalProducts,
      totalOrders,
      totalRevenue,
      totalCustomers,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;