const express = require("express");
const { validationResult } = require("express-validator");
const Flight = require("../models/flightModel.js");
const { validateFlight } = require("../middlewares/flightValidation.js");

const router = express.Router();

// GET cities for autocomplete
router.get("/cities", async (req, res) => {
  try {
    const term = req.query.term || "";
    if (!term) return res.json([]);

    const cities = await Flight.distinct("source_city", {
      source_city: { $regex: term, $options: "i" },
    });
    const destCities = await Flight.distinct("destination_city", {
      destination_city: { $regex: term, $options: "i" },
    });

    const result = Array.from(new Set([...cities, ...destCities]));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// GET all flights (search, sort, pagination)
router.get("/", async (req, res) => {
  try {
    await Flight.syncIndexes();

    const { source_city, destination_city, sort_by, sort_order, limit, page } =
      req.query;
    const query = {};

    if (source_city) query.source_city = { $regex: source_city, $options: "i" };
    if (destination_city)
      query.destination_city = { $regex: destination_city, $options: "i" };

    const total = await Flight.countDocuments(query);

    if (!total) return res.json({ count: 0, page: 1, limit: 10, data: [] });

    const flights = await Flight.find(
      query,
      {},
      {
        limit: parseInt(limit) || 10,
        skip: ((parseInt(page) || 1) - 1) * (parseInt(limit) || 10),
        sort: { [sort_by || "_id"]: sort_order === "asc" ? 1 : -1 },
      }
    );

    res.json({
      count: total,
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      data: flights,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// GET single flight by ID (Optional)
router.get("/:id", async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) return res.status(404).json({ error: "Flight not found" });
    res.status(200).json(flight);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
