require("dotenv").config();
const express = require("express");
const cors = require("cors");

const flightRoutes = require("./modules/flights/routes/flightRoutes.js");
const connectDB = require("./shared/middlewares/connect-db.js");
const authRoutes = require("./modules/flights/routes/authRoutes.js");
const bookingRoutes = require("./modules/flights/routes/bookingRoutes.js");

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add the connectDB middleware in application-level, before defining routes.
connectDB();
// Mount routes
app.use("/flights", flightRoutes);
app.use("/auth", authRoutes);
app.use("/bookings", bookingRoutes);

app.get("/", (req, res) => {
  res.send("Flight Checking API is running");
});

// Middleware to handle route not found error.
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
