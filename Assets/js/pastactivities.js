var editBtn = document.querySelector("#edit");
var activitiesContainer = document.querySelector(".activities-container");

function handleEdit() {
  // event.preventdefault();
  var queryString = "./logactivity.html";
  location.assign(queryString);
}

editBtn.addEventListener("click", handleEdit);

displayActivities();

function displayActivities() {
  for (var i = 0; i < localStorage.length; i++) {
    // Get Key by index
    var key = localStorage.key(i);

    if (key.indexOf("20") === 0) {
      var activities = localStorage.getItem(key);
      console.log(activities);

      // for (var i = 0; i < activities.length; i++) {
      //   var name = activities[i].name;
      //   var address = activities[i].address;
      //   var comments = activities[i].comments;
      //   var difficulty = activities[i].difficulty;
      //   console.log(name, address, comments, difficulty);
      // }
    }
  }
}
