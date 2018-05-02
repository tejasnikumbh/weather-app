const yargs = require('yargs');
const geocode = require('./geocode');
const weather = require('./weather');

// Setting up yargs for a simple option without commands
const argv = yargs
.option('address', {
  alias:'a',
  describe: 'Address for weather information',
  demand:true
})
.help()
.argv;
console.log(`Starting app...`);

// Api specific parameters
var geocodeApiKey = "AIzaSyBWn4W5T48i6BqnjHNyuTxw4TkC-O6P7Ww"
geocode.geocodeAddress(argv.address, geocodeApiKey, (error, result) => {
  if(error) {
    console.log(error.message);
    return;
  }

  var lat = result.geometry.location.lat;
  var lng = result.geometry.location.lng;

  console.log(`Address co-ordinates- Lat: ${lat}, Lng: ${lng}`);
  console.log(`Fetching weather data for address...`);

  weather.getWeatherData(lat, lng, (error, result) => {
    if(error) {
      console.log(error.message);
      return;
    }
    var temp = result.currently.temperature;
    var apparentTemp = result.currently.apparentTemperature;
    var output = `It is current ${temp} degrees farhenheit, and it feels like ${apparentTemp}.`;
    console.log(output);
  });
});



console.log(`Finished executing app.`);
