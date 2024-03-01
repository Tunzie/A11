//Initialize map
let map;
let marker;

$(document).ready(function () {
    map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

// Add a click event listener to the map
map.on('click', function (e) {
    const clickedLocation = e.latlng; // Get the clicked coordinates
    alert("You clicked at: " + clickedLocation.lat + ", " + clickedLocation.lng);
    
    // Remove the previous marker if it exists
    if (marker) {
        map.removeLayer(marker);
    }

    // Drop a pin at the clicked location
    marker = L.marker(clickedLocation).addTo(map);
    
    // Fetch air quality data based on the clicked coordinates
    fetchAirQualityData(clickedLocation.lat, clickedLocation.lng);
});
    // Initialize the geocoder control
    const geocoder = L.Control.geocoder({
        defaultMarkGeocode: false, // Prevent automatic marker placement
    }).addTo(map);

    // Listen for the 'markgeocode' event, which occurs when a location is selected from the search results
    geocoder.on('markgeocode', function (e) {
        const location = e.geocode.center; // Get the coordinates of the selected location
        alert("You searched for: " + location.lat + ", " + location.lng);
        // You can use location.lat and location.lng to perform further actions
        fetchAirQualityData(location.lat, location.lng);
    });


});

// Function to get user's location using geolocation
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            map.setView(userLocation, 15);
            alert("Your location: " + userLocation.lat + ", " + userLocation.lng);
            // You can use userLocation.lat and userLocation.lng to fetch data or perform other actions
        }, function () {
            alert('Error: The Geolocation service failed.');
        });
    } else {
        alert('Error: Your browser doesn\'t support geolocation.');
    }
}

// Call the getLocation function when the button is clicked
$('#getLocation').on('click', getLocation);

// Function to fetch air quality data using coordinates
function fetchAirQualityData(latitude, longitude) {
    const apiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&hourly=pm10`;

    // Fetch data from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Once data is fetched, visualize it
            const pm10Level = data.hourly.pm10[0]; // Assuming the first hourly PM10 level is the most relevant
            // Update current data
            updateCurrentData(pm10Level);
            visualizeAirQualityData(data);
        })
        .catch(error => {
            console.error('Error fetching air quality data:', error);
            // Handle errors if any
        });
}


let airQualityChart; // Define the chart variable globally
// Function to visualize air quality data
function visualizeAirQualityData(data) {
    // Extract hourly PM10 data and time labels
    const hourlyPM10 = data.hourly.pm10;
    const timeLabels = data.hourly.time;

    // If the chart already exists, destroy it first
    if (airQualityChart) {
        airQualityChart.destroy();
    }

    // Create a Chart.js chart
    const ctx = document.getElementById('airQualityChart').getContext('2d');
    airQualityChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeLabels,
            datasets: [{
                label: 'PM10 (μg/m³)',
                data: hourlyPM10,
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Add dark mode / light mode functionality
let isDarkMode = false;

function toggleMode() {
    const body = document.body;
    isDarkMode = !isDarkMode;
    body.classList.toggle('dark', isDarkMode);
}


// Function to update current data based on PM10 level
function updateCurrentData(pm10Level) {
    // Update AQI status based on PM10 level
    let status;
    if (pm10Level <= 50) {
        status = "Good";
    } else if (pm10Level <= 100) {
        status = "Moderate";
    } else if (pm10Level <= 150) {
        status = "Unhealthy for Sensitive Groups";
    } else if (pm10Level <= 200) {
        status = "Unhealthy";
    } else if (pm10Level <= 300) {
        status = "Very Unhealthy";
    } else {
        status = "Hazardous";
    }

    // Update health advisory based on status
    let healthAdvisory;
    switch (status) {
        case "Good":
            healthAdvisory = "No health impacts.";
            break;
        case "Moderate":
            healthAdvisory = "Minor health issues possible for sensitive individuals.";
            break;
        case "Unhealthy for Sensitive Groups":
            healthAdvisory = "Health effects possible for sensitive individuals, and people with respiratory or heart conditions.";
            break;
        case "Unhealthy":
            healthAdvisory = "Health effects likely for everyone, especially sensitive individuals.";
            break;
        case "Very Unhealthy":
            healthAdvisory = "Health effects can be serious for everyone.";
            break;
        case "Hazardous":
            healthAdvisory = "Health alert: everyone may experience serious health effects.";
            break;
        default:
            healthAdvisory = "Information not available.";
    }

    // Update the DOM with the new data
    $('#currentAirData').html(`
        <div>
            <h2 class="text-2xl font-semibold text-blue-600 mb-4">Air Quality</h2>
            <div class="flex justify-center items-center mb-6">
                <i class="fas fa-wind text-blue-600 text-5xl mr-4"></i> <!-- Air Quality icon -->
                <div>
                    <p class="text-lg text-gray-700">Current AQI: <span class="font-bold text-2xl">${pm10Level}</span></p>
                    <p class="text-lg text-gray-700">Status: <span class="font-bold text-green-600">${status}</span></p>
                    <p class="text-lg text-gray-700">PM10 level: <span class="font-bold">${pm10Level}</span></p>
                    <p class="text-lg text-gray-700">Health Advisory: <span class="font-bold">${healthAdvisory}</span></p>
                </div>
            </div>
        </div>
    `);
}

// Example usage:
// Assume pm10Level is the retrieved PM10 level
// updateCurrentData(pm10Level);