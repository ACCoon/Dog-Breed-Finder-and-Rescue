$('#search-button').on('click', function(event){
    event.preventDefault();
    console.log('return dog pics');
    var userInput = $('#user-input').val();
    console.log(userInput);
    getDogPics(userInput);
})

// write getdogpics function

function getDogPics(breedName){
    var requestURL = `https://dog.ceo/api/breed/${breedName}/images/`

    function populateDogPics(randomBreedPictures) {
        var dogPicDiv = $('#random-dog-pic');
        dogPicDiv.empty();
        var randomDogPic = []
        var firstDog = -1;
        for (var picture of randomBreedPictures.message) {
            var image = picture[0];
            if (image !== firstDog &&randomDogPic.length < 3) {
                randomDogPic.push(picture)
                firstDog = image
            }
        }
        for (var picture of randomDogPic) {
            var element = `<div>
                                <div class="uk-card uk-card-default uk-card-body">
                                    <img src="https://dog.ceo/api/breed/${breedName}/images/" alt="">
                                </div>
                            </div>`
            dogPicDiv.append(element)
        }
    }
    $.ajax({
        url: requestUrl,
        method: 'GET',
    }).then(populateDogPics)
}

function dogsNearMe(breedName){
    // fetch adoptable dogs with queried breed name
    // allow users to enter postal code
}