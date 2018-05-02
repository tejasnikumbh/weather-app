const request = require('request');

// ======================= Interface functions==================================

var getWeatherData = (weatherUri, callback) => {
  request(weatherUri, function (error, response, body) {
    if(error || response.statusCode !== 200) {
      var message = `There was an error.`;
      callback(new Error(message), undefined);
      return;
    }
    try { // success case
      var bodyObject = JSON.parse(body);
      callback(null, bodyObject);
    } catch(e) {
      var message = `Some error in parsing weather data received.`;
      callback(new Error(message), undefined);
    }
  });
};

// ======================= Module Interface ====================================
module.exports = {
  getWeatherData,
}
