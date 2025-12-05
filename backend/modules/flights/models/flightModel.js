const mongoose = require("mongoose");

const FlightSchema = new mongoose.Schema(
  {
    airline: { type: String, required: true },
    flight: { type: String, required: true },
    source_city: { type: String, required: true },
    departure_time: { type: String, required: true },
    stops: { type: Number, required: true },
    arrival_time: { type: String, required: true },
    destination_city: { type: String, required: true },
    class: { type: String, required: true },
    duration: { type: Number, required: true },
    days_left: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Flight", FlightSchema);
