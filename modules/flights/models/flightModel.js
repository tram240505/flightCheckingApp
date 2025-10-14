const {
  readFlightsFile,
  writeIntoFlightsFile,
} = require("../../../utils/utils.js");
// GET all flights
function getAllFlights() {
  return readFlightsFile();
}

// GET by flight code
function getFlightByCode(flightCode) {
  return readFlightsFile().then((flights) => {
    return flights.find((f) => f.flight == flightCode);
  });
}

// ADD new flight
function addNewFlight(newFlight) {
  return readFlightsFile().then((flights) => {
    if (!Array.isArray(flights)) flights = [];
    newFlight.id = flights.length + 1;
    flights.push(newFlight);
    return writeIntoFlightsFile(flights).then(() => newFlight);
  });
}

// UPDATE flight
function updateFlight(flightCode, updatedData) {
  return readFlightsFile().then((flights) => {
    const index = flights.findIndex((f) => f.flight == flightCode);
    if (index == -1) return null;
    flights[index] = { ...flights[index], ...updatedData };
    return writeIntoFlightsFile(flights).then(() => flights[index]);
  });
}

// DELETE flight
function deleteFlight(flightCode) {
  return readFlightsFile().then((flights) => {
    const index = flights.findIndex((f) => f.flight == flightCode);
    if (index == -1) return null;
    const deleted = flights.splice(index, 1)[0];
    return writeIntoFlightsFile(flights).then(() => deleted);
  });
}

module.exports = {
  getAllFlights,
  getFlightByCode,
  addNewFlight,
  updateFlight,
  deleteFlight,
};
