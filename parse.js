const fs = require("fs");
const csv = require("csv-parser");

const inputFile = "./flight.csv";
const outputFile = "./flight.json";

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
