// var activitiesContainer = document.querySelector(".activities-container");
var displayDiv = document.querySelector(".displayDiv");
var editButton = document.querySelector("#edit");
var displayMessage = document.querySelector("#message");

function renderHistory() {
  var getHistory = localStorage.getItem("userHistory");
  getHistory = JSON.parse(getHistory);
  if (getHistory == null || getHistory == "") {
    displayMessage.style.display = "block";
  } else if (getHistory !== null) {
    for (var i = 0; i < getHistory.length; i++) {
      //create divs to dipslay content
      var activitiesContainer = document.createElement("div");
      activitiesContainer.setAttribute("class", "activities-container");
      displayDiv.appendChild(activitiesContainer);

      var resultsDiv = document.createElement("div");
      resultsDiv.setAttribute("class", "activity-result");
      activitiesContainer.appendChild(resultsDiv);

      //info to be displayed in resultsDiv
      var displayDate = document.createElement("p");
      displayDate.textContent = "Date: " + getHistory[i].date;
      resultsDiv.appendChild(displayDate);

      var displayName = document.createElement("p");
      displayName.textContent = "Name: " + getHistory[i].name;
      resultsDiv.appendChild(displayName);

      var displayAddress = document.createElement("p");
      displayAddress.textContent = "Address: " + getHistory[i].address;
      resultsDiv.appendChild(displayAddress);

      if (getHistory[i].pace != "") {
        var displayPace = document.createElement("p");
        displayPace.textContent = "Pace: " + getHistory[i].pace;
        resultsDiv.appendChild(displayPace);
      }

      if (getHistory[i].difficulty != "") {
        var displayDiff = document.createElement("p");
        displayDiff.textContent = "Difficulty: " + getHistory[i].difficulty;
        resultsDiv.appendChild(displayDiff);
      }

      if (getHistory[i].comments != "") {
        var displayComments = document.createElement("p");
        displayComments.textContent = "Comments: " + getHistory[i].comments;
        resultsDiv.appendChild(displayComments);
      }

      //edit button created for give user the ability make changes
      var editBtn = document.createElement("button");
      editBtn.setAttribute("id", "edit");
      editBtn.setAttribute("data-edit", getHistory[i].id);
      editBtn.textContent = "Edit";
      resultsDiv.appendChild(editBtn);

      var deleteBtn = document.createElement("button");
      deleteBtn.setAttribute("id", "delete");
      deleteBtn.setAttribute("data-delete", getHistory[i].id);
      deleteBtn.textContent = "Delete";
      resultsDiv.appendChild(deleteBtn);

      deleteBtn.addEventListener("click", function (event) {
        var logData = this.getAttribute("data-delete");
        if (logData !== -1) {
          var savedHistory = getHistory.filter(function (el) {
            return el.id != logData;
          });
          localStorage.setItem("userHistory", JSON.stringify(savedHistory));
          document.location.reload("./pastactivies.html");
        }
      });

      editBtn.addEventListener("click", function (event) {
        var dateData = event.target.getAttribute("data-edit");
        var queryString = "./logactivity.html?id=" + dateData;
        location.assign(queryString);
      });
    }
  }
}

renderHistory();
