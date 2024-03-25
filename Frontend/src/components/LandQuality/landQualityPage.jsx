import React, { useEffect } from 'react';
import L from 'leaflet';
import Chart from 'chart.js/auto';

const landQualityPage= () => {
  useEffect(() => {
    let map;
    let marker;
    let myChart1, myChart2;
    let data1, data2;

    const options = {
      scales: {
        x: {
          display: true,
          ticks: {
            autoSkip: true,
            maxRotation: 90,
            fontSize: 12
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

    const fetchSoilDataAndUpdateCharts = (latitude, longitude) => {
      const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=2024-02-28&end_date=2024-02-28&hourly=soil_temperature_0_to_7cm,soil_moisture_0_to_7cm`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          const time = data.hourly.time;
          const temperatureData = data.hourly.soil_temperature_0_to_7cm;
          const moistureData = data.hourly.soil_moisture_0_to_7cm;

          myChart1.data.labels = time;
          myChart1.data.datasets[0].data = temperatureData;

          myChart2.data.labels = time;
          myChart2.data.datasets[0].data = moistureData;

          myChart1.update();
          myChart2.update();

          const averageTemperature = temperatureData.reduce((a, b) => a + b, 0) / temperatureData.length;
          const averageMoisture = moistureData.reduce((a, b) => a + b, 0) / moistureData.length;

          updateStatus(averageTemperature, averageMoisture);
        })
        .catch(error => console.error('Error fetching soil data:', error));
    };

    const updateStatus = (averageTemperature, averageMoisture) => {
      let status = '';
      let alertMessage = '';

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

      const statusElement = document.getElementById('status');
      const alertElement = document.getElementById('alert');
      statusElement.textContent = `Status: ${status}`;
      alertElement.textContent = `Alert: ${alertMessage}`;
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          map.setView(userLocation, 15);
          alert("Your location: " + userLocation.lat + ", " + userLocation.lng);
        }, function () {
          alert('Error: The Geolocation service failed.');
        });
      } else {
        alert('Error: Your browser doesn\'t support geolocation.');
      }
    };

    const handleMapClick = (e) => {
      const clickedLocation = e.latlng;
      alert("You clicked at: " + clickedLocation.lat + ", " + clickedLocation.lng);

      if (marker) {
        map.removeLayer(marker);
      }

      marker = L.marker(clickedLocation).addTo(map);

      fetchElevationData(clickedLocation.lat, clickedLocation.lng);
      fetchSoilDataAndUpdateCharts(clickedLocation.lat, clickedLocation.lng);
    };

    const handleGeocoderMark = (e) => {
      const location = e.geocode.center;
      alert("You searched for: " + location.lat + ", " + location.lng);

      fetchElevationData(clickedLocation.lat, clickedLocation.lng);
      fetchSoilDataAndUpdateCharts(clickedLocation.lat, clickedLocation.lng);
    };

    const fetchElevationData = (latitude, longitude) => {
      fetch(`https://api.open-meteo.com/v1/elevation?latitude=${latitude}&longitude=${longitude}`)
        .then(response => response.json())
        .then(data => {
          const elevation = data.elevation[0];
          updateElevation(elevation);
        })
        .catch(error => console.error('Error fetching elevation data:', error));
    };

    const updateElevation = (elevation) => {
      const elevationDisplay = document.getElementById('elevation');
      elevationDisplay.textContent = `Elevation: ${elevation} meters`;
    };

    map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    map.on('click', handleMapClick);

    const geocoder = L.Control.geocoder({
      defaultMarkGeocode: false,
    }).addTo(map);

    geocoder.on('markgeocode', handleGeocoderMark);

    const ctx1 = document.getElementById("line-chart1").getContext("2d");
    const ctx2 = document.getElementById("line-chart2").getContext("2d");

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

    getLocation();
  }, []);

  return (    <div>
    <div id="app" className="flex h-screen">
      <aside id="sideMenu" className="relative">
        <h2 className="text-xl font-bold mb-4">Menu</h2>
        <ul>
          <li><a href="AirQuality.html" className="block py-2"><i className="fas fa-wind mr-2"></i>Air Quality</a></li>
          <li><a href="WaterQuality.html" className="block py-2"><i className="fas fa-tint mr-2"></i>Water Quality</a></li>
          <li><a href="#" className="block py-2"><i className="fas fa-cloud-sun mr-2"></i>Weather Conditions</a></li>
          <li><a href="LandQuality.html" className="block py-2"><i className="fas fa-mountain mr-2"></i>Land Quality</a></li>
          <li className="relative flex items-center">
            <a href="Alerts.html" className="block py-2">
              <i className="fas fa-bell mr-2"></i>
              Alerts
            </a>
            <span id="alertsNotification" className="ml-2 bg-red-500 rounded-full w-4 h-4 text-white text-xs flex items-center justify-center"></span>
          </li>
          <li className="relative flex items-center">
            <a href="Settings.html" className="block py-2">
              <i className="fas fa-bell mr-2"></i>
              Settings
            </a> 
          </li>
        </ul>
      </aside>

      <div id="app" className="w-full h-full grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex-col">
          <div className="flexwindow map-window mb-4">
            <h3 className="text-xl font-semibold mb-2">Choose Location</h3>
            <div id="map" className="w-full h-64"></div>
          </div>
          <div className="window status-elevation-window mb-4">
            <p id="status">Status: </p>
            <p id="elevation">Elevation: -- meters</p>
            <div id="alert-container">
              <p id="alert">Alert: </p>
            </div>
          </div>
          <div className="window charts-window mb-4">
            <div className="chart-labels">
              <div className="chart-label">Soil Temp</div>
              <div className="chart-label">Soil Moist</div>
            </div>
            <div className="chart-container">
              <canvas id="line-chart1" width="400" height="100"></canvas>
              <canvas id="line-chart2" width="400" height="100"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default landQualityPage;

