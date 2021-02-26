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
    // fetch from dog pics api
    // pass in dog breed from user input into query string
    // recieve pics from dog pic api
    // add pictures to new html elements to be displayed to page

};

function dogsNearMe(breedName, postalCode){
    // fetch adoptable dogs with queried breed name and postal code 
    // URL 
    

};