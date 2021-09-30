var autocompleteDiv = document.querySelector("#userLocation");
var submitAddressSearch = document.querySelector("#searchBtn");
var quote = document.querySelector("#quote");
var quoteAuthor = document.querySelector("#author");
var radiusInputVal = document.querySelector("#userRadius").value;

var lat = "";
var lng = "";

function initAutocomplete() {
  let autocomplete = new google.maps.places.Autocomplete(autocompleteDiv, {
    types: ["address"],
    componentRestrictions: { country: "au" },
    fields: ["address_component", "geometry", "name"],
  });

  google.maps.event.addListener(autocomplete, "place_changed", function () {
    var a = autocomplete.getPlace();
    console.log(a);

    lat = a.geometry.location.lat();
    lng = a.geometry.location.lng();

    console.log(lat, lng);
  });
}

function handleAddressSearch(event) {
  event.preventDefault();

  var queryString = "./results.html?q=" + "lat=" + lat + "&lng=" + lng;

  if (radiusInputVal) {
    queryString += "&userRadius=" + radiusInputVal;
  }

  location.assign(queryString);
}

submitAddressSearch.addEventListener("click", handleAddressSearch);
