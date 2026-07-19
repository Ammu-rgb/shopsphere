const express = require("express");
const router = express.Router();

const Review = require("../models/Review");

// ================= ADD REVIEW =================

router.post("/", async (req, res) => {
  try {
    const review = new Review(req.body);

    await review.save();

    res.status(201).json({
      message: "Review Added Successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ================= GET REVIEWS OF A PRODUCT =================

router.get("/:productId", async (req, res) => {
  try {
    const reviews = await Review.find({
      productId: req.params.productId,
    }).sort({
      createdAt: -1,
    });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;