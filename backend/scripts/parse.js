const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");

const inputFile = path.join(__dirname, "../data/flight.csv");
const outputFile = path.join(__dirname, "../data/flight.json");

const results = [];

fs.createReadStream(inputFile)
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", () => {
    fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
    console.log(`Convert Successfully!! ${outputFile}`);
  })
  .on("error", (err) => {
    console.error("Can not read file CSV:", err.message);
  });
