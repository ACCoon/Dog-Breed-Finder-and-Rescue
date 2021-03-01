$('#search-button').on('click', function(event){
    event.preventDefault();
    var breedInput = $('#breed-input').val();
    var postalCodeInput = $('#postal-code-input').val();
    getDogPics(breedInput);
    dogsNearMe(breedInput, postalCodeInput);
    if(!searchedBreeds.includes(breedInput)){
        saveToList(breedInput);
    }
});

// write getdogpics function

function getDogPics(breedName){
    fetch('https://dog.ceo/api/breed/'+ breedName +'/images/random/3')
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        var randomDog = $('#random-dog-pic')
        randomDog.empty();
       for (var i = 0; i < 3; i++){
            var element = `
            <div>
                <div class="uk-card uk-card-default uk-card-body">
                <img src="${response.message[i]}" alt=""></div>
            </div>`
            randomDog.append(element)
        }
    })
};


// function fetches from rescue api, grabs info and prints a card to the page for adoptable dogs
function dogsNearMe(breedName, postalCode){ 
    // fetch adoptable dogs with queried breed name and postal code 
    // URL specifies dog, distance of within 50 miles of user input postal code and user input dog breed 
    // URL will pass in breedName and postalCode passed when click event happens 
    // extract needed information from response, should be array containing 3 dogs 
    // picture, name, age, desc, link to adopt
    $('#adopt-me-cards').text('');
    let dogURL = 'https://petproxy.herokuapp.com/animals?type=dog&distance=50&limit=3&location=' + postalCode + '&breed='+ breedName
    fetch(dogURL)
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        // loop through the array of ANIMALS in the response, should always return 3 animals due to query parameters in the URL 
        // conditional that shows user no dogs found if search isnt found
        // console.log(response.error)
        if (postalCode === ''){
            $('#adopt-me-cards').text('Enter your postal code to find adoptable dogs near you')
        } else if (response.error == 'url error'){
            console.log('error')
            $('#adopt-me-cards').text('Sorry! We couldnt fetch any adoptable dogs of that breed in your area!')
        }

        for(var i = 0; response.animals[i]; i++){
            
            if (response.animals[i].photos.length){
                var dogPhoto = response.animals[i].photos[0].full;               
            } else {
                var dogPhoto = 'https://lakelandescaperoom.com/wp-content/uploads/2016/09/image-placeholder-500x500-300x300.jpg';
            }

            let dogName = response.animals[i].name;
            let dogAge = response.animals[i].age;
            let dogDesc = response.animals[i].description;
            let adoptLink = response.animals[i].url;
            
            let adoptDogCard = `<div class="uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin" uk-grid>
            <div class="uk-card-media-left uk-cover-container">
                <img src="${dogPhoto}" alt="" uk-cover>
                <canvas width="600" height="400"></canvas>
            </div>
            <div>
                <div class="uk-card-body">
                    <h3 class="uk-card-title">This ${breedName} is near you for adoption!</h3>
                    <ul class="uk-list">
                        <li>Name: ${dogName}</li>
                        <li>Age: ${dogAge}</li>
                        <li>Description: ${dogDesc}</li>
                        <li><a href = "${adoptLink}">Adopt me!</a></li>
                    </ul>
                </div>
            </div>
        </div>`;

            
            $('#adopt-me-cards').append(adoptDogCard);
            $('#postal-code-input').val('');
            
        }
    })
};

// clear history button, clears local storage and list html
$('#clear-history').on('click', function(){
    $('#search-history').html('');
    localStorage.clear();
});

// stores each breed name searched as an array in localstorage
var searchedBreeds = JSON.parse(localStorage.getItem('searchHistory')) || [];
function saveToList(breedInput){
    searchedBreeds.push(breedInput);
    localStorage.setItem('searchHistory', JSON.stringify(searchedBreeds));
    renderSearchHistory();
};

// prints the search inputs to a list under the search bar
function renderSearchHistory(){
        $('#search-history').text('');
    for(var i = 0; i < searchedBreeds.length; i++){
        var dogBreedName = `<button class = "uk-button-secondary dog-button uk-button-large">${searchedBreeds[i]}</button>`;
        $('#search-history').append(dogBreedName);
    }
};

// persists the search on the page if user has used the app before
function init(){
    if(searchedBreeds !== null){
        renderSearchHistory();
    }
};
// initializes the rendersearchhistory if there is previous data in local storage 
init();

// makes the search history button give you random dog pictures according to the breed on that button
$('#search-history').on('click', '.dog-button', function(){
    getDogPics($(this).html());
});