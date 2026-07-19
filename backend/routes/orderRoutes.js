const express = require("express");
const router = express.Router();

const Order = require("../models/Order");
const Product = require("../models/Product");
console.log("✅ orderRoutes loaded");

// ================= PLACE ORDER =================

router.post("/", async (req, res) => {
  try {
    // Check stock of every product
    for (const item of req.body.products) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          message: `${item.name} not found`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Only ${product.stock} ${product.name} left in stock`,
        });
      }
    }

    // Deduct stock
    for (const item of req.body.products) {
      await Product.findByIdAndUpdate(
        item.productId,
        {
          $inc: {
            stock: -item.quantity,
          },
        }
      );
    }

    // Save order
    const order = new Order(req.body);

    await order.save();

    res.status(201).json({
      message: "Order Placed Successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
// ================= GET USER ORDERS =================

router.get("/user/:userId", async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.params.userId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ================= GET ALL ORDERS =================

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});



// ================= UPDATE ORDER STATUS =================

router.put("/:id", async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true }
    );

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ================= DELETE ORDER =================

// ================= DELETE ORDER =================

router.delete("/:id", async (req, res) => {
  console.log("🗑 DELETE HIT:", req.params.id);

  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);

    if (!deletedOrder) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      message: "Order Deleted Successfully",
      deletedOrder,
    });
  } catch (error) {
    console.log("DELETE ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// ================= GET SINGLE ORDER =================

router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});router.get("/test-delete", (req, res) => {
  res.json({
    success: true,
    message: "TEST ROUTE WORKING",
  });
});

module.exports = router;