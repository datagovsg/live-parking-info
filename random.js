function grabLocation(event) {
  if (event.key === 'Enter') {
    var location = locationInput.value;
    axios
      .get('https://developers.onemap.sg/commonapi/search', {
        params: {
          searchVal: location,
          returnGeom: 'Y',
          getAddrDetails: 'N',
        },
      })
      .then((response) => {
        var coordinates = response.data.results[0];
        getNearestCarparkTo(coordinates.X, coordinates.Y).then((carpark) => {
          addCarparkToPage(carpark.address, carpark.total_lots, carpark.lots_available);
        });
      });
  }
}
