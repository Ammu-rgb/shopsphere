const Wishlist = require("../models/Wishlist");

// ================= ADD TO WISHLIST =================

const addToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const alreadyExists = await Wishlist.findOne({
      user: userId,
      product: productId,
    });

    if (alreadyExists) {
      return res.status(400).json({
        message: "Product already in wishlist",
      });
    }

    const item = await Wishlist.create({
      user: userId,
      product: productId,
    });

    res.status(201).json({
      message: "Product Added to Wishlist ❤️",
      item,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= GET USER WISHLIST =================

const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    const wishlist = await Wishlist.find({
      user: userId,
    }).populate("product");

    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= REMOVE FROM WISHLIST =================

const removeFromWishlist = async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Removed Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
};