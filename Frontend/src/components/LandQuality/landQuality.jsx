import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import Chart from 'chart.js/auto';

const landQuality = () => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [myChart1, setMyChart1] = useState(null);
  const [myChart2, setMyChart2] = useState(null);
  const [data1, setData1] = useState({ labels: [], datasets: [{ data: [], fill: false, borderColor: 'blue', tension: 0.1 }] });
  const [data2, setData2] = useState({ labels: [], datasets: [{ data: [], fill: false, borderColor: 'red', tension: 0.1 }] });

  useEffect(() => {
    const options = {
      scales: {
        x: { display: true, ticks: { autoSkip: true, maxRotation: 90, fontSize: 12 } },
        y: { display: true },
      },
      plugins: { legend: { display: false } },
      layout: { padding: { top: 10, bottom: 10, left: 10, right: 10 } },
    };

    const fetchSoilDataAndUpdateCharts = (latitude, longitude) => {
      const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=2024-02-28&end_date=2024-02-28&hourly=soil_temperature_0_to_7cm,soil_moisture_0_to_7cm`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          const time = data.hourly.time;
          const temperatureData = data.hourly.soil_temperature_0_to_7cm;
          const moistureData = data.hourly.soil_moisture_0_to_7cm;

          setData1(prevData => ({ ...prevData, labels: time, datasets: [{ ...prevData.datasets[0], data: temperatureData }] }));
          setData2(prevData => ({ ...prevData, labels: time, datasets: [{ ...prevData.datasets[0], data: moistureData }] }));

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

      setStatus(status);
      setAlertMessage(alertMessage);
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          const userLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
          setMap(L.map('map').setView(userLocation, 15));
          alert(`Your location: ${userLocation.lat}, ${userLocation.lng}`);
        }, function () {
          alert('Error: The Geolocation service failed.');
        });
      } else {
        alert('Error: Your browser doesn\'t support geolocation.');
      }
    };

    const handleMapClick = (e) => {
      const clickedLocation = e.latlng;
      alert(`You clicked at: ${clickedLocation.lat}, ${clickedLocation.lng}`);

      if (marker) map.removeLayer(marker);

      setMarker(L.marker(clickedLocation).addTo(map));

      fetchSoilDataAndUpdateCharts(clickedLocation.lat, clickedLocation.lng);
    };

    const fetchElevationData = (latitude, longitude) => {
      fetch(`https://api.open-meteo.com/v1/elevation?latitude=${latitude}&longitude=${longitude}`)
        .then(response => response.json())
        .then(data => updateElevation(data.elevation[0]))
        .catch(error => console.error('Error fetching elevation data:', error));
    };

    const updateElevation = (elevation) => {
      setElevation(elevation);
    };

    getLocation();

    return () => {
      if (map) map.off('click', handleMapClick);
    };

  }, []);

  const [status, setStatus] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [elevation, setElevation] = useState(0);

  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="flex-col">
        <div className="flexwindow map-window mb-4">
          <h3 className="text-xl font-semibold mb-2">Choose Location</h3>
          <div id="map" className="w-full h-64"></div>
        </div>
        <div className="window status-elevation-window mb-4">
          <p id="status">Status: {status}</p>
          <p id="elevation">Elevation: {elevation} meters</p>
          <div id="alert-container">
            <p id="alert">Alert: {alertMessage}</p>
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
  );
};

export default landQuality;
