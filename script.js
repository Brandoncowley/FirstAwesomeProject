const activityEl = document.getElementById('activity-p')
const priceEl = document.getElementById('price-p')
const participantsEl = document.getElementById('participants-p')
var submitBtn = document.querySelector('.btn')
console.log(activityEl)
var resultSection = document.querySelector('#resultSection')
console.log(resultSection);
var searchAgainBtn = document.querySelector('#search-again');
var activitySelector = document.querySelector('#activity-selector');

var moneyOne = document.getElementById('moneyOne')
var moneyTwo = document.getElementById('moneyTwo')
var moneyThree = document.getElementById('moneyThree')
var personTwo = document.getElementById("personTwo")
var personThree = document.getElementById('personThree')

console.log("LLLLLLLL")
console.log(personTwo)
console.log(personThree)
console.log("LLLLLLLL")





document.addEventListener('DOMContentLoaded', (event) => {
    activitySelector.scrollIntoView({behavior: 'smooth'});
    event.preventDefault()
    console.log(this);
    console.log('IS IT WORKING');
    activitySelector.scrollIntoView({behavior: 'smooth'});
    console.log('IS IT WORKING');


    var activityEl = document.getElementById('activity') 


    function getActivityCategory() {
        var selectedActivity = document.getElementById('searchBar').value;
        selectedActivity = selectedActivity.toLowerCase();
        console.log(selectedActivity);
        getApi(selectedActivity);
        getUnsplashApi(selectedActivity);
    };
    
    function getActivityForGoogleSearch() {
        //get activity verbiaage
        getGoogleLink("activityverbiage");
    }
    

    function getApi(selectedActivity) {
        console.log(selectedActivity);

        apiQuery = "http://www.boredapi.com/api/activity?type=" + selectedActivity

        console.log(apiQuery);

        fetch(apiQuery)
            .then(function (response) {
                return response.json();
            })
            .then(function (data1) {
                getActivity(data1)
                console.log(data1);
                
            })
    }

    
    function getActivity(data1) {
        
        console.log(resultSection)
        resultSection.classList.remove("hide");

        //Getting Values back out of Object from the Bored API
        console.log(data1)
        var getActivity = data1.activity
        var getParticipants = data1.participants
        var getType = data1.type
        var getPrice = data1.price
        activityEl.innerHTML = getActivity
        console.log(data1.price)
        console.log(data1.activity)

        function checkPrice(){
        //Checking Price Variable and assigning $$ Signs
        if (data1.price == 0){
        console.log("Free")
        priceEl.innerHTML = "Free";
        }
        else if (data1.price > 0 && data1.price <= .2){
            console.log("Cheap");
            moneyTwo.classList.add('hide');
            moneyThree.classList.add('hide')
        }
        else if (data1.price >.2 && data1.price <= .5){
            console.log("Moderate")
            moneyThree.classList.add('hide')
        }
            else  
            console.log("Expensive")
    }
    checkPrice();

    function checkParticipants(){
        //Checking Participants and assingning people icons
        if (data1.participants == 1){
            console.log(data1.participants)
            personTwo.classList.add('hide');
            personThree.classList.add('hide')
            }
            else if (data1.participants == 2){
                console.log("Two People");
                personThree.classList.add('hide')
            }
        }
    checkParticipants();
    resultSection.scrollIntoView({behavior: 'smooth'});
    }

   function getGoogleLink(activityString) {

    string_to_array = function (str) {
        return str.trim().split(" ");
    };

    var arrayToSearch = string_to_array(activityString);
    console.log(arrayToSearch);

    console.log(arrayToSearch.length);

    var link = "https://google.com/search?q=how+to+";

    for (var i=0; i<arrayToSearch.length-1; i++) {
        link = link + arrayToSearch[i] + "+";
    }

    link = link + arrayToSearch[arrayToSearch.length-1];

    console.log(link);
}





    //SECOND API - pull info from general query
    //SECOND API - insert image that ties to the activity (Unsplash?)


    //9 different categories, arrange in an array, w/ up to 10 activities being listed
    //insert image that ties to the activity (Unsplash?)
    //Give brief on the activity
    //Data key can give visual representation (icon)


    //LAYOUT: list, "click here for more information" - give items above
    // - ALSO - possible tie in for musical selection

    //Using modals are "like" popups, but not as restrictive




function getUnsplashApi(category) {
    var key = '&client_id=n2fGqHKjWmuL15Ufx1eLf0EYsFiL2psgSMrAcGiciX4'
    console.log(category);
    var requestUrl = 'https://api.unsplash.com/search/photos?page=1&query=' + category + key
    console.log(requestUrl);
    fetch(requestUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function(data) {
                    displayPhoto(data, category);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function(error) {
            alert('unable to connect to Unsplash');
        });
};
var displayPhoto = function (photoList, category) {
    console.log(photoList);
    var currentPhotoNum = (Math.floor(Math.random()*11));
    console.log(currentPhotoNum);
    console.log(photoList.results[currentPhotoNum].urls.small);
    console.log(photoList.results[currentPhotoNum].alt_description);
    var imageContainer = document.getElementById('image-img');
    console.log(imageContainer);
    imageContainer.src = photoList.results[currentPhotoNum].urls.small;
    imageContainer.alt = photoList.results[currentPhotoNum].alt_description;
    // imageContainer.height = 250;
}


// getUnsplashApi('Educational');

submitBtn.addEventListener('click', getActivityCategory);

function searchAgain () {
    // console.log('HERE');
    // activitySelector.scrollIntoView({behavior: 'smooth'});
    document.location.reload();
    //activitySelector.scrollIntoView({behavior: 'smooth'});
}
searchAgainBtn.addEventListener('click', searchAgain);

});




