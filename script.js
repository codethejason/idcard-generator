var users = [
  {name: "John Georgian", role: "hacker", id: 1},
  {name: "Jake Georgian", role: "hacker", id: 2},
  {name: "Jacobian Georgian", role: "hacker", id: 3},
  {name: "Jacob Georgian", role: "hacker", id: 4},
  {name: "Jason Georgian", role: "hacker", id: 5},
  {name: "George Georgian", role: "hacker", id: 6},
  {name: "Justin Georgian", role: "hacker", id: 7}
];

window.onload = function() {
  //JsBarcode("#hacker1barcode", "1234567890123", {format: "itf14", width: 1.4, height: 40, fontSize: 16});

  function generateCards(users) {
    var pagesContainer = document.querySelector('.pages');
    var frontTemplate = document.querySelector('#cardfrontTemplate');
    var backTemplate = document.querySelector('#cardbackTemplate');
    var cardsPerPage = 6;
    var userCounter = 0;
    var lastpage = Math.ceil(users.length/cardsPerPage)*2-1;
    for(var i = 0; i < lastpage+1; i++) { //loop through pages, each user takes two pages
      var currentPage = document.createElement("DIV"); //new page
      pagesContainer.appendChild(currentPage);
      currentPage.className = "page";
      var pageNum = i;
      if(i == lastpage-1 && users.length%cardsPerPage != 0) { //if it's the last page and it's not full (last page as in last set)
        cardsPerPage = users.length%cardsPerPage; //remaining users
        console.log(cardsPerPage);
      } else {
        console.log(i);
        console.log(lastpage);
      }
      if(pageNum%2 == 0) { //if it's an odd page number (index starts at 0)
        for(var j = 0; j < cardsPerPage; j++) {
          var newEl = frontTemplate.content.cloneNode(true);
          var participantName = newEl.querySelector(".participant");
          var role = newEl.querySelector(".role");
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
          barcode.id = users[userCounter].role + users[userCounter].id;
          //barcodeID.id = userCounter;
          currentPage.appendChild(newEl);
          var head, tail;
          switch(users[userCounter].role) {
            case "hacker": head = "10"; break;
            case "organizer": head = "20"; break;
            case "sponsor": head = "30"; break;
            case "mentor": head = "40"; break;
            case "volunteer": head = "50"; break;
            case "special": head = "60"; break;
            default: head = "70";
          }
          switch(users[userCounter].id.toString().length) { //check number of digits of ID
            case 1: tail = "000".concat(users[userCounter].id.toString()); break;
            case 2: tail = "00".concat(users[userCounter].id.toString()); break;
            case 3: tail = "0".concat(users[userCounter].id.toString()); break;
            default: tail = users[userCounter].id.toString();
          } 
          
          JsBarcode("#"+barcode.id, head.concat(tail), {format: "CODE128", width: 2.2, height: 40, fontSize: 16});
          userCounter++;
        }
      }
    }
  }
  
  generateCards(users);
}

function converttoReadable() {
  
}

function converttoJSON() {
  
}

//loads data into the users array
function loadJSON() {
  
}

function addRow() {
  var rowTemplate = document.querySelector('#rowTemplate');
  var newEl = rowTemplate.content.cloneNode(true);
  var tbody = document.querySelector('#infoTable tbody');
  tbody.appendChild(newEl);
}