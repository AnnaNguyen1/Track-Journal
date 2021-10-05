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
var errorMessage = document.querySelector("#error");
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

  var activityId = Date.now();
  var savedDate = activityDate.value;
  var savedName = trackName.value;
  var savedAddress = trackAddress.value;
  var savedTime = userTime.value;
  var savedDifficulty = trackDifficulty.value;
  var savedPace = userPace.value;
  var savedComments = userComments.value;

  if (!savedDate || !savedName || !savedAddress) {
    errorMessage.style.display = "block";
    return;
  } else {
    var userInfo = {
      id: activityId,
      name: savedName,
      address: savedAddress,
      date: savedDate,
      time: savedTime,
      difficulty: savedDifficulty,
      pace: savedPace,
      comments: savedComments,
    };
    var userHistory = localStorage.getItem("userHistory");
    if (userHistory === null) {
      userHistory = [];
    } else {
      userHistory = JSON.parse(userHistory);
    }
    var foundItem = false;
    var editId = document.location.search.split("=").pop();
    for (var i = 0; i < userHistory.length; i++) {
      if (userHistory[i].id == editId) {
        userHistory[i] = userInfo;
        foundItem = true;
        break;
      }
    }
    if (!foundItem) userHistory.push(userInfo);
    var addInfo = JSON.stringify(userHistory);

    localStorage.setItem("userHistory", addInfo);

    var queryString = "./pastactivities.html";
    location.assign(queryString);
  }
});

function getParams() {
  if (document.location.search.indexOf("=") === -1) {
    return;
  } else if (document.location.search.indexOf("name") === -1) {
    var searchParamsId = document.location.search.split("=");
    var searchId = searchParamsId[1].split("=").pop();
    displayActivity(searchId);
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

function displayActivity(searchId) {
  var getHistory = localStorage.getItem("userHistory");
  getHistory = JSON.parse(getHistory);
  for (var i = 0; i < getHistory.length; i++) {
    if (getHistory[i].id == searchId) {
      trackName.value = getHistory[i].name;
      trackAddress.value = getHistory[i].address;
      activityDate.value = getHistory[i].date;
      userTime.value = getHistory[i].time;
      userPace.value = getHistory[i].pace;
      trackDifficulty.value = getHistory[i].difficulty;
      userComments.value = getHistory[i].comments;
    }
  }
}

getParams();
