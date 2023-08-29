const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config/config");
const generateToken = require("../helper/generateToken");
const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name && !email && !password && !phone) {
    res.status(403);
    throw new Error("All fields are required");
  }
  if (!name && !email && !password && !phone) {
    res.status(403);
    throw new Error("Name fields are required");
  }
  if (!email && !password && !phone) {
    res.status(403);
    throw new Error("Email fields are required");
  }
  if (!password && !phone) {
    res.status(403);
    throw new Error("Password fields are required");
  }
  if (!phone) {
    res.status(403);
    throw new Error("Phone fields are required");
  }

  const user = new User();
  user.name = name;
  user.phone = phone;
  user.password = password;
  user.email = email;
  await user.save();
  res.status(200).json({
    status: true,
    data: await User.findById(user._id).select("-password"),
  });
});
const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(403);
    throw new Error("Email and password are required");
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  if (user.password !== password) {
    res.status(404);
    throw new Error("Invalid credentials");
  }
  res.status(200).json({
    status: true,
    message: "Login Successful",
    access_token: generateToken(user._id),
    user: user,
  });
});
module.exports = {
  registerUser,
  loginUser,
};
