const activityEl = document.getElementById('activity-p')
const priceEl = document.getElementById('price-p')
const participantsEl = document.getElementById('participants-p')
var submitBtn = document.querySelector('.btn')
var resultSection = document.querySelector('#resultSection')
var searchAgainBtn = document.querySelector('#search-again');
var activitySelector = document.querySelector('#activity-selector');

var activityToDo;

var moneyOne = document.getElementById('moneyOne')
var moneyTwo = document.getElementById('moneyTwo')
var moneyThree = document.getElementById('moneyThree')
var personTwo = document.getElementById("personTwo")
var personThree = document.getElementById('personThree')

var listOfSavedActivities;
var saveActivityBtn = document.getElementById('save');
var savedActivityList = document.getElementById('saved-activity-list');
var activityListHere = document.getElementById('activity-list-here');




document.addEventListener('DOMContentLoaded', (event) => {
    var elems = document.querySelectorAll ('select');
    var instances = M.FormSelect.init (elems, []);
    activitySelector.scrollIntoView({behavior: 'smooth'});
    event.preventDefault()
    activitySelector.scrollIntoView({behavior: 'smooth'});


    var displaySavedActivities = function () {
        $(savedActivityList).empty();
        listOfSavedActivities;
        //sets to empty array if nothing in local storage
        if (localStorage.getItem("activities") === null) {
            listOfSavedActivities = [];
            console.log(listOfSavedActivities);
        }
        
        //if data is in local storage, retrive it and put it into object
        else {
            activityListHere.classList.remove("hide");
            listOfSavedActivities = [];
            listOfSavedActivities = JSON.parse(localStorage.getItem("activities"));
        }
        console.log(listOfSavedActivities);

        //display saved activities
        for (var i=0; i<listOfSavedActivities.length; i++) {
            var activityToLink = listOfSavedActivities[i];
            
            string_to_array = function (str) {
                return str.trim().split(" ");
            };
        
            var arrayToSearch = string_to_array(activityToLink);
        
            var link = "https://google.com/search?q=how+to+";
        
            for (var j=0; j<arrayToSearch.length-1; j++) {
                link = link + arrayToSearch[j] + "+";
            }
        
            link = link + arrayToSearch[arrayToSearch.length-1];
        
            console.log(link);

            var a = document.createElement("a");
            a.setAttribute("href", link);
            a.setAttribute("target", "_blank");
            savedActivityList.appendChild(a)

            var li = document.createElement("li");
            li.classList.add('activity-list-items');
            li.innerHTML = listOfSavedActivities[i];
            a.appendChild(li);
        }
    }
    displaySavedActivities();

    var activityEl = document.getElementById('activity') 


    function getActivityCategory() {
        var modal1 = document.getElementById("modal1");
        var selectedActivity = document.getElementById('searchBar').value;
        console.log(modal1);
        if (selectedActivity === '') {
            // initialize modal
            $('.modal').modal();
            //open modal
            $('#modal1').modal('open');

        } else {
        selectedActivity = selectedActivity.toLowerCase();
        console.log(selectedActivity);
        getApi(selectedActivity);
        getUnsplashApi(selectedActivity);
        }
    };
    

    //Bored API - get suggested activities based on category
    function getApi(selectedActivity) {
        console.log(selectedActivity);

        apiQuery = "https://www.boredapi.com/api/activity?type=" + selectedActivity

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
        priceEl.classList.add('priceEl')
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
    //scroll to results section when category submitted
    resultSection.scrollIntoView({behavior: 'smooth'});
   
    //get suggested activity to put into google search
    function getActivityForGoogleSearch() {
        activityToDo = document.querySelector("#activity").textContent;
        console.log(activityToDo);
        getGoogleLink(activityToDo);
    }
    getActivityForGoogleSearch();   

    }

    //use activity suggested to create google search for how to do that activity
   function getGoogleLink(activityString) {

    string_to_array = function (str) {
        return str.trim().split(" ");
    };

    var arrayToSearch = string_to_array(activityString);

    var link = "https://google.com/search?q=how+to+";

    for (var i=0; i<arrayToSearch.length-1; i++) {
        link = link + arrayToSearch[i] + "+";
    }

    link = link + arrayToSearch[arrayToSearch.length-1];

    console.log(link);

    var googleLinkEl = document.getElementById('google-search');
    //open link in new page
    googleLinkEl.setAttribute("target", "_blank");
    googleLinkEl.setAttribute("href", link);

}

//second API - Unsplash to get images
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
                var modal2 = document.getElementById("modal2");
                // initialize modal
                $('.modal').modal();
                //open modal
                $('#modal2').modal('open');
            }
        })
        .catch(function(error) {
            var modal3 = document.getElementById("modal3");
            // initialize modal
            $('.modal').modal();
            //open modal
            $('#modal3').modal('open');
        });
};
var displayPhoto = function (photoList, category) {
    console.log(photoList);
    var currentPhotoNum = (Math.floor(Math.random()*10));
    console.log(currentPhotoNum);
    console.log(photoList.results[currentPhotoNum].urls.small);
    console.log(photoList.results[currentPhotoNum].alt_description);
    var imageContainer = document.getElementById('image-img');
    console.log(imageContainer);
    imageContainer.src = photoList.results[currentPhotoNum].urls.small;
    imageContainer.alt = photoList.results[currentPhotoNum].alt_description;
}

submitBtn.addEventListener('click', getActivityCategory);

function searchAgain () {
    //reload the page and scroll to the top to search again
    document.location.reload();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}
searchAgainBtn.addEventListener('click', searchAgain);

console.log(listOfSavedActivities);

function saveThisActivity () {
    console.log('save it here');
    //puts new activity into local storage if isn't already there
    console.log(activityToDo);
    console.log(listOfSavedActivities);
    //only add to local storage if specific activity not already there
    if (listOfSavedActivities.indexOf(activityToDo) === -1) {
        listOfSavedActivities.push(activityToDo);
        localStorage.setItem("activities", JSON.stringify(listOfSavedActivities));
    }
displaySavedActivities();    
}
saveActivityBtn.addEventListener('click', saveThisActivity);

});




