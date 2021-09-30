var quote = document.querySelector('#quote');
var quoteAuthor = document.querySelector('#author');


function getQuote() {
    fetch("https://type.fit/api/quotes")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
    var randomI = Math.floor(Math.random() * data.length);
    console.log(randomI);
    var displayQuote = data[randomI].text;
    var displayAuthor = data[randomI].author;
    quoteAuthor.textContent = displayAuthor;
    quote.textContent = displayQuote;
  });
} 
getQuote()
