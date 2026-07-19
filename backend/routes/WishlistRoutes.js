const express = require("express");
const router = express.Router();

const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require("../controllers/WishlistController");

// Add to Wishlist
router.post("/", addToWishlist);

// Get Wishlist of User
router.get("/:userId", getWishlist);

// Remove Wishlist Item
router.delete("/:id", removeFromWishlist);

module.exports = router;