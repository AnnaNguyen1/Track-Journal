var logactivityBtn = document.querySelector("#logactivityBtn");
var pastActivitiesBtn = document.querySelector("#pastactivitesBtn");

function handleLogActivityPage(event) {
  event.preventDefault();

  var queryString = "./logactivity.html";

  location.assign(queryString);
}
function handlePastactivitiesPage(event) {
  event.preventDefault();
  var queryString = "./pastactivities.html";
  location.assign(queryString);
}
logactivityBtn.addEventListener("click", handleLogActivityPage);
pastActivitiesBtn.addEventListener("click", handlePastactivitiesPage);