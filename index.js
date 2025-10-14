const express = require("express");
const flightRoutes = require("./modules/flights/routes/flightRoutes.js");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount routes
app.use("/flights", flightRoutes);

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
