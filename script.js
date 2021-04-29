//JS sheet begins here
//ADD APIs HERE
var requestUrl = 'http://www.boredapi.com/api/activity/';

var activityEl= document.getElementById('activity')



function getApi(){
    fetch (requestUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function (data1){
       getActivity(data1)
       

        
    })
}


//
getApi();

function getActivity(data1){
    
    var randomActivity = data1.activity
    
    activityEl.innerHTML = randomActivity
    
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

//Melina's notes for branch testing
    
