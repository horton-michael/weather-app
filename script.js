// Weather Dashboard

// DEPENDENCIES =======================================================

// DATA ===============================================================
var city = "Denver";

var apiKey = "791b83e9b2800aa5dfea0d02e03f6cb9";
geocodeUrl =
  "https://api.openweathermap.org/geo/1.0/direct?q=" +
  city +
  "&limit=1&appid=" +
  apiKey;

// FUNCTIONS ==========================================================
// call geocoding API to get lat/lon for city
fetch(geocodeUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    var lat = data[0].lat;
    var lon = data[0].lon;
    console.log(lat);
    console.log(lon);
  });


// USER INTERACTIONS ==================================================

// INITIALIZATION =====================================================
