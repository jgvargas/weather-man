/*
TODO:
- Add pressing enter to search on search bar
- Reject input with symbols or numbers
- Somehow validate the city exists
- Store weather data in localdata
    - Check if  city is already stored in userWeatherData before push
- Delete button for individual card
*/

const searchBar = document.getElementById("search-bar")
const searchBtn = document.getElementById('search-btn')
const alert = document.querySelector(".alert")
const cardContainer = document.querySelector('.card-container')

let weatherData = ''
const apiKey = config.weatherAPIToken

let userWeatherData = []

searchBtn.addEventListener('click', ()=> {
    const searchedCity = searchBar.value

    if(searchedCity == "") {
        // Create feedback for user to enter valid response
        alert.style="opacity: 1;"
    }
    else {
        //Create way to see if city is valid
        alert.style="opacity: 0;"
        // Check if  city is already stored in userWeatherData before push
        userWeatherData.push(searchedCity)
        localStorage.setItem( 'weatherData', userWeatherData)
        getData(searchedCity)
    }
})

function validateInput() {
    //check if string only contains letters
}

async function getData( city = "Pharr") {
    console.log(city)
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)

    weatherData = await response.json();
    console.log(weatherData)
    /*
        Shorthand
        return (await fetch(url).json() )
    */
   createCard()
}

function createCard() {
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
    </div>`

    cardContainer.innerHTML += newCard
}

function startUp() {
    if ( localStorage.getItem('weatherData')) {
        userWeatherData = localStorage.getItem('weatherData')
        console.log("UserData found!", userWeatherData)

        for(let i = 0; i < userWeatherData.length ; i++) {
            console.log( typeof userWeatherData)
        }
            
    }
}
