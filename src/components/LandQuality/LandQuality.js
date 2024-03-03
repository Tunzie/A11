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

  data2 = {
    labels: [],
    datasets: [{
      data: [],
      fill: false,
      borderColor: "red",
      tension: 0.1,
    }],
  };

  // Create the line charts with initial empty data
  myChart1 = new Chart(ctx1, {
    type: "line",
    data: data1,
    options: options,
  });

  myChart2 = new Chart(ctx2, {
    type: "line",
    data: data2,
    options: options,
  });

  // Call the fetchSoilDataAndUpdateCharts function to initially fetch and update data
  fetchSoilDataAndUpdateCharts(latitude, longitude);
});


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

    // Fetch elevation data based on the clicked coordinates
    fetchElevationData(clickedLocation.lat, clickedLocation.lng);
    fetchSoilDataAndUpdateCharts(clickedLocation.lat, clickedLocation.lng);
  });
  // Initialize the geocoder control
  const geocoder = L.Control.geocoder({
    defaultMarkGeocode: false, // Prevent automatic marker placement
  }).addTo(map);

  // Listen for the 'markgeocode' event, which occurs when a location is selected from the search results
  geocoder.on('markgeocode', function (e) {
    const location = e.geocode.center; // Get the coordinates of the selected location
    alert("You searched for: " + location.lat + ", " + location.lng);
    // Fetch elevation data based on the clicked coordinates
    fetchElevationData(clickedLocation.lat, clickedLocation.lng);
    fetchSoilDataAndUpdateCharts(clickedLocation.lat, clickedLocation.lng);
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


// Function to fetch elevation data based on latitude and longitude
function fetchElevationData(latitude, longitude) {
  // Fetch elevation data from the API
  fetch(`https://api.open-meteo.com/v1/elevation?latitude=${latitude}&longitude=${longitude}`)
    .then(response => response.json())
    .then(data => {
      const elevation = data.elevation[0]; // Extract elevation from the response
      updateElevation(elevation); // Call function to update elevation display
    })
    .catch(error => console.error('Error fetching elevation data:', error));
}

// Function to update elevation display
function updateElevation(elevation) {
  // Select the elevation display element
  const elevationDisplay = document.getElementById('elevation');

  // Update the elevation display with the fetched elevation
  elevationDisplay.textContent = `Elevation: ${elevation} meters`;
}


// Function to fetch soil data and update charts
function fetchSoilDataAndUpdateCharts(latitude, longitude) {
  const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=2024-02-28&end_date=2024-02-28&hourly=soil_temperature_0_to_7cm,soil_moisture_0_to_7cm`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const time = data.hourly.time;
      const temperatureData = data.hourly.soil_temperature_0_to_7cm;
      const moistureData = data.hourly.soil_moisture_0_to_7cm;

      // Update labels and data for temperature chart
      myChart1.data.labels = time;
      myChart1.data.datasets[0].data = temperatureData;

      // Update labels and data for moisture chart
      myChart2.data.labels = time;
      myChart2.data.datasets[0].data = moistureData;

      // Call the update method for both charts
      myChart1.update();
      myChart2.update();

      // Calculate average temperature and moisture levels
      const averageTemperature = temperatureData.reduce((a, b) => a + b, 0) / temperatureData.length;
      const averageMoisture = moistureData.reduce((a, b) => a + b, 0) / moistureData.length;
      // Update status based on average temperature and moisture levels
      updateStatus(averageTemperature, averageMoisture);
    })
    .catch(error => console.error('Error fetching soil data:', error));
}


function updateStatus(averageTemperature, averageMoisture) {
  const statusElement = document.getElementById('status');
  const alertElement = document.getElementById('alert');

  // Set default status
  let status = '';
  let alertMessage = '';

  // Determine status based on average temperature and moisture levels
  if (averageTemperature > 30 && averageMoisture > 0.6) {
    status = 'Excellent Land Quality';
    alertMessage = 'No action needed. The soil conditions are ideal for plant growth.';
  } else if ((averageTemperature >= 25 && averageTemperature <= 30) && (averageMoisture >= 0.4 && averageMoisture <= 0.6)) {
    status = 'Good Land Quality';
    alertMessage = 'Land conditions are suitable for most crops. Keep monitoring for optimal growth.';
  } else if ((averageTemperature >= 20 && averageTemperature < 25) && (averageMoisture >= 0.3 && averageMoisture < 0.4)) {
    status = 'Fair Land Quality';
    alertMessage = 'Soil conditions are decent, but some crops may require additional watering.';
  } else if ((averageTemperature < 20) && (averageMoisture < 0.3)) {
    status = 'Poor Land Quality';
    alertMessage = 'Attention required. Soil conditions are not suitable for most crops.';
  } else {
    status = 'Moderate Land Quality';
    alertMessage = 'Soil conditions are average. Keep monitoring for any changes.';
  }

  // Update status display
  statusElement.textContent = `Status: ${status}`;
  alertElement.textContent = `Alert: ${alertMessage}`;
}




// Call the fetchSoilDataAndUpdateCharts function with latitude and longitude fetchSoilDataAndUpdateCharts(52.52, 13.419);

