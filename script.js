const API_KEY = 'd8d74e5099354581b23180356240411'
const userLocation = document.getElementById('userLocation');
const getWeather = document.getElementById('getWeather');

let container = document.querySelector('.weather-detail-container');

async function getWeatherData(query){
    let responce = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${query}&aqi=no`);
    let data = await responce.json();
    return data;
}

async function showDataOnUi(){
    const query = userLocation.value;
    let data = await getWeatherData(query);
    console.log(data)
    let {location, current} = data;

    container.innerHTML = `
        <div class="live-status">
                <div class="logo">
                    <img src="${current.condition.icon}">
                </div>
                <div class="current-condition">
                    <p class="time">${current.last_updated}</p>
                    <p class="condition">${current.condition.text}</p>
                </div>
            </div>

            <h3 class="temprature">${current.temp_c}°C</h3>
            <h2 class="city">${location.name}, ${location.region}</h2>

            <div class="temp-sub">
                <div class="humidity">
                    <i class="fa-solid fa-water"></i>
                    <div class="hum-sub">
                        <p>${current.humidity}%</p>
                        <p>Humidity</p>
                    </div>
                </div>
                <div class="wind">
                    <i class="fa-solid fa-wind"></i>
                    <div class="wind-sub">
                        <p>${current.wind_kph} km/h</p>
                        <p>Wind speed</p>
                    </div>
                </div>
            </div>
    `
}

getWeather.addEventListener('click', (e) =>{
    e.preventDefault();
    showDataOnUi();
});