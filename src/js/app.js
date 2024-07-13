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

  const weatherCard = document.getElementById("weather-card");
  weatherCard.innerHTML = `
    <h2>Weather in ${location}</h2>
    <p>Temperature: ${currentConditions.temp}°C</p>
    <p>Thermal Sensation: ${currentConditions.feelslike}°C</p>
    <p>Conditions: ${currentConditions.conditions}</p>
    <p>Humidity: ${currentConditions.humidity}%</p>
    <button id="toggle-button">Toggle °C/°F</button>
  `;

  //Function to toggle celsius to weirdo
  const toggleButton = document.getElementById("toggle-button");
  const tempC = `${currentConditions.temp}`;
  const tempF = (tempC * 9) / 5 + 32;
  console.log(tempC);
  console.log(tempF);

  toggleButton.addEventListener("click", () => {});
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
