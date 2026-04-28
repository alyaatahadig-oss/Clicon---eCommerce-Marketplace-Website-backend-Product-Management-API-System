const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });

exports.registerUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = createToken(user._id);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password)))
    return res.status(401).json({ message: "Invalid credentials" });

  const token = createToken(user._id);
  res.status(200).json({ user, token });
};