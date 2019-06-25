function addCarparkToPage(address, totalLots, availableLots) {
  document.getElementById("carparkInfo").innerText = availableLots + " / " + totalLots + " lots available at " + address
}

function changeIconBasedOnCarParkType(carparkType) {
  document.getElementById("logo").src = ''
}


var locationInput = document.getElementById("locationInput")

locationInput.addEventListener("keydown", insertLocation)

async function insertLocation(event) {
  if (event.key === "Enter") {
    var searchLocation = locationInput.value
    var url = "https://developers.onemap.sg/commonapi/search?searchVal=" + searchLocation + "&returnGeom=Y&getAddrDetails=N"
    var response = await axios.get(url)
    var nearestLocation = response.data.results[0]
    var carpark = await getNearestCarparkTo(nearestLocation.X, nearestLocation.Y)
    addCarparkToPage(carpark.address, carpark.total_lots, carpark.lots_available)
  }
}