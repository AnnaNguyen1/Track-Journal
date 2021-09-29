var logActivityBtn = document.querySelector('.log-activity');
var searchAgain = document.querySelector('.home-page');

function handleLogActivityPage(event) {
    event.preventDefault();

    var queryString = './logactivity.html'

    location.assign(queryString);
};

function homePage(event) {
    event.preventDefault();

    var queryString = './homepage.html'

    location.assign(queryString);
}

logActivityBtn.addEventListener('click', handleLogActivityPage);
searchAgain.addEventListener('click', homePage);
