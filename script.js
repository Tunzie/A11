// Fake data for demonstration purposes
const fakeAirQualityData = { parameter: "PM2.5", value: 18, unit: "µg/m³" };
const fakeWaterQualityData = { parameter: "pH", value: 7.2 };
const fakeWeatherConditionsData = { temperature: 25, humidity: 60, windSpeed: 10 };

// Function to update the displayed data
function updateData(elementId, data) {
    const element = document.getElementById(elementId);
    element.innerHTML = Object.entries(data).map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`).join('');
}

// Add dark mode / light mode functionality
let isDarkMode = false;

function toggleMode() {
    const body = document.body;
    isDarkMode = !isDarkMode;
    body.classList.toggle('dark', isDarkMode);
}

// Add location fetching functionality
function getLocation() {
    // Implement location fetching logic here
    // For demonstration purposes, you can show an alert
    alert('Fetching location data...');
}

// Update the data on page load
window.onload = function () {
    updateData("airQualityData", fakeAirQualityData);
    updateData("waterQualityData", fakeWaterQualityData);
    updateData("weatherConditionsData", fakeWeatherConditionsData);

    // Attach event listeners to the buttons
    document.getElementById("toggleMode").addEventListener("click", toggleMode);
    document.getElementById("getLocation").addEventListener("click", getLocation);
};
