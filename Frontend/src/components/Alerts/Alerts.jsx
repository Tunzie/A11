import React, { useState, useEffect } from 'react';
import L from 'leaflet';
 
import 'leaflet/dist/leaflet.css';
import './Alerts.css';
 
const WeatherAlerts = () => {
  const [weatherData, setWeatherData] = useState(null);
 
  useEffect(() => {
    // Initialize Leaflet map
    const map = L.map('map').setView([32.8184, 34.9885], 13);
 
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
 
    let marker;
 
    // Handle click on the map
    const onMapClick = (e) => {
      if (marker) {
        map.removeLayer(marker);
      }
 
      marker = new L.marker(e.latlng).addTo(map);
      fetchWeatherData(e.latlng.lat, e.latlng.lng, e.latlng.toString());
    };
 
    map.on('click', onMapClick);
 
    // Clean up function
    return () => {
      map.off('click', onMapClick);
      map.remove();
    };
  }, []); // Empty dependency array means this effect runs once after the initial render
 
  // Function to fetch weather data based on coordinates
  const fetchWeatherData = (latitude, longitude, locationName) => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=weather_code&hourly=weather_code&daily=weather_code&past_days=1&forecast_days=1`
    )
      .then((response) => response.json())
      .then((data) => {
        // Get current weather code
        const currentWeatherCode = data.current.weather_code;
 
        // Map of weather codes to messages
        const weatherMessages = {
          0: "Clear sky",
          1: "Mainly clear",
          2: "Partly cloudy",
          3: "Overcast",
          45: "Fog",
          48: "Depositing rime fog",
          51: "Drizzle (Light)",
          53: "Drizzle (Moderate)",
          55: "Drizzle (Dense)",
          56: "Freezing Drizzle (Light)",
          57: "Freezing Drizzle (Dense)",
          61: "Rain (Slight)",
          63: "Rain (Moderate)",
          65: "Rain (Heavy)",
          66: "Freezing Rain (Light)",
          67: "Freezing Rain (Heavy)",
          71: "Snowfall (Slight)",
          73: "Snowfall (Moderate)",
          75: "Snowfall (Heavy)",
          77: "Snow grains",
          80: "Rain showers (Slight)",
          81: "Rain showers (Moderate)",
          82: "Rain showers (Violent)",
          85: "Snow showers (Slight)",
          86: "Snow showers (Heavy)",
          95: "Thunderstorm (Slight)",
          96: "Thunderstorm with hail (Slight)",
          99: "Thunderstorm with hail (Heavy)",
        };
 
        // Check if the current weather code has a corresponding message
        if (weatherMessages[currentWeatherCode]) {
          // Set weather data
          setWeatherData({
            weatherMessage: weatherMessages[currentWeatherCode],
            locationName: locationName,
          });
 
          // Check weather conditions and show alert to user
          checkWeatherConditions(weatherMessages[currentWeatherCode]);
        } else {
          console.error("Weather code not found:", currentWeatherCode);
        }
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };
 
  // Function to check weather conditions and show alert
  const checkWeatherConditions = (weatherMessage) => {
    // Define weather conditions to show alert
    const conditionsToShowAlert = [
      "Rain (Moderate)",
      "Rain (Heavy)",
      "Thunderstorm (Slight)",
      "Thunderstorm with hail (Slight)",
      "Thunderstorm with hail (Heavy)",
      "Fog",
      "Snow showers (Heavy)",
      "Rain showers (Violent)",
      "Snowfall (Slight)",
      "Snowfall (Heavy)",
      "Snowfall (Moderate)",
      "Depositing rime fog",
    ];
 
    // Check if the current weather message is in the conditions to show alert
    if (conditionsToShowAlert.includes(weatherMessage)) {
      alert("Alert: " + weatherMessage);
    }
  };
 
  // Function to get icon class based on weather message
 
const getIconClass = (weatherMessage) => {
  if (weatherMessage.includes("Clear sky") || weatherMessage.includes("Mainly clear")) {
    return "fas fa-sun";
  } else if (weatherMessage.includes("Drizzle")) {
    return "fas fa-cloud-showers-heavy";
  } else if (weatherMessage.includes("Rain") || weatherMessage.includes("Showers")) {
    return "fas fa-cloud-rain";
  } else if (weatherMessage.includes("Snow")) {
    return "fas fa-snowflake";
  } else if (weatherMessage.includes("Thunderstorm")) {
    return "fas fa-bolt";
  } else {
    return "fas fa-exclamation-triangle";
  }
};
 
 
return (
  <div className="container mx-auto py-8">
    <h1 className="text-3xl font-bold mb-4">Weather Alerts</h1>
 
    {/* Map Container */}
    <div id="map" style={{ height: '400px', width: '100%' }}></div>
 
    {/* Alerts Container */}
    <div id="alertsContainer">
      {weatherData && (
        <div className="alert bg-white rounded-lg shadow">
          {/* Set icon class based on weather message */}
          <i className={`icon ${getIconClass(weatherData.weatherMessage)}`}></i>
          <div>
            <h2 className="message">{weatherData.weatherMessage}</h2>
            <p className="location">Location: {weatherData.locationName}</p>
          </div>
        </div>
      )}
    </div>
 
    {/* Back Button */}
    <a
      href="javascript:history.back()"
      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded inline-block"
    >
      Back
    </a>
  </div>
);
};
 
export default WeatherAlerts;