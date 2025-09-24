const express = require("express");
const utils = require("./utils.js");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Flight Price API is running");
});

// GET all flights with pagination
app.get("/flights", (req, res) => {
  const { page = 1, limit = 50 } = req.query;

  utils
    .readFlightsFile()
    .then((flights) => {
      if (!flights || flights.length === 0) return res.send([]);
      const start = (page - 1) * limit;
      const end = start + parseInt(limit);
      res.send(flights.slice(start, end));
    })
    .catch((err) => res.send({ error: err.message }));
});

// GET flight by flight code
app.get("/flights/:flightCode", (req, res) => {
  const flightCode = req.params.flightCode;

  utils
    .readFlightsFile()
    .then((flights) => {
      const flight = flights.find((f) => f.flight == flightCode);
      if (!flight) {
        return res.send({ error: "Flight not found" });
      }
      res.send(flight);
    })
    .catch((err) => res.send({ error: err.message }));
});

// POST add new flight
app.post("/flights", (req, res) => {
  const newFlight = {
    flight: "F101",
    airline: "Delta Airlines",
    source_city: "New York",
    destination_city: "Los Angeles",
    departure_time: "Morning",
    arrival_time: "Afternoon",
    class: "Economy",
    duration: "6h 15m",
    days_left: "5",
    price: 350,
  };

  utils
    .readFlightsFile()
    .then((flights) => {
      if (!Array.isArray(flights)) {
        flights = [];
      }
      newFlight.id = flights.length + 1;
      flights.push(newFlight);
      return utils.writeIntoFlightsFile(flights).then(() => newFlight);
    })
    .then((addedFlight) => res.send(addedFlight))
    .catch((err) => res.send({ error: err.message }));
});

// PUT update flight
app.put("/flights/:flightCode", (req, res) => {
  const flightCode = req.params.flightCode;
  const updatedFlight = {
    flight: flightCode,
    airline: "Updated Airline",
    source_city: "Updated Source",
    destination_city: "Updated Destination",
    departure_time: "Morning",
    arrival_time: "Evening",
    class: "Business",
    duration: "5h 30m",
    days_left: "3",
    price: 450,
    id: flightCode,
  };

  utils
    .readFlightsFile()
    .then((flights) => {
      const index = flights.findIndex((f) => f.flight === flightCode);
      if (index === -1) {
        return res.status(404).send({ error: "Flight not found" });
      }
      flights[index] = updatedFlight;
      return utils.writeIntoFlightsFile(flights).then(() => updatedFlight);
    })
    .then((flight) => res.send(flight))
    .catch((err) => res.send({ error: err.message }));
});

// DELETE flight
app.delete("/flights/:flightCode", (req, res) => {
  const flightCode = req.params.flightCode;

  utils
    .readFlightsFile()
    .then((flights) => {
      const index = flights.findIndex((f) => f.flight === flightCode);
      if (index === -1) {
        return res.send({ error: "Flight not found" });
      }
      const deletedFlight = flights.splice(index, 1)[0];
      return utils.writeIntoFlightsFile(flights).then(() => deletedFlight);
    })
    .then((deleted) => res.send(deleted))
    .catch((err) => res.send({ error: err.message }));
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
