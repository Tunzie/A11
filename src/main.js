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

// Add dark mode / light mode functionality
let isDarkMode = false;


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
function loginButton() {
    window.location.href='../src/components/Login/login.html';
}
// Update the data on page load
window.onload = function () {
    updateData("airQualityData", fakeAirQualityData);
    updateData("waterQualityData", fakeWaterQualityData);
    updateData("weatherConditionsData", fakeWeatherConditionsData);
    updateData("landQualityData", fakeLandQualityData);

    // Attach event listeners to the buttons
    document.getElementById("getLocation").addEventListener("click", getLocation);
};

// JavaScript functions for toggling settings

// Toggle Accessibility
function toggleAccessibility() {
    const accessibilityToggle = document.getElementById('accessibilityToggle');
    if (accessibilityToggle.checked) {
        // Accessibility is ON
        // Perform actions when Accessibility is turned ON
        console.log("Accessibility is ON");
    } else {
        // Accessibility is OFF
        // Perform actions when Accessibility is turned OFF
        console.log("Accessibility is OFF");
    }
}

// Toggle Dark Mode
function toggleDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    if (darkModeToggle.checked) {
        // Dark Mode is ON
        // Apply dark mode styles
        body.classList.add('dark-mode');
        console.log("Dark Mode is ON");
    } else {
        // Dark Mode is OFF
        // Remove dark mode styles
        body.classList.remove('dark-mode');
        console.log("Dark Mode is OFF");
    }
}
// Toggle Notifications
function toggleNotifications() {
    const notificationsToggle = document.getElementById('notificationsToggle');
    if (notificationsToggle.checked) {
        // Notifications are ON
        // Perform actions when Notifications are turned ON
        console.log("Notifications are ON");
    } else {
        // Notifications are OFF
        // Perform actions when Notifications are turned OFF
        console.log("Notifications are OFF");
    }
}

// Toggle Alerts
function toggleAlerts() {
    const alertsToggle = document.getElementById('alertsToggle');
    if (alertsToggle.checked) {
        // Alerts are ON
        // Perform actions when Alerts are turned ON
        console.log("Alerts are ON");
        // Example: Show the alert div
        document.getElementById('alert').style.display = 'block';
    } else {
        // Alerts are OFF
        // Perform actions when Alerts are turned OFF
        console.log("Alerts are OFF");
        // Example: Hide the alert div
        document.getElementById('alert').style.display = 'none';
    }
}

// Open Accessibility Modal
function openAccessibilityModal() {
    const accessibilityModal = document.getElementById('accessibilityModal');
    accessibilityModal.classList.remove('hidden');
}

// Close Accessibility Modal
function closeAccessibilityModal() {
    const accessibilityModal = document.getElementById('accessibilityModal');
    accessibilityModal.classList.add('hidden');
}

// Toggle Large Text
function toggleLargeText() {
    const largeTextToggle = document.getElementById('largeTextToggle');
    const body = document.body;
    if (largeTextToggle.checked) {
        body.classList.add('large-text');
    } else {
        body.classList.remove('large-text');
    }
}

// Toggle High Contrast
function toggleHighContrast() {
    const highContrastToggle = document.getElementById('highContrastToggle');
    const body = document.body;
    if (highContrastToggle.checked) {
        body.classList.add('high-contrast');
    } else {
        body.classList.remove('high-contrast');
    }
}

// Toggle Reduce Motion
function toggleReduceMotion() {
    const reduceMotionToggle = document.getElementById('reduceMotionToggle');
    const body = document.body;
    if (reduceMotionToggle.checked) {
        body.classList.add('reduce-motion');
    } else {
        body.classList.remove('reduce-motion');
    }
}
