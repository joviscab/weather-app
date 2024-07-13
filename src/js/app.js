import "../style/styles.css";
import { getWeather } from "./weather";

//Function to get the location in the search-field
const submitButton = document.getElementById("submit-button");

submitButton.addEventListener("click", () => {
  const locationNameValue = document.getElementById("search-field");
  let locationName = locationNameValue.value;
  callAction(locationName);
});

//Function to display the weather data
function displayWeather(weatherData) {
  const location = weatherData.resolvedAddress;
  const currentConditions = weatherData.currentConditions;

  const tempC = `${currentConditions.temp}`;
  const tempF = (tempC * 9) / 5 + 32;
  const tempF_round = tempF.toFixed(1);

  const feelslikeC = `${currentConditions.feelslike}`;
  const feelslikeF = (feelslikeC * 9) / 5 + 32;
  const feelslikeF_round = feelslikeF.toFixed(1);

  let isCelsius = true;

  const weatherCardC = document.getElementById("weather-card");

  function updateWeatherCard() {
    weatherCardC.innerHTML = `
    <h2>Weather in ${location}</h2>
    <p>Temperature: ${isCelsius ? `${tempC}°C` : `${tempF_round}°F`}</p>
    <p>Thermal Sensation: ${
      isCelsius ? `${feelslikeC}°C` : `${feelslikeF_round}°F`
    }</p>
    <p>Conditions: ${currentConditions.conditions}</p>
    <p>Humidity: ${currentConditions.humidity}%</p>
    <button id="toggle-button">Toggle °C/°F</button>
  `;

    const toggleButton = document.getElementById("toggle-button");
    toggleButton.addEventListener("click", () => {
      isCelsius = !isCelsius;
      updateWeatherCard();
    });
  }

  updateWeatherCard();
}

async function callAction(locationName) {
  const location = locationName;
  console.log(location);
  if (location) {
    try {
      const weatherData = await getWeather(location);
      console.log(weatherData);
      displayWeather(weatherData);
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    }
  } else {
    console.log("No location provided");
  }
}
