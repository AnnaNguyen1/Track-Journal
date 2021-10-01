var saveBtn = document.querySelector('#saveBtn');
var resetBtn = document.querySelector('#resetBtn');
//query selectors for user input
var activityDate = document.querySelector('#activity-date');
var trackName = document.querySelector('#name');
var trackAddress = document.querySelector('#address');
var userTime = document.querySelector('#time-taken');
var userPace = document.querySelector('#pace-select');
var trackDifficulty = document.querySelector('#difficulty-select');
var userComments = document.querySelector('#comment');

resetBtn.addEventListener('click', function() {
    activityDate.textContent = ""; 
    trackName.textContent = "";
    trackAddress.textContent = "";
    userTime.textContent = "";
    userComments.textContent = "";
});

saveBtn.addEventListener('click', function() {

    var savedDate = activityDate.value;
    console.log(savedDate);

    if (savedDate === null) {
        console.log("No Date Entered");
        return 
    } 
    else { 
        var savedName = trackName.value;
        var savedAddress = trackAddress.value;
        var savedTime = userTime.value;
        var savedDifficulty = trackDifficulty.value
        var savedPace = userPace.value;
        var savedComments = userComments.value;
    
        var userInfo = {
            name: savedName,
            address: savedAddress,
            time: savedTime,
            difficulty: savedDifficulty,
            pace: savedPace,
            comments: savedComments,
        }
        console.log(userInfo);
        localStorage.setItem(savedDate, JSON.stringify(userInfo));
    }
});
