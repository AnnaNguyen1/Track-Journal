// var activitiesContainer = document.querySelector(".activities-container");
var displayDiv = document.querySelector('.displayDiv');

function renderHistory () {
  var getHistory = localStorage.getItem('userHistory');
  getHistory = JSON.parse(getHistory);

  if (getHistory !== null) {
    for (var i = 0; i < getHistory.length; i++) {
      
      //create divs to dipslay content
      var activitiesContainer = document.createElement('div');
      activitiesContainer.setAttribute('class', 'activities-container');
      displayDiv.appendChild(activitiesContainer);

      var resultsDiv = document.createElement('div');
      resultsDiv.setAttribute('class', 'activity-result');
      activitiesContainer.appendChild(resultsDiv);

      //info to be displayed in resultsDiv
      var displayDate = document.createElement('p');
      displayDate.textContent = 'Date: ' + getHistory[i].date;
      resultsDiv.appendChild(displayDate);

      var displayName = document.createElement('p');
      displayName.textContent = 'Name: ' + getHistory[i].name;
      resultsDiv.appendChild(displayName);

      var displayAddress = document.createElement('p');
      displayAddress.textContent = 'Address: ' + getHistory[i].address;
      resultsDiv.appendChild(displayAddress);

      var displayPace = document.createElement('p');
      displayPace.textContent = 'Pace: ' + getHistory[i].pace;
      resultsDiv.appendChild(displayPace);

      var displayDiff = document.createElement('p');
      displayDiff.textContent = 'Difficulty: ' + getHistory[i].difficulty;
      resultsDiv.appendChild(displayDiff);

      var displayComments = document.createElement('p');
      displayComments.textContent = 'Comments: ' + getHistory[i].comments;
      resultsDiv.appendChild(displayComments);

      //edit button created for give user the ability make changes
      var editBtn = document.createElement('button');
      editBtn.setAttribute('id', 'edit');
      editBtn.textContent = 'Edit';
      resultsDiv.appendChild(editBtn);

      editBtn.addEventListener('click', function () {
        var queryString = "./logactivity.html";
        location.assign(queryString);
      });

    }
  }
}
renderHistory();
