var logActivityBtn = document.querySelector(".log-activity");
var searchAgain = document.querySelector(".home-page");
var resultsContainer = document.querySelector(".results-container");
var resultsBlock = document.querySelector(".results-block");
var searchAddress = document.querySelector(".search-address");
var addressField = document.querySelector("#address-searched");

var googleApiKey = "AIzaSyA5VJt7YAIL8Ftw1lC8bHtB_AnF0eyCDtw";
var APIKey = "3e55dd6b578b0ad05e1279f3847fb34a";

var weatherUpdate = document.querySelector("#weather-result");

function getParams() {
  // Get Search params out of the URL
  var searchParamsArr = document.location.search.split("&");

  // Get the query and format values
  var lat = searchParamsArr[0].split("=").pop();
  var lng = searchParamsArr[1].split("=").pop();
  var radius = searchParamsArr[2].split("=").pop();
  radius = radius * 1000;


  searchApi(lat, lng, radius);
  displayAddress(lat, lng);
  //calling the function to display current weather
  getWeather(lat, lng);
}

function searchApi(lat, lng, radius) {
  var types = "park";
  var queryUrl =
    "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
    lat +
    "%2C" +
    lng +
    "&type=" +
    types +
    "&radius=" +
    radius +
    "&key=" +
    googleApiKey;


  fetch(queryUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(function (results) {
      renderResults(results);
    });
}

function displayAddress(lat, lng) {
  var geocodeApiQuery =
    "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
    lat +
    "," +
    lng +
    "&key=" +
    googleApiKey;

  fetch(geocodeApiQuery)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(function (results) {
      renderAddress(results);
    });
}

function renderAddress(addressResult) {
  var address = addressResult.results[0].formatted_address;
  addressField.innerHTML = address;
}

function renderResults(searchResults) {
  resultsContainer.textContent = "";

  for (var i = 0; i < 10; i++) {
    var nameLocation = searchResults.results[i].name;
    var addressLocation = searchResults.results[i].vicinity;
    var nameLocationUrl = nameLocation.split(" ").join("+");
    var ratingOfLocation = searchResults.results[i].rating;
    var latLocation = searchResults.results[i].geometry.location.lat;
    var lngLocation = searchResults.results[i].geometry.location.lng;

    var resultCard = `
    <div class="results-card brown-border" data-location="${latLocation}&${lngLocation}">
      <div class="map-result">
      <iframe width="400" height="300" style="border:0" loading="lazy" allowfullscreen src="https://www.google.com/maps/embed/v1/place?key=${googleApiKey} &q=${nameLocationUrl}"></iframe>
        <div class="results-details">
          <p>Name: <span id="name-result">${nameLocation}</span></p>
          <p>Address: <span id="address-result">${addressLocation}</span></p>
          <p>Google Rating: <span id="rating-result">${ratingOfLocation}</span></p>
          </div>
        </div>
      <div class="button-container">
        <button type="button" class="log-activity btn brown-border" data-button="${nameLocationUrl}&${latLocation}&${lngLocation}"">Log Activity</button>
      </div>
    </div> `;

    resultsContainer.innerHTML += resultCard;
  }
}

//function to get weather using openweather api and displaying it to the page
function getWeather(lat, lng) {
  var queryUrl =
    "https://api.openweathermap.org/data/2.5/onecall?" +
    "lat=" +
    lat +
    "&lon=" +
    lng +
    "&units=metric" +
    "&exclude=hourly,minutely&appid=" +
    APIKey;
  fetch(queryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      var currentWeather = document.createElement("div");
      currentWeather.setAttribute("class", "weather");

      var temp = document.createElement("p");
      temp.textContent = "Temperature: " + response.current.temp + "\u00B0C";
      currentWeather.appendChild(temp);

      var weatherIcon = document.createElement("img");
      var iconcode = response.current.weather[0].icon;
      weatherIcon.src =
        "https://openweathermap.org/img/wn/" + iconcode + ".png";
      currentWeather.appendChild(weatherIcon);

      weatherUpdate.append(currentWeather);
    });
}

function homePage(event) {
  event.preventDefault();

  var queryString = "./homepage.html";

  location.assign(queryString);
}

function handleLogActivityPage(event) {
  var dataLanLng = event.target.getAttribute("data-button");
  dataLanLngArr = dataLanLng.split("&");
  var name = dataLanLngArr[0];
  lat = dataLanLngArr[1];
  lng = dataLanLngArr[2];

  var queryStringLog =
    "./logactivity.html?q=name=" + name + "&lat=" + lat + "&lng=" + lng;
  location.assign(queryStringLog);
}

resultsContainer.addEventListener("click", handleLogActivityPage);
searchAgain.addEventListener("click", homePage);
getParams();
