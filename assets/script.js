$('#search-button').on('click', function(event){
    event.preventDefault();
    console.log('return dog pics');
    var breedInput = $('#breed-input').val();
    var postalCodeInput = $('#postal-code-input').val();
    console.log(breedInput);
    console.log(postalCodeInput);
    getDogPics(breedInput);
    dogsNearMe(breedInput, postalCodeInput);
});

// write getdogpics function

function getDogPics(breedName){
    fetch('https://dog.ceo/api/breed/'+ breedName +'/images/random/3')
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        console.log(response.message[0])
    })
}

function dogsNearMe(breedName, postalCode){
    // fetch adoptable dogs with queried breed name and postal code 
    // URL 
    

};