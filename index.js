/*
TODO:
- Add pressing enter to search on search bar
- Reject input with symbols or numbers
- Validate that the city exists
- Store weather data in localdata
    - Check if  city is already stored in userWeatherData before push
- Delete button for individual card
*/

const searchBar = document.getElementById("search-bar")
const searchBtn = document.getElementById('search-btn')
const alert = document.querySelector(".alert")
const cardContainer = document.querySelector('.card-container')

const apiKey = config.weatherAPIToken

let userWeatherData = []

searchBtn.addEventListener('click', ()=> {
    const searchedCity = searchBar.value
    const acceptedInput = /^[A-Za-z]+$/

    if(searchedCity.match(acceptedInput) && searchedCity !== ""){
        
        alert.style="opacity: 0;"
        // Check if  city is already stored in userWeatherData before push
        if (userWeatherData.indexOf(searchedCity) === -1) {
            userWeatherData.push(searchedCity)
            localStorage.setItem( 'weatherData', userWeatherData)
            getData(searchedCity)
        }
        else {
            // City is already in array
            console.log("City already in arrayy")
        }
    }
    else {
        // Create feedback for user to enter valid response
        alert.style="opacity: 1;"
    }
    searchBar.value = ''
})

function checkCityArray(city) {
    //check if City is already in userWeatherData
    userWeatherData.forEach( userCity => {
        if( userCity === city) {
            console.log("City already exists in array")
            return true
        }
    })
}

async function getData( city = "Pharr") {
    console.log(city)
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
    /*
        Shorthand
        return (await fetch(url).json() )
    */
   createCard(await response.json() )
}

function createCard(weatherData) {
    const newCard = 
    `<div class="card">
        <div class="weather-info">
            <h2 class="city">
                ${weatherData.name}
            </h2>
            <h1 class="temp">
                ${weatherData.main.temp}°F
            </h1>
            <div class="description">
                ${weatherData.weather[0].description}
            </div>
            <div class="humidity">
                Humidity: ${weatherData.main.humidity}%
            </div>
            <div class="wind">
                Wind: ${weatherData.wind.speed}km/h
            </div>
        </div>
        <div class="weather-img">
            <img src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png" alt="" class="icon">
        </div>
        <button class="delete-btn">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>
            </button>
    </div>`

    cardContainer.innerHTML += newCard
}

function startUp() {
    if ( localStorage.getItem('weatherData')) {
        let stored = localStorage.getItem('weatherData')

        userWeatherData = stored.split(',')
        
        userWeatherData.forEach( city => {
            getData(city)
        })
    }
}

startUp()
console.log(userWeatherData)