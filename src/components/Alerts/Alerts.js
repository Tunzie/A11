const alertsContainer = document.getElementById("alertsContainer");
console.log("fds");
// Function to fetch weather data based on coordinates
function fetchWeatherData(latitude, longitude, locationName) {
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

      // Clear previous alerts
      alertsContainer.innerHTML = "";

      // Check if the current weather code has a corresponding message
      if (weatherMessages[currentWeatherCode]) {
        // Create an alert div
        const alertDiv = document.createElement("div");
        alertDiv.classList.add("alert", "bg-white", "rounded-lg", "shadow");

        // Set icon class based on weather code
        let iconClass = "";
        if (currentWeatherCode >= 0 && currentWeatherCode <= 3) {
          iconClass = "fas fa-sun"; // Clear sky or partly cloudy
        } else if (currentWeatherCode >= 45 && currentWeatherCode <= 67) {
          iconClass = "fas fa-cloud-rain"; // Rain or drizzle
        } else if (currentWeatherCode >= 71 && currentWeatherCode <= 86) {
          iconClass = "fas fa-snowflake"; // Snowfall or snow showers
        } else if (currentWeatherCode >= 95 && currentWeatherCode <= 99) {
          iconClass = "fas fa-bolt"; // Thunderstorm
        } else {
          iconClass = "fas fa-exclamation-triangle"; // Default icon
        }

        // Create HTML for the alert
        alertDiv.innerHTML = `
                            <div class="flex items-center p-4">
                                <i class="icon ${iconClass} text-2xl"></i>
                                <div>
                                    <h2 class="message">${weatherMessages[currentWeatherCode]}</h2>
                                    <p class="code">Current weather code: ${currentWeatherCode}</p>
                                    <p class="location">Location: ${locationName}</p>
                                </div>
                            </div>
                        `;

        // Append the alert to the alerts container
        alertsContainer.appendChild(alertDiv);

        // Check weather conditions and show alert to user
        checkWeatherConditions(weatherMessages[currentWeatherCode]);
      } else {
        console.error("Weather code not found:", currentWeatherCode);
      }
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

// Function to check weather conditions and show alert
function checkWeatherConditions(weatherMessage) {
  // Define weather conditions to show alert
  const conditionsToShowAlert = [
    "Rain (Slight)",
    "Rain (Moderate)",
    "Rain (Heavy)",
    "Thunderstorm (Slight)",
    "Thunderstorm with hail (Slight)",
    "Thunderstorm with hail (Heavy)",
  ];

  // Check if the current weather message is in the conditions to show alert
  if (conditionsToShowAlert.includes(weatherMessage)) {
    alert("Alert: " + weatherMessage);
  }
}

// Initialize Leaflet map
var map = L.map("map").setView([32.8184, 34.9885], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

var marker;

// Handle click on the map
function onMapClick(e) {
  if (marker) {
    map.removeLayer(marker);
  }

  marker = new L.marker(e.latlng).addTo(map);
  fetchWeatherData(e.latlng.lat, e.latlng.lng, e.latlng.toString());
}

map.on("click", onMapClick);
