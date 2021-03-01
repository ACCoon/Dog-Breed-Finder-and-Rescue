// Fired when the search button is clicked, will run getdogpics and dogsnearme passing in values from input fields
$('#search-button').on('click', function(event){
    event.preventDefault();
    var breedInput = $('#breed-input').val().toLowerCase().replace(/\s/g, '');
    var postalCodeInput = $('#postal-code-input').val().trim();
    getDogPics(breedInput);
    dogsNearMe(breedInput, postalCodeInput);
    if(!searchedBreeds.includes(breedInput)){
        saveToList(breedInput);
    }
});

// Returns 3 random dog pics of searched breed from dog api and print them to page

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
    $('#adopt-me-cards').text('');
    let dogURL = 'https://petproxy.herokuapp.com/animals?type=dog&distance=50&limit=3&location=' + postalCode + '&breed='+ breedName
    fetch(dogURL)
    .then(function(response){
        return response.json();
    })
    .then(function(response){
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
                var dogPhoto = 'https://i3.cpcache.com/merchandise/110_550x550_Front_Color-White.jpg?Size=L&AttributeValue=NA&c=True&region={%22name%22:%22FrontCenter%22,%22width%22:8,%22height%22:8,%22alignment%22:%22MiddleCenter%22,%22orientation%22:0,%22dpi%22:100,%22crop_x%22:0,%22crop_y%22:0,%22crop_h%22:800,%22crop_w%22:800,%22scale%22:0,%22template%22:{%22id%22:83534939,%22params%22:{}}}';
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