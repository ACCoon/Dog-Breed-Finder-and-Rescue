$('#search-button').on('click', function(event){
    event.preventDefault();
    console.log('return dog pics');
    var breedInput = $('#breed-input').val().replace(/\s/g, '');
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
}

function dogsNearMe(breedName, postalCode){
    // fetch adoptable dogs with queried breed name and postal code 
    // URL 
    

};