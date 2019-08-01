//This app retrieves a dataset from the randomUser API and then displays that dataset
//Users can click on respective users to view further indepth information about the particular clicked user dataset

//Declaration of Global Variables
let allUsersAPIArray = [];  //Global Array Set where fetched random user datasets will be stored
let galleryLocation = document.getElementById("gallery"); //Stores location of gallery where random user datasets will be displayed
let currentCount; //Stores counter of current displayed indepth random user dataset

displaySearchBar();
fetchRandomUserAPIandDisplayUsers();  //Fetch random user datasets from the random user api and display them








//This function fetches random user datasets from the random user api and display them
function fetchRandomUserAPIandDisplayUsers(){

  fetch('https://randomuser.me/api/?results=12')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {

      allUsersAPIArray = myJson.results;
      displayAPIData();

    });

}

//This function displays the search form into the HTML
function displaySearchBar(){

  let searchBarLocation = document.getElementsByClassName("search-container")[0];
  let html = `<form action="#" method="get">
                  <input type="search" id="search-input" class="search-input" placeholder="Search...">
                  <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
              </form>`;
  searchBarLocation.insertAdjacentHTML('beforeend',html);

}

//This function displays the fetched user data set, runs from the function 'fetchRandomUserAPIandDisplayUsers'
function displayAPIData(){

  //Creates individual random user elements to be displayed in the body, up to the total amount of random users requested from the randomUser API
  for(let i = 0 ; i < allUsersAPIArray.length ; i ++){

    displayIndividualAPIData(i);

  }

}

function displayIndividualAPIData(inputCount){

  let currentRandomUser = allUsersAPIArray[inputCount];
  let currentRandomUserPic = currentRandomUser.picture.large;
  let currentRandomUserFirstName = currentRandomUser.name.first;
  let currentRandomUserLastName = currentRandomUser.name.last;
  let currentRandomUserEmail = currentRandomUser.email;
  let currentRandomUserLocation = currentRandomUser.location.city + ", " + currentRandomUser.location.state;
  let html = `<div class="card" data-count=${inputCount}>
                  <div class="card-img-container">
                      <img class="card-img" src=${currentRandomUserPic} alt="profile picture">
                  </div>
                  <div class="card-info-container">
                      <h3 id="name" class="card-name cap">${currentRandomUserFirstName} ${currentRandomUserLastName}</h3>
                      <p class="card-text">${currentRandomUserEmail}</p>
                      <p class="card-text cap">${currentRandomUserLocation}</p>
                  </div>
              </div>`;

  galleryLocation.insertAdjacentHTML('beforeend',html);

}

//This function displays indepth random user dataset when the the fetched user data is clicked
function displayModal(inputUserCount){

  //Retrieves various data from the individual dataset
  let selectedUserData = allUsersAPIArray[inputUserCount];
  let selectedRandomUserPic = selectedUserData.picture.large;
  let selectedRandomUserFirstName = selectedUserData.name.first;
  let selectedRandomUserLastName = selectedUserData.name.last;
  let selectedRandomUserEmail = selectedUserData.email;
  let selectedRandomUserCity = selectedUserData.location.city;
  let selectedRandomUserState = selectedUserData.location.state;
  let selectedRandomUserCell = selectedUserData.cell;
  let selectedRandomUserStreet = selectedUserData.location.street;
  let selectedRandomUserPostal = selectedUserData.location.postcode;

  //Retrieve date of birth value, removing the time data
  let selectedRandomUserDOB = selectedUserData.dob.date;
  var n = selectedRandomUserDOB.indexOf('T');
  selectedRandomUserDOB = selectedRandomUserDOB.substring(0, n != -1 ? n : s.length);

  //Creates and inserts the modal to be displayed
  let html = `<div class="modal-container" id="modalID">
      <div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
          <div class="modal-info-container">
              <img class="modal-img" src=${selectedRandomUserPic} alt="profile picture">
              <h3 id="name" class="modal-name cap">${selectedRandomUserFirstName} ${selectedRandomUserLastName}</h3>
              <p class="modal-text">${selectedRandomUserEmail}</p>
              <p class="modal-text cap">${selectedRandomUserCity}</p>
              <hr>
              <p class="modal-text">${selectedRandomUserCell}</p>
              <p class="modal-text">${selectedRandomUserStreet}, ${selectedRandomUserState}, OR ${selectedRandomUserPostal}</p>
              <p class="modal-text">Birthday: ${selectedRandomUserDOB}</p>
          </div>
      </div>

      <div class="modal-btn-container">
          <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
          <button type="button" id="modal-next" class="modal-next btn">Next</button>
      </div>
  </div>`;
  galleryLocation.insertAdjacentHTML('beforeend',html);

}

//This function removes indepth random user dataset view when the the close button in the modal is clicked
function removeModal(){

  galleryLocation.removeChild(galleryLocation.lastChild);

}








//The functions below include the event listener handlers

//Displays the modal that displayed additonal info of the random user the user clicks
$('body').on('click','.card',function() {

      currentCount = $(this).data('count');
      displayModal(currentCount);

});

//Closes and removes the modal when the user clicks on the 'X' button
$('body').on('click','.modal-close-btn',function() {

      removeModal();

});

//Closes and removes the current modal and displays a new modal with the previous random user indepth data
$('body').on('click','.modal-prev',function() {

  if((currentCount - 1) >= 0){

    removeModal();
    currentCount = currentCount - 1;
    displayModal(currentCount);

  }

});

//Closes and removes the current modal and displays a new modal with the next random user indepth data
$('body').on('click','.modal-next',function() {

  if((currentCount + 1) < allUsersAPIArray.length){

    removeModal();
    currentCount = currentCount + 1;
    displayModal(currentCount);

  }

});

//This function filters the displayed random user data sets when the user clicks the search button with a search input value
$('body').on('click','#serach-submit',function(event) {

  event.preventDefault();
  $("#gallery").empty();
  let searchInputValue = document.getElementById("search-input").value;

  if(searchInputValue!==""){

    for(let i = 0 ; i < allUsersAPIArray.length ; i ++){

      if(allUsersAPIArray[i].location.state.includes(searchInputValue)){

        displayIndividualAPIData(i);

      }

    }

  }else{

    displayAPIData();

  }

});

//This function resets the displayed random user datasets to the initial random users dataset requested when there is no value in the search form
$( "#search-input" ).keyup(function(event) {

  let searchInputValue = document.getElementById("search-input").value;
  if(searchInputValue===""){

    $("#gallery").empty();
    displayAPIData();

  }

});
