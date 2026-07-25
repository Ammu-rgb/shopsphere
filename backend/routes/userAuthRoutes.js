const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  googleLogin,
  logoutUser,
  getUserProfile,
} = require("../controllers/userAuthController");

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

// Google Login
router.post("/google-login", googleLogin);

// Logout User
router.post("/logout", logoutUser);

// Get User Profile
router.get("/profile", getUserProfile);

module.exports = router;