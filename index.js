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
function displayTemp(response) {
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
}
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  search(city);
}
//let searchInput = document.querySelector("#search-text-input");

//let h1 = document.querySelector("h1");
//if (searchInput.value) {
// h1.innerHTML = `${searchInput.value}`;
// } else {
//   h1.innerHTML = null;
//   alert("Please type a city");
// }
//}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);
search("London");
//degree unit change
function changeUnitCel(event) {
  event.preventDefault();
  let unitTempCel = document.querySelector("#todayunit");
  unitTempCel.innerHTML = "25";
}
let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", changeUnitCel);

function changeUnitFah(event) {
  event.preventDefault();
  let unitTempFah = document.querySelector("#todayunit");
  unitTempFah.innerHTML = "77";
}
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
