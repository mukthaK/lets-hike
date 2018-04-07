/*** API URLS ***/
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?appid=ad19330a1a85eb38a78e85ceaba0c320';
const HIKING_PROJECT_URL = 'https://www.hikingproject.com/data/get-trails?maxDistance=10&key=200239759-6ef441eb317cb8f0a1c5f5220bf0cbc2';

/*** Get weather data from openWeatherMap API ***/
function getWeatherData() {
	let city = $('#city-name').val();
	$('#city-name').val('');
    
	const settings = {
	    url: WEATHER_URL,
	    data: {
	      	q: city,
	      	units: 'Imperial'
	    },
	    dataType: 'jsonp',
	    type: 'GET',
	    success: displayWeather
  	};
  	$.ajax(settings);
};

/*** Display weather data ***/
function displayWeather(data) {
	$('.weather-result').html(getWeatherDataTemplate(data));
	getHikeTrailsData(data.coord.lat, data.coord.lon, displayHikeTrails);
};

/*** Get hiking trails data from REI Hiking project API ***/
function getHikeTrailsData(latitude, longitude, callback) {
    const settings = {
    	url: HIKING_PROJECT_URL,
    	data: {
    		sort: 'distance',
    		lat: latitude,
    		lon: longitude
    	},
    	dataType: 'json',
    	type: 'GET',
    	success: callback
    };
    $.ajax(settings);
};

/*** Display hiking trails ***/
function displayHikeTrails(data) {
	$('.hike-result').html("");
	let trailList = data.trails;

	if(trailList.length === 0) {
		$('.hike-result').append(`<h2 class="error-msg"> No nearby trails found</h2>`);
	}
	else
	{
		for (let i = 0; i < trailList.length; i ++) {
        	let placename = encodeURI(trailList[i].name);
            let result = hikeTrailTemplate(trailList[i], placename);
	    	$('.hike-result').append(result);
		}	
	}  
};

/*** Autocomplete the input text using Google map API ***/
function  autocompleteSearchText()  {
    let input = $('#city-name')[0];
    let options = {
        types: ['(regions)']
    };
    autocomplete = new google.maps.places.Autocomplete(input, options);
}

//Scrolls the page to the result section of the page
function scrollpage() {
	$('.submit-button').click(function() {
        $('html, body').animate({
        scrollTop: $("#weather-display").offset().top
    	}, 1500);
    });
}

/*** Begins execution when a place name is submited on Landing page ***/
function searchHikeTrails() {
	$('.search-form').submit(function(event) {
		event.preventDefault();
    	getWeatherData();
	});
    scrollpage();
};

/*** Begin ***/
$(searchHikeTrails);