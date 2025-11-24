const express = require("express");
const { validationResult } = require("express-validator");
const Flight = require("../models/flightModel.js");
const { validateFlight } = require("../middlewares/flightValidation.js");

const router = express.Router();

// GET all flights (search, sort, pagination)
router.get("/", async (req, res) => {
  try {
    // Sync indexes
    await Flight.syncIndexes();

    // Search parameter
    let search = req.query.search || "";

    // Count total matching documents
    const count = await Flight.countDocuments({
      $or: [
        { flight: { $regex: search, $options: "i" } },
        { airline: { $regex: search, $options: "i" } },
        { source_city: { $regex: search, $options: "i" } },
        { destination_city: { $regex: search, $options: "i" } },
      ],
    });

    if (!count || count <= 0) {
      return res.json({ count: 0, page: 1, limit: 10, data: [] });
    }

    // Sorting
    const sort_by = req.query.sort_by || "_id";
    const sort_order = req.query.sort_order === "asc" ? 1 : -1;

    // Pagination
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;

    // Find matching flights
    const flights = await Flight.find(
      {
        $or: [
          { flight: { $regex: search, $options: "i" } },
          { airline: { $regex: search, $options: "i" } },
          { source_city: { $regex: search, $options: "i" } },
          { destination_city: { $regex: search, $options: "i" } },
        ],
      },
      {},
      {
        limit,
        skip: (page - 1) * limit,
        sort: { [sort_by]: sort_order },
      }
    );

    res.json({
      count,
      page,
      limit,
      data: flights,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// GET flight by flight code
router.get("/:flightCode", async (req, res) => {
  try {
    const flight = await Flight.findOne({ flight: req.params.flightCode });
    if (!flight) {
      console.log(err);
      return res.status(404).json({ error: "Flight not found" });
    }
    res.status(200).json(flight);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new flight
router.post("/", validateFlight, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const newFlight = await Flight.create(req.body);
    res.status(201).json(newFlight);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update flight by flight code
router.put("/:flightCode", validateFlight, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const updatedFlight = await Flight.findOneAndUpdate(
      { flight: req.params.flightCode },
      req.body,
      { new: true }
    );
    if (!updatedFlight) {
      return res.status(404).json({ error: "Flight not found" });
    }
    res.status(200).json(updatedFlight);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE flight by flight code
router.delete("/:flightCode", async (req, res) => {
  try {
    const deletedFlight = await Flight.findOneAndDelete({
      flight: req.params.flightCode,
    });
    if (!deletedFlight) {
      return res.status(404).json({ error: "Flight not found" });
    }
    res
      .status(200)
      .json({ message: "Flight deleted successfully", flight: deletedFlight });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
