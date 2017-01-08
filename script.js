var users = [];

let sampleData = [
  {name: "John Georgian", role: "hacker", id: 1},
  {name: "Jake Georgian", role: "hacker", id: 2},
  {name: "Jacobian Georgian", role: "hacker", id: 3},
  {name: "Jacob Georgian", role: "hacker", id: 4},
  {name: "Jason Georgian", role: "hacker", id: 5},
  {name: "George Georgian", role: "hacker", id: 6},
  {name: "Justin Georgian", role: "hacker", id: 7}
];


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
    }
    if(pageNum%2 == 0) { //if it's an odd page number (index starts at 0)
      for(var j = 0; j < cardsPerPage; j++) {
        var newEl = frontTemplate.content.cloneNode(true);
        var participantName = newEl.querySelector(".participant");
        var role = newEl.querySelector(".role");
        participantName.textContent = users[userCounter].name;
        role.textContent = users[userCounter].role.toUpperCase();
        var bgcolor;
        switch(users[userCounter].role) {
          case "hacker": bgcolor = "#000000"; break;
          case "organizer": bgcolor = "#fb3200"; break;
          case "sponsor": 
          case "speaker": bgcolor = "#00ae4f"; break;
          case "mentor": bgcolor = "#00b0f0"; break;
          case "volunteer": bgcolor = "#a9a900"; break;
          case "special": 
          case "administrator": bgcolor = "#632881"; break;
          default: bgcolor = "#000000";
        }
        
        role.style.backgroundColor = bgcolor;
        currentPage.appendChild(newEl);
        userCounter++;
      }
    } else {
      userCounter -= cardsPerPage; //go back and do the back of the cards
      for(var j = 0; j < cardsPerPage; j++) {
        var newEl = backTemplate.content.cloneNode(true);
        var barcode = newEl.querySelector("svg");
        barcode.id = users[userCounter].role + users[userCounter].id;
        currentPage.appendChild(newEl);
        var head, tail;
        switch(users[userCounter].role) {
          case "hacker": head = "10"; break;
          case "organizer": head = "20"; break;
          case "sponsor": head = "30"; break;
          case "speaker": head = "31"; break;
          case "mentor": head = "40"; break;
          case "volunteer": head = "50"; break;
          case "special": head = "60"; break;
          case "administrator": head = "61"; break;
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
  


function converttoReadable() {
  var ids = document.querySelectorAll('.rowID');
  var textarea = document.querySelector('.jsonInput');
  var tbody = document.querySelector('#infoTable tbody');
  if(!textarea.value) {
    return;
  }
  var jsonData = JSON.parse(textarea.value);
  tbody.textContent = "";
  for (var i=0; i < jsonData.length; i++) {
    var row = addRow();
    var id = document.querySelectorAll('.rowID')[i];
    var name = document.querySelectorAll('.rowName')[i];
    var role = document.querySelectorAll('.rowRole')[i];
    id.value = jsonData[i].id;
    name.value = jsonData[i].name;
    role.value = jsonData[i].role;
  }
  
}

function converttoJSON() {
  var data = [];
  var id, name, role;
  var ids = document.querySelectorAll('.rowID');
  var names = document.querySelectorAll('.rowName');
  var roles = document.querySelectorAll('.rowRole');
  var textarea = document.querySelector('.jsonInput');
  for (var i=0; i < ids.length; i++) {
    id = ids[i].value;
    name = names[i].value;
    role = roles[i].value;
    data.push({id:id, name:name, role:role});
  }
  textarea.value = JSON.stringify(data);
}

//loads data into the users array
function submitJSON() {
  var dialog = document.querySelector('.dialog').style.display = "none";
  var textarea = document.querySelector('.jsonInput');
  if(textarea.value) {
    users = JSON.parse(textarea.value);
  } else {
    converttoJSON();
    users = JSON.parse(textarea.value);
  }
  generateCards(users);
}

function addRow() {
  var rowTemplate = document.querySelector('#rowTemplate');
  var newEl = rowTemplate.content.cloneNode(true);
  var tbody = document.querySelector('#infoTable tbody');
  tbody.appendChild(newEl);
}

function autoIncrement(checkbox) {
  if(checkbox.checked) {
    var ids = document.querySelectorAll('.rowID');
    target = document.querySelector('#beginningTarget').value;
    for (var i=0; i < ids.length; i++) {
      ids[i].value = target;
      target++;
    }
  }
}