var logActivityBtn = document.querySelector(".log-activity");
var searchAgain = document.querySelector(".home-page");
var resultsContainer = document.querySelector(".results-container");
var resultsBlock = document.querySelector(".results-block");
var searchAddress = document.querySelector(".search-address");
var addressField = document.querySelector("#address-searched");

var apiKey = "AIzaSyA5VJt7YAIL8Ftw1lC8bHtB_AnF0eyCDtw";

function getParams() {
  // Get Search params out of the URL
  var searchParamsArr = document.location.search.split("&");

  // Get the query and format values
  var lat = searchParamsArr[0].split("=").pop();
  var lng = searchParamsArr[1].split("=").pop();
  var radius = searchParamsArr[2].split("=").pop();
  radius = radius * 1000;

  console.log(lat);
  console.log(lng);
  console.log(radius);

  searchApi(lat, lng, radius);
  displayAddress(lat, lng);
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
    apiKey;

  console.log(queryUrl);

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
    apiKey;
  console.log(geocodeApiQuery);

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
  console.log(addressResult);
  var address = addressResult.results[0].formatted_address;
  console.log(address);
  addressField.innerHTML = address;
}

function renderResults(searchResults) {
  resultsContainer.textContent = "";

  for (var i = 0; i < 5; i++) {
    var nameLocation = searchResults.results[i].name;
    var addressLocation = searchResults.results[i].vicinity;
    var nameLocationUrl = nameLocation.split(" ").join("+");
    var ratingOfLocation = searchResults.results[i].rating;
    var latLocation = searchResults.results[i].geometry.location.lat;
    var lngLocation = searchResults.results[i].geometry.location.lng;
    console.log(nameLocation, addressLocation, ratingOfLocation);
    console.log(nameLocationUrl);

    var resultCard = `
    <div class="results-card" data-location="${latLocation}&${lngLocation}">
      <div class="map-result">
      <iframe width="600" height="300" style="border:0" loading="lazy" allowfullscreen src="https://www.google.com/maps/embed/v1/place?key=${apiKey} &q=${nameLocationUrl}"></iframe>
        <div class="results-details">
          <p>Name: <span id="name-result">${nameLocation}</span></p>
          <p>Address: <span id="address-result">${addressLocation}</span></p>
          <p>Google Rating: <span id="rating-result">${ratingOfLocation}</span></p>
          </div>
        </div>
      <div class="button-container">
        <button type="button" class="log-activity btn brown-border">Log Activity</button>
      </div>
    </div> `;

    console.log(resultCard);
    resultsContainer.innerHTML = resultCard;
  }
  // function handleLogActivityPage(event) {
  //   event.preventDefault();

  //   var queryString = "./logactivity.html";

  //   location.assign(queryString);
  // }

  // logActivityBtn.addEventListener("click", handleLogActivityPage);
}

function homePage(event) {
  event.preventDefault();

  var queryString = "./homepage.html";

  location.assign(queryString);
}

searchAgain.addEventListener("click", homePage);
getParams();
