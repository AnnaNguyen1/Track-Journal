var editBtn = document.querySelector("#edit");

function handleEdit(event) {
  event.preventdefault();
  var queryString = "./logactivity.html";
  location.assign(queryString);
}

editBtn.addEventListener("click", handleEdit);