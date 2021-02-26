$('#search-button').on('click', function(event){
    event.preventDefault();
    console.log('return dog pics');
    var userInput = $('#user-input').val();
    console.log(userInput);
    getDogPics(userInput);
})

// write getdogpics function

function getDogPics(breedName){
    // fetch from dog pics api
    // pass in dog breed from user input into query string
    // recieve pics from dog pic api
    // add pictures to new html elements to be displayed to page

}

function dogsNearMe(breedName){
    // fetch adoptable dogs with queried breed name
    // allow users to enter postal code
}