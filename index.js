//Displaying todays date
let todayDate = new Date();
let h2 = document.querySelector("h2");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let day = days[todayDate.getDay()];
let month = months[todayDate.getMonth()];
let date = todayDate.getDate();
let year = todayDate.getFullYear();
let hours = todayDate.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = todayDate.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

h2.innerHTML = `${day}, ${month} ${date}, ${year} ${hours}:${minutes}`;

//city search form data get temp
function search(city) {
  let apiKey = "70d227f3ab1426823d74bcea30aa6aeb";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

//weekly forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#weeklyforecast");

  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
<div class="card border-dark mb-3 topcard" style="max-width: 9rem">
       <div class="card-header dates">${formatDay(forecastDay.dt)}</div>
       <div class="card-body">
        <h5 class="card-title"><img src="weathericonimages/${
          forecastDay.weather[0].icon
        }.png" width="50"class="fa-solid fa-sun sunicon" id="weeklyicons"></img></h5>
       <p class="card-text weeklyforcast">
        
        <span class="weeklytemps"> <span class="mintemp">${Math.round(
          forecastDay.temp.min
        )}</span>°-<span class="maxtemp">${Math.round(
          forecastDay.temp.max
        )}</span>°</span>
      </p>
    </div>
  </div>`;
    }
  });
  forecastHTML = forecastHTML + "";
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//main temperature display
function displayTemp(response) {
  let iconElement = document.querySelector("#mainicon");
  celsiusTemp = response.data.main.temp;
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#todayunit").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#windspeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  iconElement.setAttribute(
    "src",
    `weathericonimages/${response.data.weather[0].icon}.png`
  );
  getForecast(response.data.coord);
}
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  search(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);
search("London");

//degree unit change
function changeUnitCel(event) {
  event.preventDefault();
  let unitTempCel = document.querySelector("#todayunit");
  fahrenheit.classList.remove("active");
  fahrenheit.classList.add("inactive");
  celsius.classList.add("active");
  celsius.classList.remove("inactive");
  unitTempCel.innerHTML = Math.round(celsiusTemp);
}
let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", changeUnitCel);

function changeUnitFah(event) {
  event.preventDefault();
  let unitTempFah = document.querySelector("#todayunit");
  celsius.classList.remove("active");
  celsius.classList.add("inactive");
  fahrenheit.classList.add("active");
  fahrenheit.classList.remove("inactive");
  let fahTemp = (celsiusTemp * 9) / 5 + 32;
  unitTempFah.innerHTML = Math.round(fahTemp);
}
let celsiusTemp = null;
let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", changeUnitFah);

//geolocate current temp
function searchLocation(position) {
  let apiKey = "70d227f3ab1426823d74bcea30aa6aeb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocButton = document.querySelector("#currentbutton");
currentLocButton.addEventListener("click", getCurrentLocation);
