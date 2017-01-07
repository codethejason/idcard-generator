var users = [
  {name: "John Georgian", role: "hacker", id: 1},
  {name: "Jake Georgian", role: "hacker", id: 2},
  {name: "Jacobian Georgian", role: "hacker", id: 3},
  {name: "Jacob Georgian", role: "hacker", id: 4},
  {name: "Jason Georgian", role: "hacker", id: 5},
  {name: "George Georgian", role: "hacker", id: 6}
];

window.onload = function() {
  //JsBarcode("#hacker1barcode", "1234567890123", {format: "itf14", width: 1.4, height: 40, fontSize: 16});

  function generateCards(users) {
    var pagesContainer = document.querySelector('.pages');
    var frontTemplate = document.querySelector('#cardfrontTemplate');
    var backTemplate = document.querySelector('#cardbackTemplate');
    var cardsPerPage = 6;
    var userCounter = 0;
    for(var i = 0; i < Math.floor(users.length/cardsPerPage)*2; i++) { //loop through pages, each user takes two pages
      var currentPage = document.createElement("DIV"); //new page
      pagesContainer.appendChild(currentPage);
      currentPage.className = "page";
      var pageNum = i;
      if(pageNum%2 == 0) { //if it's an odd page number (index starts at 0)
        for(var j = 0; j < cardsPerPage; j++) {
          var newEl = frontTemplate.content.cloneNode(true);
          var participantName = newEl.querySelector(".participant");
          var role = newEl.querySelector(".role");
          console.log(j);
          participantName.textContent = users[userCounter].name;
          role.textContent = users[userCounter].role.toUpperCase();
          currentPage.appendChild(newEl);
          userCounter++;
        }
      } else {
        userCounter -= cardsPerPage; //go back and do the back of the cards
        for(var j = 0; j < cardsPerPage; j++) {
          var newEl = backTemplate.content.cloneNode(true);
          var barcode = newEl.querySelector("svg");
          barcode.id = "hacker1";
          //barcodeID.id = userCounter;
          currentPage.appendChild(newEl);
          JsBarcode("#hacker1", "1000000000001", {format: "itf14", width: 1.4, height: 40, fontSize: 16});
          userCounter++;
        }
      }
    }
  }
  
  generateCards(users);
}
