var quote = document.querySelector("#quote");
var quoteAuthor = document.querySelector("#author");
var autocompleteDiv = document.querySelector("#userLocation");
var submitAddressSearch = document.querySelector("#searchBtn");
var radiusInputVal = document.querySelector("#userRadius");
var warningMessage = document.querySelector("#warning");

var lat = "";
var lng = "";

function getQuote() {
  fetch("https://type.fit/api/quotes")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var randomI = Math.floor(Math.random() * data.length);
      var displayQuote = data[randomI].text;
      var displayAuthor = data[randomI].author;
      quoteAuthor.textContent = displayAuthor;
      quote.textContent = displayQuote;
    })
    .catch(function(err){
      console.log(err);
    });
}
getQuote();

function initAutocomplete() {
  let autocomplete = new google.maps.places.Autocomplete(autocompleteDiv, {
    types: ["address"],
    componentRestrictions: { country: "au" },
    fields: ["address_component", "geometry", "name"],
  });

  google.maps.event.addListener(autocomplete, "place_changed", function () {
    var a = autocomplete.getPlace();
    lat = a.geometry.location.lat();
    lng = a.geometry.location.lng();
  });
}

function handleAddressSearch(event) {
  event.preventDefault();
  var enterAddress = document.startYourjournal.Address.value;
  var enterRadius = document.startYourjournal.Radius.value;
  var queryString =
    "./results.html?lat=" + lat + "&lng=" + lng + "&radius=" + enterRadius;

  if ((enterAddress = null || enterAddress == "")) {
    warningMessage.setAttribute("style", "display:block");
  } else if (enterRadius == null || enterRadius == "") {
    warningMessage.setAttribute("style", "display:block");
  } else {
    location.assign(queryString);
  }
}

submitAddressSearch.addEventListener("click", handleAddressSearch);
