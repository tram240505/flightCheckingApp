const express = require("express");
const { validationResult } = require("express-validator");
const {
  getAllFlights,
  getFlightByCode,
  addNewFlight,
  updateFlight,
  deleteFlight,
} = require("../models/flightModel.js");
const { validateFlight } = require("../middlewares/flightValidation.js");

const router = express.Router();

// GET all flights
router.get("/", (req, res) => {
  getAllFlights()
    .then((flights) => res.status(200).json(flights))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// GET by flight code
router.get("/:flightCode", (req, res) => {
  getFlightByCode(req.params.flightCode)
    .then((flight) => {
      if (!flight) return res.status(404).json({ error: "Flight not found" });
      res.status(200).json(flight);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// POST new flight
router.post("/", validateFlight, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  addNewFlight(req.body)
    .then((newFlight) => res.status(201).json(newFlight))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// PUT update flight
router.put("/:flightCode", validateFlight, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  updateFlight(req.params.flightCode, req.body)
    .then((updatedFlight) => {
      if (!updatedFlight)
        return res.status(404).json({ error: "Flight not found" });
      res.status(200).json(updatedFlight);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// DELETE flight
router.delete("/:flightCode", (req, res) => {
  deleteFlight(req.params.flightCode)
    .then((deleted) => {
      if (!deleted) return res.status(404).json({ error: "Flight not found" });
      res.status(200).json(deleted);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;
