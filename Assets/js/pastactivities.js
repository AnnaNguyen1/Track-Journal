var editBtn = document.querySelector("#edit");
var activitiesContainer = document.querySelector(".activities-container");

function handleEdit() {
  // event.preventdefault();
  var queryString = "./logactivity.html";
  location.assign(queryString);
}

editBtn.addEventListener("click", handleEdit);
