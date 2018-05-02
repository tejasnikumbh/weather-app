const request = require('request');

// =============== Module Interface Functions ==================================
var geocodeAddress = (mapsUri, callback) => {
    var address = encodeURIComponent(address);

    request(mapsUri, function(error, response, body) {
      if(error || response.statusCode !== 200) {
        var message = `There was an error.`;
        callback(new Error(message), undefined);
        return;
      }

      var bodyObject = JSON.parse(body);
      if(bodyObject.results.length === 0) {
        var message = `Address not found`;
        callback(new Error(message), undefined);
        return;
      }
      // In case of success
      callback(null, bodyObject.results[0]);
    });
}

// =============== Module exports ==============================================
module.exports = {
  geocodeAddress,
}
