const { body } = require("express-validator");

exports.validateFlight = [
  body("airline").notEmpty().withMessage("Airline is required"),
  body("flight").notEmpty().withMessage("Flight code is required"),
  body("source_city").notEmpty().withMessage("Source city is required"),
  body("departure_time").notEmpty().withMessage("Departure time is required"),
  body("stops")
    .notEmpty()
    .withMessage("Stops is required")
    .withMessage("Stops must be a number"),
  body("arrival_time").notEmpty().withMessage("Arrival time is required"),
  body("destination_city")
    .notEmpty()
    .withMessage("Destination city is required"),
  body("class").notEmpty().withMessage("Class is required"),
  body("duration").notEmpty().withMessage("Duration is required"),
  body("days_left")
    .notEmpty()
    .withMessage("Days left is required")
    .isNumeric()
    .withMessage("Days left must be a number"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number"),
];
