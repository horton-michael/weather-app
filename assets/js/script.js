// Weather Dashboard

// DEPENDENCIES =======================================================
var cityInput = $("#city-input");
var cityForm = $("#city-form");
var cityNameEl = $("#city-name");
var currentDateEl = $("#current-date");
var weatherIconEl = $("#weather-icon");
var currentTemperatureEl = $("#temperature");
var currentHumidityEl = $("#humidity");
var currentWindSpeedEl = $("#wind-speed");
var forecastContainerEl = $("#forecast-container");
var currentWeatherCard = $("#current-weather-card");
var recentCitiesEl = $("#city-list");
// DATA ===============================================================
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
      getCurrentWeather(lat, lon);
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
    "&units=imperial" +
    "&appid=" +
    apiKey;
  fetch(forecastUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      forecastContainerEl.empty();

      var currentDate = data.list[0].dt_txt.split(" ")[0];

      for (var i = 0; i < data.list.length; i++) {
        var dayData = data.list[i];
        var date = dayData.dt_txt.split(" ")[0];

        if (date !== currentDate) {
          var card = createForecastCard(dayData);
          forecastContainerEl.append(card);

          currentDate = date;
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
function getCurrentWeather(lat, lon) {
  var currentWeatherUrl =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial" +
    "&appid=" +
    apiKey;

  fetch(currentWeatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      var cityName = data.name;
      var currentDate = new Date();
      var formattedDate =
        currentDate.getMonth() +
        1 +
        "/" +
        currentDate.getDate() +
        "/" +
        currentDate.getFullYear();
      var weatherIcon = data.weather[0].icon;
      var temperature = data.main.temp;
      var humidity = data.main.humidity;
      var windSpeed = data.wind.speed;

      cityNameEl.text(cityName + " (" + formattedDate + ")");
      //   currentDateEl.text(currentDate);
      weatherIconEl.attr(
        "src",
        "http://openweathermap.org/img/w/" + weatherIcon + ".png"
      );
      currentTemperatureEl.text("Temperature: " + temperature + "°F");
      currentHumidityEl.text("Humidity: " + humidity + "%");
      currentWindSpeedEl.text("Wind Speed: " + windSpeed + " MPH");

      saveCity(cityName);
    })
    .catch(function (error) {
      console.log(error);
    });
}
function createForecastCard(dayData) {
  console.log(dayData);
  // create
  var card = $("<div>").addClass("card m-3 w-50");
  var cardBody = $("<div>").addClass("card-body");
  var date = $("<h5>").addClass("card-title");
  var icon = $("<img>").addClass("card-img-top");
  var temp = $("<p>").addClass("card-text");
  var wind = $("<p>").addClass("card-text");
  var humidity = $("<p>").addClass("card-text");

  // build
  date.text(dayData.dt_txt);
  icon
    .attr(
      "src",
      "http://openweathermap.org/img/w/" + dayData.weather[0].icon + ".png"
    )
    .attr("alt", dayData.weather[0].description);
  temp.text("Temp: " + dayData.main.temp + "°F");
  wind.text("Wind: " + dayData.wind.speed + " MPH");
  humidity.text("Humidity: " + dayData.main.humidity + "%");

  // place
  cardBody.append(date, icon, temp, wind, humidity);
  card.append(cardBody);
  return card;
}

function setForecast(event) {
  event.preventDefault();
  currentWeatherCard.show();
  var city = cityInput.val().trim();
  getCoordinates(city);
}

// get and set local storage
function saveCity(city) {
  var cities = JSON.parse(localStorage.getItem("cities"));
  if (!cities) {
    cities = [];
  }
  cities.push(city);
  localStorage.setItem("cities", JSON.stringify(cities));
}
function getCity() {
  var cities = JSON.parse(localStorage.getItem("cities"));
  if (!cities) {
    cities = [];
  }
  recentCitiesEl.empty();

  for (var i = 0; i < cities.length; i++) {
    var city = cities[i];
    addCityBtn(city);
  }
}
function addCityBtn(city) {
  var cityBtn = $("<button>")
    .addClass("w-100 my-1 btn btn-secondary btn-block")
    .text(city);

  cityBtn.on("click", function () {
    var selectedCity = cityBtn.text();
    cityInput.val(selectedCity);
    setForecast(event);
  });

  recentCitiesEl.append(cityBtn);
}
// USER INTERACTIONS ==================================================

// INITIALIZATION =====================================================
currentWeatherCard.hide();
getCity();
cityForm.on("submit", setForecast);
