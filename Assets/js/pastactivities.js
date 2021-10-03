var editBtn = document.querySelector("#edit");

function handleEdit() {
  // event.preventdefault();
  var queryString = "./logactivity.html";
  location.assign(queryString);
}

editBtn.addEventListener("click", handleEdit);
