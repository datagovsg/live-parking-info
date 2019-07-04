const express = require("express");
const app = express();
const port = 3000;
const axios = require("axios");
const cors = require("cors");
const parse = require("csv-parse/lib/sync");
const fs = require("fs");

// file reading and parsing done synchronously to prevent race condition
var hdbCarparkInfoCSV = fs.readFileSync("hdb-carpark-information.csv", "utf8");
const carparkStaticInfo = parse(hdbCarparkInfoCSV, {
  columns: true,
  skip_empty_lines: true
});

console.log(
  `Carpark static info imported with ${carparkStaticInfo.length} carparks!`
);

app.use(cors());

app.listen(port, async () => {
  console.log(`Parking API app listening on port ${port}!`);

  async function updateCarparkAvailability() {
    console.log("Updating carpark availability on server");
    const carparkAvailability = await axios
      .get("https://api.data.gov.sg/v1/transport/carpark-availability", {})
      .then(response => {
        const carparkAvailability = response.data.items[0].carpark_data;
        return carparkAvailability;
      });
    const carparks = combineCarparkData(carparkAvailability, carparkStaticInfo);
    app.locals.carparks = carparks;
    setTimeout(updateCarparkAvailability, 1000 * 60);
  }
  updateCarparkAvailability();
});

function combineCarparkData(carparkAvailability, carparks) {
  function findMatchingCarpark(carparkNumber, carparks) {
    matchedCarpark = null;
    for (const carpark of carparks) {
      if (carpark.car_park_no === carparkNumber) {
        matchedCarpark = carpark;
        break;
      }
    }
    return matchedCarpark;
  }

  for (const carpark of carparkAvailability) {
    const carparkNumber = carpark.carpark_number;
    matched_carpark = findMatchingCarpark(carparkNumber, carparks);
    if (matched_carpark !== null) {
      matched_carpark.total_lots = carpark.carpark_info[0].total_lots;
      matched_carpark.lots_available = carpark.carpark_info[0].lots_available;
    }
  }
  return carparks;
}

async function getCarparkList(x, y) {
  function addDistanceToCarparks(carparks, x, y) {
    function distanceFromXY(carpark, x, y) {
      const x2 = Math.pow(parseFloat(carpark.x_coord) - x, 2);
      const y2 = Math.pow(parseFloat(carpark.y_coord) - y, 2);
      return Math.sqrt(x2 + y2);
    }

    const carparksWithDistance = [];

    // Calculate distance from every carpark to the location
    for (const carpark of carparks) {
      if (carpark.lots_available !== undefined) {
        const distance = distanceFromXY(carpark, x, y);
        carpark.distance = distance;
        carparksWithDistance.push(carpark);
      }
    }

    return carparksWithDistance;
  }

  function sortCarparksByDistance(carparks) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    // See the compareNumbers function
    function compareCarparksByDistance(carpark1, carpark2) {
      return carpark1.distance - carpark2.distance;
    }

    carparks.sort(compareCarparksByDistance);
    return carparks;
  }

  // Calculate distance of every carpark to x and y
  const carparksWithDistance = addDistanceToCarparks(app.locals.carparks, x, y);

  // Get the nearest n carparks
  const sortedCarparks = sortCarparksByDistance(carparksWithDistance);
  return sortedCarparks;
}

app.get("/", async (req, res) => {
  console.log(`Request with following parameters ${JSON.stringify(req.query)}`);
  axios
    .get("https://developers.onemap.sg/commonapi/search", {
      params: {
        getAddrDetails: "N",
        returnGeom: "Y",
        searchVal: req.query.q
      }
    })
    .then(response => {
      return response.data.results[0];
    })
    .then(location => {
      return getCarparkList(location.X, location.Y);
    })
    .then(carparks => {
      return res.send(
        req.query.limit && req.query.limit > 1
          ? carparks.slice(0, req.query.limit)
          : carparks[0]
      );
    })
    .catch(error => {
      console.error(error);
      res.status(500).send(error);
    });
});
