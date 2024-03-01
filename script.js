// Fake data for demonstration purposes
const fakeAirQualityData = { parameter: "PM2.5", value: 18, unit: "µg/m³" };
const fakeWaterQualityData = { parameter: "pH", value: 7.2 };
const fakeWeatherConditionsData = { temperature: 25, humidity: 60, windSpeed: 10 };
// Fake data for demonstration purposes
const fakeLandQualityData = { parameter: "Soil pH", value: 6.5 };
// Function to update the displayed data
function updateData(elementId, data) {
    const element = document.getElementById(elementId);
    element.innerHTML = Object.entries(data).map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`).join('');
}

// Add dark mode / light mode fu    ctionality
let isDarkMode = false;

function toggleMode() {
    const body = document.body;
    isDarkMode = !isDarkMode;
    body.classList.toggle('dark', isDarkMode);
}

// Add location fetching functionality
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Use a reverse geocoding service to get the address based on the coordinates
    const geocodingApiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
    
    fetch(geocodingApiUrl)
        .then(response => response.json())
        .then(data => {
            const address = data.display_name || "Location data not available";
            alert(`Location Data:\nLatitude: ${latitude}\nLongitude: ${longitude}\nAddress: ${address}`);
            // You can use the obtained coordinates and address as needed, for example, update your dashboard with the location data.
        })
        .catch(error => {
            console.error("Error fetching location data:", error);
            alert("Error fetching location data. Please try again later.");
        });
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

// Update the data on page load
window.onload = function () {
    updateData("airQualityData", fakeAirQualityData);
    updateData("waterQualityData", fakeWaterQualityData);
    updateData("weatherConditionsData", fakeWeatherConditionsData);
    updateData("landQualityData", fakeLandQualityData);

    // Attach event listeners to the buttons
    document.getElementById("toggleMode").addEventListener("click", toggleMode);
    document.getElementById("getLocation").addEventListener("click", getLocation);
};
