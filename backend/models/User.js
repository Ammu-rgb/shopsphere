const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

    password: {
  type: String,
  required: true,
},

resetPasswordToken: {
  type: String,
},

resetPasswordExpire: {
  type: Date,
},

isAdmin: {
  type: Boolean,
  default: false,
},
resetPasswordToken: {
  type: String,
},

resetPasswordExpire: {
  type: Date,
},
});

const User = mongoose.model("User", userSchema);

module.exports = User;