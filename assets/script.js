$('#search-button').on('click', function(event){
    event.preventDefault();
    var breedInput = $('#breed-input').val();
    var postalCodeInput = $('#postal-code-input').val();
    console.log(breedInput);
    console.log(postalCodeInput);
    getDogPics(breedInput);
    dogsNearMe(breedInput, postalCodeInput);
});

// write getdogpics function

function getDogPics(breedName){
    console.log('return dog pics');
    // fetch from dog pics api
    // pass in dog breed from user input into query string
    // recieve pics from dog pic api
    // add pictures to new html elements to be displayed to page

};

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
        for(var i = 0; response.animals[i]; i++){
            let dogPhoto = response.animals[i].photos[i].large;
            let dogName = response.animals[i].name;
            let dogAge = response.animals[i].age;
            let dogDesc = response.animals[i].description;
            let adoptLink = response.animals[i].url;
            
            console.log(dogDesc);
            console.log(dogName);
            console.log(dogPhoto);
            console.log(dogAge);
            console.log(adoptLink);
            

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
}