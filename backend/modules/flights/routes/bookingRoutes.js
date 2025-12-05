const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}

// CREATE BOOKING
router.post("/", auth, async (req, res) => {
  try {
    const { flightId, name, phone } = req.body;

    const booking = new Booking({
      userId: req.user.userId,
      flightId: flightId,
      name,
      phone,
    });

    await booking.save();

    res.json({ message: "Booking saved", booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET MY BOOKINGS
router.get("/my", auth, async (req, res) => {
  const bookings = await Booking.find({ userId: req.user.userId }).populate(
    "flightId"
  );

  res.json(bookings);
});

module.exports = router;
