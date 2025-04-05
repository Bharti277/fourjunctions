const mongoose = require("mongoose");

// Model for Login
const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: false, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
