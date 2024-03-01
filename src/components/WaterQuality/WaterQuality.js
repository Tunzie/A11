// Define global variables for charts and data
let myChart1, myChart2;
let data1, data2;

document.addEventListener("DOMContentLoaded", function () {
    // Configuration options for the chart
    const options = {
        scales: {
            x: {
                display: true,
                ticks: {
                    autoSkip: true, // Automatically skip labels to prevent overlap
                    maxRotation: 90, // Rotate labels to 0 degrees (horizontal)
                    fontSize: 12 // Adjust font size of x-axis labels
                },
            },
            y: {
                display: true,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
        layout: {
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
            borderColor: "blue",
            tension: 0.1,
        }],
    };

    data2 = { // Define data2 for turbidity chart
        labels: [],
        datasets: [{
            data: [],
            fill: false,
            borderColor: "green",
            tension: 0.1,
        }],
    };

    // Create the line charts with initial empty data
    myChart1 = new Chart(ctx1, {
        type: "line",
        data: data1,
        options: options,
    });

    myChart2 = new Chart(ctx2, { // Create myChart2 for turbidity
        type: "line",
        data: data2,
        options: options,
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
        const randomPhData = generateRandomData(10);
        const randomPollutantsData = generateRandomData(10);
        const randomTurbidityData = generateRandomTurbidityData(10);
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

// Function to generate random data for the last n days
function generateRandomData(n) {
    const randomData = [];
    const today = new Date();
    for (let i = 0; i < n; i++) {
        // Generate random pH level between 0 and 14
        const randomPh = Math.random() * 14;
        // Generate random water pollutant level
        const randomPollutant = Math.random() * 100; // Assuming maximum pollutant level is 100
        randomData.push({ pH: randomPh, pollutant: randomPollutant });
    }
    return randomData;
}

// Function to generate random data for the last n days (turbidity data)
function generateRandomTurbidityData(n) {
    const randomData = [];
    for (let i = 0; i < n; i++) {
        // Generate random turbidity level between 0 and 100 (assuming maximum turbidity level is 100)
        const randomTurbidity = Math.random() * 100;
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

    // Define thresholds for each level of alertness (adjusted for less severity)
    const highPollutantThreshold = 30;
    const veryHighPollutantThreshold = 50;
    const pHThreshold = 7.8;
    const highTurbidityThreshold = 40; // Adjusted threshold for high turbidity

    // Initialize decision value
    let decisionValue = 1; // Assume water is good to drink by default

    // Check for alerts based on pH, pollutant, and turbidity levels
    if (pollutantAverage > veryHighPollutantThreshold || turbidityAverage > highTurbidityThreshold) {
        decisionValue = 3; // Very high pollutant levels or turbidity
    } else if (pollutantAverage > highPollutantThreshold || pHAverage < pHThreshold) {
        decisionValue = 2; // High pollutant levels or low pH
    }

    // Determine the alert message based on the decision value (adjusted for less severity)
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

