const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
// ================= REGISTER USER =================

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User Registered Successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= LOGIN USER =================

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("userToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= GOOGLE LOGIN =================

const googleLogin = async (req, res) => {
  try {
    const { name, email, picture } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      const randomPassword = crypto
        .randomBytes(20)
        .toString("hex");

      const hashedPassword = await bcrypt.hash(
        randomPassword,
        10
      );

      user = await User.create({
        name,
        email,
        password: hashedPassword,
        picture,
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Google Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// ================= LOGOUT USER =================

const logoutUser = async (req, res) => {
  res.clearCookie("userToken");

  res.status(200).json({
    message: "Logout Successful",
  });
};

// ================= USER PROFILE =================

const getUserProfile = async (req, res) => {
  try {
    const token = req.cookies.userToken;

    if (!token) {
      return res.status(401).json({
        message: "Please Login",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.id).select(
      "-password"
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({
      message: "Invalid Token",
    });
  }
};
  const forgotPassword = async (req, res) => {
    console.log("STEP 1");
  try {
    console.log("STEP 2");
    const { email } = req.body;

    const user = await User.findOne({ email });
    console.log("STEP 3");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    console.log("STEP 4");
    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpire =
      Date.now() + 15 * 60 * 1000;

    await user.save();
    console.log("STEP 5");
    const resetUrl =
      `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const message = `
      <h2>ShopSphere Password Reset</h2>

      <p>Click the button below to reset your password.</p>

      <a
        href="${resetUrl}"
        style="
          background:#2563eb;
          color:white;
          padding:12px 20px;
          border-radius:8px;
          text-decoration:none;
        "
      >
        Reset Password
      </a>

      <p>This link expires in 15 minutes.</p>
    `;

    await sendEmail({
      email: user.email,
      subject: "Reset Your Password",
      message,
    });
    console.log("STEP 6");
    res.status(200).json({
      message: "Reset link sent to your email",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  googleLogin,
  logoutUser,
  getUserProfile,
  forgotPassword,
};