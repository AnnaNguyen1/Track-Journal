var saveBtn = document.querySelector("#saveBtn");
var resetBtn = document.querySelector("#resetBtn");
//query selectors for user input
var activityDate = document.querySelector("#activity-date");
var trackName = document.querySelector("#name");
var trackAddress = document.querySelector("#address");
var userTime = document.querySelector("#time-taken");
var userPace = document.querySelector("#pace-select");
var trackDifficulty = document.querySelector("#difficulty-select");
var userComments = document.querySelector("#comment");
var formName = document.querySelector(".form-name");
var googleApiKey = "AIzaSyA5VJt7YAIL8Ftw1lC8bHtB_AnF0eyCDtw";

resetBtn.addEventListener("click", function () {
  activityDate.textContent = "";
  trackName.textContent = "";
  trackAddress.textContent = "";
  userTime.textContent = "";
  userComments.textContent = "";
});

saveBtn.addEventListener("click", function (event) {
  event.preventDefault();
  var savedDate = activityDate.value;
  console.log(savedDate);

  if (!savedDate || !trackName.value || !trackAddress.value) {
    var errorMessage = document.createElement("p");
    errorMessage.textContent =
      "Activity name, address and date needs to be entered";
    formName.appendChild(errorMessage);
    return;
  } else {
    var savedName = trackName.value;
    var savedAddress = trackAddress.value;
    var savedTime = userTime.value;
    var savedDifficulty = trackDifficulty.value;
    var savedPace = userPace.value;
    var savedComments = userComments.value;

    var userInfo = {
      name: savedName,
      address: savedAddress,
      time: savedTime,
      difficulty: savedDifficulty,
      pace: savedPace,
      comments: savedComments,
    };
    console.log(userInfo);
    localStorage.setItem(savedDate, JSON.stringify(userInfo));

    var queryString = "./pastactivities.html";
    location.assign(queryString);
  }
});

function getParams() {
  if (document.location.search.indexOf("=") === -1) {
    return;
  } else {
    // Get Search params out of the URL
    var searchParamsArr = document.location.search.split("&");

    // Get the query and format values
    var name = searchParamsArr[0].split("=").pop();
    var lat = searchParamsArr[1].split("=").pop();
    var lng = searchParamsArr[2].split("=").pop();
    name = name.split("+").join(" ");

    displayAddress(lat, lng);
    displayName(name);
  }
}

function displayAddress(lat, lng) {
  var geocodeApiQuery =
    "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
    lat +
    "," +
    lng +
    "&key=" +
    googleApiKey;
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
  var address = addressResult.results[0].formatted_address;
  trackAddress.value = address;
}

function displayName(parkName) {
  trackName.value = parkName;
}

getParams();
