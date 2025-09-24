const fs = require("fs");

async function readFlightsFile() {
  try {
    const file = fs.readFileSync("./flight.json", "utf-8");
    return JSON.parse(file);
  } catch (error) {
    throw new Error("Couldn't read file spotify.json");
  }
}

async function writeIntoFlightsFile(updatedFlightsArray) {
  try {
    const data = JSON.stringify(updatedFlightsArray);
    fs.writeFileSync("./flight.json", data, "utf-8");
  } catch (error) {
    throw new Error("Couldn't write into file products.json");
  }
}

module.exports = {
  readFlightsFile,
  writeIntoFlightsFile,
};
