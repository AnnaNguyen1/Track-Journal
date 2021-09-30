var logActivityBtn = document.querySelector(".log-activity");
var searchAgain = document.querySelector(".home-page");

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

  searchApi(lat, lng, radius);
}

function searchApi(lat, lng, radius) {}

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
