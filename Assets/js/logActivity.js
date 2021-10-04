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
  var savedName = trackName.value;
  var savedAddress = trackAddress.value;
  var savedTime = userTime.value;
  var savedDifficulty = trackDifficulty.value;
  var savedPace = userPace.value;
  var savedComments = userComments.value;

  if (!savedDate || !trackName.value || !trackAddress.value) {
    var errorMessage = document.createElement("p");
    errorMessage.textContent =
      "Activity name, address and date needs to be entered";
    formName.appendChild(errorMessage);
    return;
  } else {

    var userInfo = {
      name: savedName,
      address: savedAddress,
      date: savedDate,
      time: savedTime,
      difficulty: savedDifficulty,
      pace: savedPace,
      comments: savedComments,
    };
    console.log(userInfo);
    var userHistory = localStorage.getItem('userHistory');
    if (userHistory === null) {
      userHistory = [];
    } else {
      userHistory = JSON.parse(userHistory);
    }
    userHistory.push(userInfo);
    var addInfo = JSON.stringify(userHistory);
    localStorage.setItem('userHistory', addInfo);
    // localStorage.setItem(savedDate, JSON.stringify(userInfo));
    
    
    var queryString = "./pastactivities.html";
    location.assign(queryString);
    
  }
});
