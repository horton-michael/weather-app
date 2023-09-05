// Weather Dashboard

// DEPENDENCIES =======================================================
var cityInput = $("#city-input");
var cityForm = $("#city-form");
// DATA ===============================================================
var city = "Denver";
var apiKey = "791b83e9b2800aa5dfea0d02e03f6cb9";

// FUNCTIONS ==========================================================
// call geocoding API to get lat/lon for city
function getCoordinates(city) {
  geocodeUrl =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&limit=1&appid=" +
    apiKey;
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
      getForecast(lat, lon);
    })
    .catch(function (error) {
      console.log(error);
    });
}
// call 5-day forecast weather API to get weather for lat/lon
function getForecast(lat, lon) {
  var forecastUrl =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    apiKey;
  fetch(forecastUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
function setForecast() {
  getCoordinates(city);
}
// USER INTERACTIONS ==================================================

// INITIALIZATION =====================================================
setForecast();
