const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/flight.json");
async function readFlightsFile() {
  try {
    const file = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(file);
  } catch (error) {
    throw new Error("Couldn't read file flight.json");
  }
}

async function writeIntoFlightsFile(updatedFlightsArray) {
  try {
    const data = JSON.stringify(updatedFlightsArray);
    fs.writeFileSync(filePath, data, "utf-8");
  } catch (error) {
    throw new Error("Couldn't write into file flight.json");
  }
}

module.exports = {
  readFlightsFile,
  writeIntoFlightsFile,
};
