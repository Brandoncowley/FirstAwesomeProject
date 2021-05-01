document.addEventListener('DOMContentLoaded', (event) => {
    event.preventDefault()
    //JS sheet begins here
    //ADD APIs HERE
    var requestUrl = "http://www.boredapi.com/api/activity/"

    var activityEl = document.getElementById('activity')

    var selectedActivity = 'education'

    var apiQuery = "http://www.boredapi.com/api/activity?type=" + selectedActivity

    console.log(apiQuery)

    function getApi() {
        fetch(apiQuery)
            .then(function (response) {
                return response.json();
            })
            .then(function (data1) {
                return getActivity(data1)
                
            })
    }


    //
    
    function getActivity(data1) {
        var getActivity = data1.activity
        var getParticipant = data1.participants
        var getType = data1.type
        var getPrice = data1.price
    }
    
    getApi();


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


})