// Define global variables for charts and data
let myChart1, myChart2;
let data1, data2;

document.addEventListener("DOMContentLoaded", function () {
    // Configuration options for the chart
    const options = {
        scales: {
            x: {
                display: true,
                backgroundColor: "rgba(54, 162, 235, 0.5)", // Blue color with transparency
                ticks: {
                    autoSkip: true,
                    maxRotation: 90,
                    fontSize: 20, // Increase font size for x-axis labels
                    font: {
                        weight: 'bold', // Optionally make the font bold
                    }
                },
            },
            y: {
                display: true,
                
                ticks: {
                    fontSize: 14, // Increase font size for y-axis labels
                    font: {
                        weight: 'bold', // Optionally make the font bold
                    }
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
        layout: {
            backgroundColor: "rgba(54, 162, 235, 0.5)", // Blue color with transparency
            padding: {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10,
            },
        },
    };

    // Get the context of the canvas elements we want to select
    const ctx1 = document.getElementById("line-chart1").getContext("2d");
    const ctx2 = document.getElementById("line-chart2").getContext("2d");

    // Initialize empty datasets for the charts
    data1 = {
        labels: [],
        datasets: [{
            data: [],
            fill: false,
            tension: 0.1,
            borderColor: 'blue', // Solid blue border
            borderWidth: 1.5, // Border width for the bars
            backgroundColor:"lightblue"
        }],
    };

    data2 = { // Define data2 for turbidity chart
        labels: [],
        datasets: [{
            data: [],
            fill: false,
            backgroundColor:"lightgreen",
            borderColor: 'green', // Solid blue border
            borderWidth: 2, // Border width for the bars
            tension: 0.1,
        }],
    };

    // Create the line charts with initial empty data
    myChart1 = new Chart(ctx1, {
        type: "bar",
        data: data1,
        options: options,
        backgroundColor: "rgba(54, 162, 235, 0.5)", // Blue color with transparency
      
        
    });

    myChart2 = new Chart(ctx2, { // Create myChart2 for turbidity
        type: "bar",
        data: data2,
        options: options,
        backgroundColor: 'rgba(54, 162, 235, 0.5)', // Blue color with transparency
    
    });

    // Call the fetchWaterQualityData function to initially fetch and update data
    fetchWaterQualityData(52.52, 13.41);

    // Generate and plot random data for the initial location
    generateAndPlotRandomData();
});

let map;
let marker;

$(document).ready(function () {
    map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    map.on('click', function (e) {
        const clickedLocation = e.latlng; // Get the clicked coordinates
        alert("You clicked at: " + clickedLocation.lat + ", " + clickedLocation.lng);

        // Remove the previous marker if it exists
        if (marker) {
            map.removeLayer(marker);
        }

        // Drop a pin at the clicked location
        marker = L.marker(clickedLocation).addTo(map);

        // Generate random data for the last 10 days
        const randomPhData = generateRandomData(clickedLocation.lat ,  clickedLocation.lng , 10);
        const randomPollutantsData = generateRandomData(clickedLocation.lat ,  clickedLocation.lng ,10);
        const randomTurbidityData = generateRandomTurbidityData(clickedLocation.lat ,  clickedLocation.lng ,10);
        // Update chart data and labels
        data1.labels = generateDateLabels(10);
        data1.datasets[0].data = randomPhData.map(entry => entry.pH); // Extract pH data from the random data

        // Update chart with new data
        myChart1.update();
        // Update status, pollutants, and alerts
        updateStatus(randomPhData);
        updatePollutants(randomPollutantsData);
        checkAlerts(randomPhData, randomPollutantsData, randomTurbidityData);
        updateTurbidity(randomTurbidityData);
    });

    // Initialize the geocoder control
    const geocoder = L.Control.geocoder({
        defaultMarkGeocode: false, // Prevent automatic marker placement
    }).addTo(map);

    // Listen for the 'markgeocode' event, which occurs when a location is selected from the search results
    geocoder.on('markgeocode', function (e) {
        const location = e.geocode.center; // Get the coordinates of the selected location
        alert("You searched for: " + location.lat + ", " + location.lng);
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



// Function to generate random data for the last n days with adjusted parameters based on location
function generateRandomData(lat, lng, n) {
    const randomData = [];
    const today = new Date();
    
    // Define parameters based on location
    let maxPh, maxPollutant;
    
    // Calculate distance from specified locations
    const distances = [
        getDistance(lat, lng, 48.56128399704175, -105.75496878587087),
        getDistance(lat, lng, 52.24313635333514, 20.784324461865488),
        getDistance(lat, lng, -25.204114806318874, 133.59721390103257),
        getDistance(lat, lng, 69.27325464727454, 114.35452546360143),
        getDistance(lat, lng, 64.3881097529955, -17.866331653483737)
    ];
    
    // Adjust parameters based on distance
    if (distances[0] < 3000) { // Within 500 km of the first location
        maxPh = 7 + Math.random() * 2; // pH between 7 and 9
        maxPollutant = 10 + Math.random() * 20; // Pollutant between 30 and 50
    } else if (distances[1] < 3000) { // Within 500 km of the second location
        maxPh = 7 + Math.random() * 1.5; // pH between 7 and 8.5
        maxPollutant = 40 + Math.random() * 20; // Pollutant between 40 and 60
    } else if (distances[2] < 3000) { // Within 500 km of the third location
        maxPh = 7.5 + Math.random() * 1; // pH between 7.5 and 8.5
        maxPollutant = 20 + Math.random() * 10; // Pollutant between 20 and 30
    } else if (distances[3] < 3000) { // Within 500 km of the fourth location
        maxPh = 6.5 + Math.random() * 1.5; // pH between 6.5 and 8
        maxPollutant = 50 + Math.random() * 30; // Pollutant between 50 and 80
    } else if (distances[4] < 3000) { // Within 500 km of the fifth location
        maxPh = 7 + Math.random() * 2; // pH between 7 and 9
        maxPollutant = 30 + Math.random() * 20; // Pollutant between 30 and 50
    } else { // Farther than 500 km from any specified location
        if (Math.random() < 0.5) { // Randomly choose between two ranges
            maxPh = Math.random() * 5; // pH between 0 and 5
        } else {
            maxPh = 9 + Math.random() * 5; // pH between 9 and 14
        }
        maxPollutant = 30 + Math.random() * 70; // Pollutant between 20 and 100
    }
    

    // Generate random pH and pollutant levels
    for (let i = 0; i < n; i++) {
        const randomPh = Math.random() * maxPh;
        const randomPollutant = Math.random() * maxPollutant;
        randomData.push({ pH: randomPh, pollutant: randomPollutant });
    }
    return randomData;
}

// Function to calculate distance between two coordinates using Haversine formula
function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;  // Convert degrees to radians
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
}


// Function to generate random turbidity data for the last n days with adjusted parameters based on location
function generateRandomTurbidityData(lat, lng, n) {
    const randomData = [];
    
    // Define maximum turbidity level based on location
    let maxTurbidity;
    
    // Calculate distance from specified locations
    const distances = [
        getDistance(lat, lng, 48.56128399704175, -105.75496878587087),
        getDistance(lat, lng, 52.24313635333514, 20.784324461865488),
        getDistance(lat, lng, -25.204114806318874, 133.59721390103257),
        getDistance(lat, lng, 69.27325464727454, 114.35452546360143),
        getDistance(lat, lng, 64.3881097529955, -17.866331653483737)
    ];
    
    // Adjust maximum turbidity level based on distance
    if (distances.some(distance => distance < 3000)) {
        maxTurbidity = 30 + Math.random() * 20; // Turbidity between 30 and 50 if within 500 km of any location
    } else {
        maxTurbidity = 50 + Math.random() * 50; // Turbidity between 50 and 100 if farther than 500 km from all locations
    }

    // Generate random turbidity levels
    for (let i = 0; i < n; i++) {
        const randomTurbidity = Math.random() * maxTurbidity;
        randomData.push({ turbidity: randomTurbidity });
    }
    return randomData;
}




// Function to generate date labels for the last n days
function generateDateLabels(n) {
    const labels = [];
    const today = new Date();
    for (let i = n - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const formattedDate = date.toLocaleDateString(); // Format date as needed
        labels.push(formattedDate);
    }
    return labels;
}

// Function to update status based on pH data
function updateStatus(phData) {
    const averagePh = phData.reduce((sum, entry) => sum + entry.pH, 0) / phData.length;
    const statusElement = document.getElementById('status');
    if (averagePh < 7) {
        statusElement.textContent = "Status: Acidic";
    } else if (averagePh > 8) {
        statusElement.textContent = "Status: Alkaline";
    } else {
        statusElement.textContent = "Status: Neutral";
    }
}

// Function to update pollutants based on random pollutants data
function updatePollutants(pollutantsData) {
    const averagePollutant = pollutantsData.reduce((sum, entry) => sum + entry.pollutant, 0) / pollutantsData.length;
    const pollutantsElement = document.getElementById('pollutants');
    pollutantsElement.textContent = "Pollutants: " + averagePollutant.toFixed(2) + " units µg/m³"; // Update pollutants value
}

// Function to update turbidity chart with random data
function updateTurbidity(randomTurbidityData) {
    data2.labels = generateDateLabels(randomTurbidityData.length);
    data2.datasets[0].data = randomTurbidityData.map(entry => entry.turbidity);
    myChart2.update();
}

function checkAlerts(phData, pollutantsData, turbidityData) {
    const alertElement = document.getElementById('alert');

    // Calculate average pH, pollutant, and turbidity levels
    const pHAverage = phData.reduce((sum, entry) => sum + entry.pH, 0) / phData.length;
    const pollutantAverage = pollutantsData.reduce((sum, entry) => sum + entry.pollutant, 0) / pollutantsData.length;
    const turbidityAverage = turbidityData.reduce((sum, entry) => sum + entry.turbidity, 0) / turbidityData.length;

    // Define thresholds for each level of alertness
    const highPollutantThreshold = 40; // Adjusted threshold for high pollutant level
    const veryHighPollutantThreshold = 50; // Adjusted threshold for very high pollutant level
    const pHThreshold = 8; // Adjusted threshold for low pH
    const lowpHThreshold = 5; // Adjusted threshold for very low pH
    const highTurbidityThreshold = 50; // Adjusted threshold for high turbidity

    // Initialize decision value
    let decisionValue = 1; // Assume water is good to drink by default

    // Check for alerts based on pH, pollutant, and turbidity levels
    if (pollutantAverage > veryHighPollutantThreshold || turbidityAverage > highTurbidityThreshold) {
        decisionValue = 3; // Very high pollutant levels or turbidity
    } else if (pollutantAverage > highPollutantThreshold && pHAverage < lowpHThreshold) {
        decisionValue = 2; // High pollutant levels or low pH
    }

    // Determine the alert message based on the decision value
    let alertMessage;

    switch (decisionValue) {
        case 3:
            alertMessage = "Consider caution when drinking the water due to elevated pollutant levels or turbidity. Regular testing is recommended.";
            break;
        case 2:
            alertMessage = "Water quality may be compromised. Consider testing and treatment if necessary.";
            break;
        case 1:
            alertMessage = "Water is generally safe to drink, but monitor changes and conduct periodic testing.";
            break;
        default:
            alertMessage = "Water quality status unknown. Exercise caution.";
    }

    // Display the alert message
    alertElement.textContent = alertMessage;
}