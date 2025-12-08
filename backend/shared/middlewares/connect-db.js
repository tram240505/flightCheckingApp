const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URL, {
      dbName: "FlightCheckingApp",
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("DB connection failed", err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
