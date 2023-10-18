const searchbar = document.querySelector("#searchbar");
const mainTemp = document.querySelector("#main-temp");
const clarity = document.querySelector("#clarity");
const locationDisplay = document.querySelector("#location-display");
const feelsLikeTemp = document.querySelector("#feels-like-temp");
const windSpeed = document.querySelector("#wind-speed");
const humidity = document.querySelector("#humidity");

fetchWeatherData();

searchbar.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && document.activeElement === searchbar) {
    event.preventDefault();

    fetchWeatherData().catch((error) => {
      window.alert("Could not recognize city name :(");
    });
  }
});

async function fetchWeatherData() {
  const searchTerm = searchbar.value;
  let weatherData;

  if (searchTerm === "") {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=ca2b85f59d0545b18cb35136231010&q=Kelowna`,
      { mode: "cors" }
    );
    weatherData = await response.json();
  } else {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=ca2b85f59d0545b18cb35136231010&q=${searchTerm}`,
      { mode: "cors" }
    );
    weatherData = await response.json();
  }

  renderScreen(weatherData);
}

function renderScreen(weatherData) {
  // console.log(weatherData.current.temp_c);
  // console.log(weatherData.current.temp_f);
  mainTemp.textContent = `${weatherData.current.temp_c} C`;

  // console.log(weatherData.current.condition.text);
  clarity.textContent = `${weatherData.current.condition.text}`;

  // console.log(weatherData.location.name);
  // console.log(weatherData.location.country);
  locationDisplay.textContent = `${weatherData.location.name}, ${weatherData.location.country}`;

  // console.log(weatherData.current.feelslike_c);
  // console.log(weatherData.current.feelslike_f);
  feelsLikeTemp.textContent = `Feels like: ${weatherData.current.feelslike_c} C`;

  // console.log(weatherData.current.wind_kph);
  // console.log(weatherData.current.wind_mph);
  windSpeed.textContent = `Wind: ${weatherData.current.wind_kph} KPH`;

  // console.log(weatherData.current.humidity);
  humidity.textContent = `Humidity: ${weatherData.current.humidity}%`;
}
