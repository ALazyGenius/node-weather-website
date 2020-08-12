const request = require("postman-request");

const foreCast = (data, callback) => {
  const { latitude, longitude, place_name } = data;
  const url = `http://api.weatherstack.com/current?access_key=9e17d10dae86a71110c0f0a2103ffd2d&query=${latitude.toString()},${longitude.toString()}`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service.", undefined);
    } else if (response && response.body.error) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      const { current } = response.body;
      callback(undefined, {
        place_name,
        current,
        foreCast: `${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees out. It feels like ${current.feelslike} degrees out.`,
      });
    }
  });
};

module.exports = foreCast;
