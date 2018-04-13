function getWeatherDataTemplate(data) {
	return `
		<div class="weather">
			<div class="city-name">
                <h2>${data.name}</h2><img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="weather icon" />
                <p>${data.weather[0].description}</p>
            </div>
            <div class="row">
            <div class="city-temp column left">
                <p>L:${data.main.temp_min}<span>&#8457;</span></p>
                <h2>${data.main.temp}<span>&#8457;</span></h2>
                <p>H:${data.main.temp_max}<span>&#8457;</span>	
            </div>
            <div class="weather-desc column right">
                <p>Humidity: ${data.main.humidity}&#37;</p>
                <p>Wind: ${data.wind.speed}mph</p>
            </div>
            </div>
        </div>
	`;
}

function hikeTrailTemplate(trail, placename) {
	return `
		<div class="trail-data block">
			<img src=${trail.imgSmall} alt="trail image" onerror="this.src='http://pureoutside.com/sites/default/files/trails/PhotoPlaceholder.jpg';">
			<h3><a href=${trail.url} target="_blank">${trail.name}</a></h3>
			<p>${trail.location}</p>
			<p>Distance: ${trail.length} mi</p>
            <p>Rating: ${trail.stars}&#9733;</p>
            <p><a href="https://www.google.com/maps/search/?api=1&query=${placename}" target="_blank">Get Direction</a></p>
		</div>
	`;
}