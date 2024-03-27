import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import './LandQuality.css';
import 'leaflet/dist/leaflet.css';
import { Chart } from 'chart.js/auto';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const LandQuality = () => {
  const mapRef = useRef(null);
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [status, setStatus] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [elevation, setElevation] = useState(0);
  const [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 30))); // Default to 30 days back
  const [endDate, setEndDate] = useState(new Date()); // Default to today
  const [currentLat, setCurrentLat] = useState(null);
  const [currentLng, setCurrentLng] = useState(null);
  const markersRef = useRef([]);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const userLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
            const newMap = L.map(mapRef.current).setView([userLocation.lat, userLocation.lng], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(newMap);
            setMap(newMap);
          },
          () => alert('Error: The Geolocation service failed.')
        );
      } else {
        alert('Error: Your browser doesn\'t support geolocation.');
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    if (map) {
      map.on('click', handleMapClick);
    }
  }, [map]);

  const handleMapClick = e => {
    const clickedLocation = e.latlng;
    setCurrentLat(clickedLocation.lat);
    setCurrentLng(clickedLocation.lng);
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
    const newMarker = L.marker(clickedLocation).addTo(map);
    markersRef.current.push(newMarker);
    fetchSoilDataAndUpdateCharts(clickedLocation.lat, clickedLocation.lng);
    fetchElevationData(clickedLocation.lat, clickedLocation.lng);
  };

  const handleUpdateCharts = () => {
    if (currentLat && currentLng) {
      UpdateChartsByDate(currentLat, currentLng, startDate, endDate);
    } else {
      alert('Please select a location on the map first.');
    }
  };

  const fetchSoilDataAndUpdateCharts = async (latitude, longitude) => {
    try {
      const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=2024-03-01&end_date=2024-03-02&hourly=soil_temperature_0_to_7cm,soil_moisture_0_to_7cm`;
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        const { time, soil_temperature_0_to_7cm, soil_moisture_0_to_7cm } = data.hourly;
        updateCharts(chartRef1.current, time, soil_temperature_0_to_7cm, 'Soil Temperature');
        updateCharts(chartRef2.current, time, soil_moisture_0_to_7cm, 'Soil Moisture');
        const averageTemperature = calculateAverage(soil_temperature_0_to_7cm);
        const averageMoisture = calculateAverage(soil_moisture_0_to_7cm);
        updateStatus(averageTemperature, averageMoisture);
      } else {
        throw new Error('Failed to fetch soil data');
      }
    } catch (error) {
      console.error('Error fetching soil data:', error);
      alert('Error fetching soil data. Please try again.');
    }
  };

  const fetchElevationData = async (latitude, longitude) => {
    try {
      const response = await fetch(`https://api.open-meteo.com/v1/elevation?latitude=${latitude}&longitude=${longitude}`);
      const data = await response.json();
      if (response.ok && data.elevation) {
        setElevation(data.elevation);
      } else {
        throw new Error('Elevation data not found');
      }
    } catch (error) {
      console.error('Error fetching elevation data:', error);
      // Handle error (e.g., show alert or update status)
    }
  };

  const calculateAverage = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

  const updateStatus = (averageTemperature, averageMoisture) => {
    let status = '';
    let alertMessage = '';
    if (averageTemperature > 30 && averageMoisture > 0.6) {
      status = 'Excellent Land Quality';
      alertMessage = 'No action needed. The soil conditions are ideal for plant growth.';
    } else if (averageTemperature >= 25 && averageTemperature <= 30 && averageMoisture >= 0.4 && averageMoisture <= 0.6) {
      status = 'Good Land Quality';
      alertMessage = 'Land conditions are suitable for most crops. Keep monitoring for optimal growth.';
    } else if (averageTemperature >= 20 && averageTemperature < 25 && averageMoisture >= 0.3 && averageMoisture < 0.4) {
      status = 'Fair Land Quality';
      alertMessage = 'Soil conditions are decent, but some crops may require additional watering.';
    } else if (averageTemperature < 20 && averageMoisture < 0.3) {
      status = 'Poor Land Quality';
      alertMessage = 'Attention required. Soil conditions are not suitable for most crops.';
    } else {
      status = 'Moderate Land Quality';
      alertMessage = 'Soil conditions are average. Keep monitoring for any changes.';
    }
    setStatus(status);
    setAlertMessage(alertMessage);
  };


  const handleStartDateChange = (date) => {
    if (date > endDate)
      alert("Start date cannot be after end date.");
    else
      setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    if (startDate > date)
      alert("End date cannot be before start date.");
    else
      setEndDate(date);
  };

  const UpdateChartsByDate = async (latitude, longitude, startDate, endDate) => {
    try {
      // Format the start and end dates in 'YYYY-MM-DD' format
      const formattedStartDate = startDate.toISOString().split('T')[0];
      const formattedEndDate = endDate.toISOString().split('T')[0];
      const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${formattedStartDate}&end_date=${formattedEndDate}&hourly=soil_temperature_0_to_7cm,soil_moisture_0_to_7cm`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        const { time, soil_temperature_0_to_7cm, soil_moisture_0_to_7cm } = data.hourly;
        updateCharts(chartRef1.current, time, soil_temperature_0_to_7cm, 'Soil Temperature');
        updateCharts(chartRef2.current, time, soil_moisture_0_to_7cm, 'Soil Moisture');

        const averageTemperature = calculateAverage(soil_temperature_0_to_7cm);
        const averageMoisture = calculateAverage(soil_moisture_0_to_7cm);

        updateStatus(averageTemperature, averageMoisture);
      } else {
        throw new Error('Failed to fetch soil data');
      }
    } catch (error) {
      console.error('Error fetching soil data:', error);
      alert('Error fetching soil data. Please try again.');
    }
  };


  const updateCharts = (chartCanvas, labels, data, label) => {
    if (!chartCanvas) return;

    const chartInstance = Chart.getChart(chartCanvas); // Get the existing chart instance
    if (chartInstance) {
      chartInstance.data.labels = labels;
      chartInstance.data.datasets[0].data = data;
      chartInstance.update();
    } else {
      new Chart(chartCanvas, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: label,
            data: data,
            fill: false,
            borderColor: label === 'Soil Temperature' ? 'rgb(54, 162, 235)' : 'rgb(255, 99, 132)',
            tension: 0.1,
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          },
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }
  };

  return (
    <div className="flex">
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="flex-col">
          <div className="flexwindow map-window mb-4">
            <h3 className="text-xl font-semibold mb-2">Choose Location:</h3>
            <div id="map" style={{ height: '40vh', width: '100%' }} ref={mapRef}></div>
          </div>
          <div className="window status-elevation-window mb-4">
            <div className="status-item">
              <span role="img" aria-label="Status" className="status-icon">📊</span>
              <p id="status">Status: {status}</p>
            </div>
            <div className="status-item">
              <span role="img" aria-label="Elevation" className="status-icon">⛰️</span>
              <p id="elevation">Elevation: {elevation} meters</p>
            </div>
            <div className="status-item">
              <span role="img" aria-label="Alert" className="status-icon">🚨</span>
              <p id="alert">Alert: {alertMessage}</p>
            </div>
          </div>
          <div className="window date-selection-window mb-4">
            <h4 className="date-selection-title">Choose Chart Period:</h4>
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              maxDate={new Date(new Date().setDate(new Date().getDate() - 1))}
              dateFormat="dd/MM/yyyy"
            />
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              maxDate={new Date() - 1}
              dateFormat="dd/MM/yyyy"
            />
            <button onClick={handleUpdateCharts} className="update-charts-btn">Update Charts</button>
          </div>
          <div className="window chart-index-window mb-4">
            <h4 className="chart-index-title">Chart Index</h4>
            <div className="chart-index-item">
              <span role="img" aria-label="Temperature" className="chart-index-icon">🌡️</span>
              <p>Temperature: Measured in °C</p>
            </div>
            <div className="chart-index-item">
              <span role="img" aria-label="Soil Moisture" className="chart-index-icon">💧</span>
              <p>Soil Moisture: unit weight (N/m<sup>3</sup>)</p>
            </div>
          </div>
        </div>
     
        <div className="flex-col">
          <div className="window charts-window mb-4">
            <div className="chart-container">
              <canvas ref={chartRef1} width="400" height="200"></canvas>
            </div>
          </div>

          <div className="window charts-window mb-4">
            <div className="chart-container">
              <canvas ref={chartRef2} width="400" height="200"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandQuality;
