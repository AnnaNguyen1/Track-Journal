var logActivityBtn = document.querySelector(".log-activity");
var searchAgain = document.querySelector(".home-page");
var APIKey = "3e55dd6b578b0ad05e1279f3847fb34a";
var weatherUpdate = document.querySelector("#weather-result");
function getParams() {
  // Get Search params out of the URL
  var searchParamsArr = document.location.search.split("&");

  // Get the query and format values
  var lat = searchParamsArr[0].split("=").pop();
  var lng = searchParamsArr[1].split("=").pop();
  var radius = searchParamsArr[2].split("=").pop();

  console.log(lat);
  console.log(lng);
  console.log(radius);
  //calling the function to display current weather
  getWeather(lat, lng);
  //searchApi(lat, lng, radius);
}

//function searchApi(lat, lng, radius) {}

// function handleLogActivityPage(event) {
//     event.preventDefault();

//     var queryString = './logactivity.html'

//     location.assign(queryString);
// };
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
      console.log(response);
      var currentWeather = document.createElement("div");
      currentWeather.setAttribute("class", "weather");

      var currentDate = document.createElement("h3");
      var date = moment().format("DD/MM/YYYY");
      currentDate.textContent = "Date: " + date;
      currentWeather.appendChild(currentDate);

      var weatherIcon = document.createElement("img");
      var iconcode = response.current.weather[0].icon;
      weatherIcon.src =
        "https://openweathermap.org/img/wn/" + iconcode + ".png";
      currentWeather.appendChild(weatherIcon);

      var temp = document.createElement("p");
      temp.textContent = "Temperature: " + response.current.temp + "\u00B0C";
      currentWeather.appendChild(temp);

      var humidity = document.createElement("p");
      humidity.textContent = "Humidity: " + response.current.humidity + "%";
      currentWeather.appendChild(humidity);

      var uvIndex = document.createElement("p");
      uvIndex.textContent = "UV Index: " + response.current.uvi;
      currentWeather.appendChild(uvIndex);

      var windspeed = document.createElement("p");
      windspeed.textContent =
        "Wind-Speed: " + response.current.wind_speed + " m/sec";
      currentWeather.appendChild(windspeed);

      weatherUpdate.append(currentWeather);
      // console.log(date);
      // console.log(temp);
      // console.log(humidity);
      // console.log(uvIndex);
      // console.log(windspeed);
      // console.log(iconurl);
    });
}

function homePage(event) {
  event.preventDefault();

  var queryString = "./homepage.html";

  location.assign(queryString);
}

// logActivityBtn.addEventListener('click', handleLogActivityPage);
searchAgain.addEventListener("click", homePage);
getParams();
