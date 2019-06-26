// Helper functions
async function getCarparkList(x, y) {

  async function getCarparkStaticInfo() {
    return await axios.get("https://data.gov.sg/api/action/datastore_search", {
      params: {
        resource_id: "139a3035-e624-4f56-b63f-89ae28d4ae4c",
        limit: 2074
      }
    }).then(response => {
      var carparks = response.data.result.records
      return carparks
    })
  }

  async function getCarparkAvailability() {
    return await axios.get("https://api.data.gov.sg/v1/transport/carpark-availability", {}).then(response => {
      var carparkAvailability = response.data.items[0].carpark_data
      return carparkAvailability
    })
  }

  var carparkStaticInfo = await getCarparkStaticInfo()
  var carparkAvailability = await getCarparkAvailability()

  var carparks = combineCarparkData(carparkAvailability, carparkStaticInfo)

  // Calculate distance of every carpark to x and y
  var carparksWithDistance = addDistanceToCarparks(carparks, x, y)

  // Get the nearest ten carparks
  var nearestCarparks = getNearestTenCarparks(carparksWithDistance)
  return nearestCarparks
}

function combineCarparkData(carparkAvailability, carparks) {

  function findMatchingCarpark(carparkNumber, carparks) {
    matchedCarpark = null
    for (var carpark of carparks) {
      if (carpark.car_park_no === carparkNumber) {
        matchedCarpark = carpark
        break
      }
    }
    return matchedCarpark
  }

  for (var carpark of carparkAvailability) {
    var carparkNumber = carpark.carpark_number
    matched_carpark = findMatchingCarpark(carparkNumber, carparks)
    if (matched_carpark !== null) {
      matched_carpark.total_lots = carpark.carpark_info[0].total_lots
      matched_carpark.lots_available = carpark.carpark_info[0].lots_available
    }
  }
  return carparks
}

function addDistanceToCarparks(carparks, x, y) {

  function distanceFromXY(carpark, x, y) {
    var x2 = Math.pow((parseFloat(carpark.x_coord) - x), 2)
    var y2 = Math.pow((parseFloat(carpark.y_coord) - y), 2)
    return Math.sqrt(x2 + y2)
  }

  var carparksWithDistance = []

  // Calculate distance from every carpark to the location
  for (var carpark of carparks) {
    if (carpark.lots_available !== undefined) {
      var distance = distanceFromXY(carpark, x, y)
      carpark.distance = distance
      carparksWithDistance.push(carpark)
    }
  }

  return carparksWithDistance
}

function getNearestTenCarparks(carparks) {

  function sortCarparksByDistance(carparks) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    // See the compareNumbers function
    function compareCarparksByDistance(carpark1, carpark2) {
      return carpark1.distance - carpark2.distance
    }

    carparks.sort(compareCarparksByDistance)
    return carparks
  }

  var sortedCarparks = sortCarparksByDistance(carparks)
  return sortedCarparks.slice(0, 10)
}

function getNearestCarparkTo(x, y) {
  return getCarparkList(x, y).then(carparks => {
    let carpark = carparks[0]
    return carpark
  })
}


try {
  var axios = require("axios")
  module.exports = getNearestCarparkTo
} catch(error) {
  console.log("")
}
