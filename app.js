const yargs = require('yargs');
const geocode = require('./geocode');
const weather = require('./weather');
const axios = require('axios');

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
var address = encodeURIComponent(argv.address);
var mapsUri = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${geocodeApiKey}`;

axios.get(mapsUri).then((response)=>{ // sucess callback
  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weatherApiKey = `0ff457f6665d64036d9db5395639e718`;
  var weatherUri = `https://api.darksky.net/forecast/${weatherApiKey}/${lat},${lng}`;
  console.log(`Fetching weather data for address - Lat: ${lat}, Lng: ${lng}...`);
  return axios.get(weatherUri);
}).then((response) => {
  var temp = response.data.currently.temperature;
  var apparentTemp = response.data.currently.apparentTemperature;
  console.log(`It is current ${temp} degrees farhenheit, and it feels like ${apparentTemp}`);
  console.log(`Finished executing app.`);
}).catch((error) => { // failure callback
  if(error.code === 'ENOTFOUND'){
    console.log(`Unable to connect to server.`);
  } else {
    console.log(`There was an error.`);
  };
});

// geocode.geocodeAddress(mapsUri, (error, result) => {
//   if(error) {
//     console.log(error.message);
//     return;
//   }
//
//   var lat = result.geometry.location.lat;
//   var lng = result.geometry.location.lng;
//
//   console.log(`Address co-ordinates- Lat: ${lat}, Lng: ${lng}`);
//   console.log(`Fetching weather data for address...`);
//
//   weather.getWeatherData(lat, lng, (error, result) => {
//     if(error) {
//       console.log(error.message);
//       return;
//     }
//     var temp = result.currently.temperature;
//     var apparentTemp = result.currently.apparentTemperature;
//     var output = `It is current ${temp} degrees farhenheit, and it feels like ${apparentTemp}.`;
//     console.log(output);
//   });
// });
//
