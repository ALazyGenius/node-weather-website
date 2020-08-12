const request = require("postman-request");

const geoCode = (address, callback) => {
  const url = `http://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibWlzaHJha2FzaDk0IiwiYSI6ImNrZG9hOGtxeTBpbTcycXRhdTczbDI4M2QifQ.zfvs2AYkykcRIiSo28wImg&limit=1`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to geolocation service.", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find location. Try again.", undefined);
    } else {
      const { center, place_name } = response.body.features[0];
      const [longitude, latitude] = center;
      callback(undefined, { latitude, longitude, place_name });
    }
  });
};

module.exports = geoCode;
