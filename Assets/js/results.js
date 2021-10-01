var logActivityBtn = document.querySelector(".log-activity");
var searchAgain = document.querySelector(".home-page");
var resultsContainer = document.querySelector(".results-container");

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
}

function searchApi(lat, lng, radius) {
  var apiKey = "AIzaSyA5VJt7YAIL8Ftw1lC8bHtB_AnF0eyCDtw";
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

function renderResults(searchResults) {
  for (i = 0; i < 5; i++) {
    var nameLocation = searchResults.results[i].name;
    var addressLocation = searchResults.results[i].vicinity;
    var ratingOfLocation = searchResults.results[i].rating;
    console.log(nameLocation, addressLocation, ratingOfLocation);

    var resultCard = `
    <div class="results-card">
      <div class="map-result">
        <img src="https://potionwebstudio.com/wp-content/uploads/2018/10/google-map3-1080x630.jpg" alt="map" width="400" height="300">
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
    resultsContainer.style.display = "block";
    resultsContainer.innerHTML = resultCard;
  }
}

// function handleLogActivityPage(event) {
//     event.preventDefault();

//     var queryString = './logactivity.html'

//     location.assign(queryString);
// };

function homePage(event) {
  event.preventDefault();

  var queryString = "./homepage.html";

  location.assign(queryString);
}

// logActivityBtn.addEventListener('click', handleLogActivityPage);
searchAgain.addEventListener("click", homePage);
getParams();
