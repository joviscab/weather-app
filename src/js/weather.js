// Function to fetch the weather data
async function getWeather(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=7XMPJ8LMMBR2MAVMYFZRM6NV6&contentType=json`,
    { mode: "cors" }
  );
  const weatherData = await response.json();
  return weatherData;
  console.log(weatherData);
}

export { getWeather };
