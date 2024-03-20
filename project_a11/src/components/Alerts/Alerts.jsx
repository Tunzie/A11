import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import L from 'leaflet';

// CSS
import './Alerts.css';

const Alerts = () => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    // Initialize Leaflet map
    const initMap = () => {
      const mapInstance = L.map('map').setView([32.8184, 34.9885], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance);

      mapInstance.on('click', onMapClick);

      setMap(mapInstance);
    };

    initMap();

    return () => {
      if (map) {
        map.off('click', onMapClick);
      }
    };
  }, []);

  const onMapClick = (e) => {
    if (marker) {
      map.removeLayer(marker);
    }

    const newMarker = L.marker(e.latlng).addTo(map);
    setMarker(newMarker);

    fetchWeatherData(e.latlng.lat, e.latlng.lng, e.latlng.toString());
  };

  const fetchWeatherData = (latitude, longitude, locationName) => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=weather_code&hourly=weather_code&daily=weather_code&past_days=1&forecast_days=1`
    )
      .then((response) => response.json())
      .then((data) => {
        const currentWeatherCode = data.current.weather_code;

        const weatherMessages = {
          0: 'Clear sky',
          1: 'Mainly clear',
          2: 'Partly cloudy',
          3: 'Overcast',
          45: 'Fog',
          48: 'Depositing rime fog',
          51: 'Drizzle (Light)',
          53: 'Drizzle (Moderate)',
          55: 'Drizzle (Dense)',
          56: 'Freezing Drizzle (Light)',
          57: 'Freezing Drizzle (Dense)',
          61: 'Rain (Slight)',
          63: 'Rain (Moderate)',
          65: 'Rain (Heavy)',
          66: 'Freezing Rain (Light)',
          67: 'Freezing Rain (Heavy)',
          71: 'Snowfall (Slight)',
          73: 'Snowfall (Moderate)',
          75: 'Snowfall (Heavy)',
          77: 'Snow grains',
          80: 'Rain showers (Slight)',
          81: 'Rain showers (Moderate)',
          82: 'Rain showers (Violent)',
          85: 'Snow showers (Slight)',
          86: 'Snow showers (Heavy)',
          95: 'Thunderstorm (Slight)',
          96: 'Thunderstorm with hail (Slight)',
          99: 'Thunderstorm with hail (Heavy)',
        };

        const alertsContainer = document.getElementById('alertsContainer');
        alertsContainer.innerHTML = '';

        if (weatherMessages[currentWeatherCode]) {
          const alertDiv = document.createElement('div');
          alertDiv.classList.add('alert', 'bg-white', 'rounded-lg', 'shadow');

          let iconClass = '';
          if (currentWeatherCode >= 0 && currentWeatherCode <= 3) {
            iconClass = 'fas fa-sun';
          } else if (currentWeatherCode >= 45 && currentWeatherCode <= 67) {
            iconClass = 'fas fa-cloud-rain';
          } else if (currentWeatherCode >= 71 && currentWeatherCode <= 86) {
            iconClass = 'fas fa-snowflake';
          } else if (currentWeatherCode >= 95 && currentWeatherCode <= 99) {
            iconClass = 'fas fa-bolt';
          } else {
            iconClass = 'fas fa-exclamation-triangle';
          }

          alertDiv.innerHTML = `
            <div class="flex items-center p-4">
              <i class="icon ${iconClass} text-2xl"></i>
              <div>
                <h2 class="message">${weatherMessages[currentWeatherCode]}</h2>
                <p class="code">Current weather code: ${currentWeatherCode}</p>
                <p class="location">Location: ${locationName}</p>
              </div>
            </div>
          `;

          alertsContainer.appendChild(alertDiv);

          checkWeatherConditions(weatherMessages[currentWeatherCode]);
        } else {
          console.error('Weather code not found:', currentWeatherCode);
        }
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  };

  const checkWeatherConditions = (weatherMessage) => {
    const conditionsToShowAlert = [
      'Rain (Slight)',
      'Rain (Moderate)',
      'Rain (Heavy)',
      'Thunderstorm (Slight)',
      'Thunderstorm with hail (Slight)',
      'Thunderstorm with hail (Heavy)',
    ];

    if (conditionsToShowAlert.includes(weatherMessage)) {
      alert('Alert: ' + weatherMessage);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Weather Alerts</h1>

      <div id="map" className="mb-6"></div>

      <div id="alertsContainer"></div>

      <Link
        to="/"
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded inline-block"
      >
        Back
      </Link>
    </div>
  );
};

export default Alerts;
