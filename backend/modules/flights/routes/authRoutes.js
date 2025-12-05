const express = require("express");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Create user with default role = user
    const newUser = new User({
      email,
      role: "user",
    });

    await newUser.setPassword(password);

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const isMatch = await user.validatePassword(password);
  if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  user.otpCode = otp;
  user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
  await user.save();

  console.log("OTP:", otp);

  res.json({ message: "OTP sent to email" });
});

router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });
  if (!user || !user.otpCode)
    return res.status(400).json({ error: "OTP not found" });

  if (user.otpCode !== otp)
    return res.status(400).json({ error: "Invalid OTP" });

  if (user.otpExpiresAt < new Date())
    return res.status(400).json({ error: "OTP expired" });

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  user.otpCode = undefined;
  user.otpExpiresAt = undefined;
  await user.save();

  res.json({ token, role: user.role });
});

module.exports = router;
