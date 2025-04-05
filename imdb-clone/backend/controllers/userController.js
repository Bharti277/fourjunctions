const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../Models/User");
const dotenv = require("dotenv");

dotenv.config();

const authenticateToken = (id) => {
  console.log(process.env.JWT_SECRET, "sdsdsdsdprocess.env.JWT_SECRET");
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

exports.register = async (req, res) => {
  console.log(req.body, "body");
  try {
    const new_user = await User.create(req.body);
    console.log(new_user, "new_user");
    const token = authenticateToken(new_user._id);
    res.status(201).json({
      id: new_user._id,
      email: new_user.email,
      token: token,
      message: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "User already exists" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const token = authenticateToken(user._id);
  res.status(200).json({
    id: user._id,
    email: user.email,
    token: token,
    message: "Login successful",
  });
};
