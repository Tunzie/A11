import React, { useState } from 'react';

const Alerts = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weatherAlert, setWeatherAlert] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);

  const places = [
    { name: 'Jerusalem', latitude: 31.7683, longitude: 35.2137 },
    { name: 'Tel Aviv', latitude: 32.0853, longitude: 34.7818 },
    { name: 'Haifa', latitude: 32.7940, longitude: 34.9896 },
    { name: 'Dead Sea', latitude: 31.4961, longitude: 35.3344 },
    { name: 'Eilat', latitude: 29.5581, longitude: 34.9482 },
    { name: 'Nazareth', latitude: 32.6996, longitude: 35.3035 },
    { name: 'Tiberias', latitude: 32.7936, longitude: 35.5322 },
    { name: 'Masada', latitude: 31.3155, longitude: 35.3536 },
    { name: 'Caesarea', latitude: 32.5093, longitude: 34.9049 },
    { name: 'Acre', latitude: 32.9273, longitude: 35.0827 },
  ];

  const handleLocationClick = async () => {
    if (!selectedPlace) {
      setWeatherAlert('Please select a place.');
      return;
    }

    const { latitude, longitude } = selectedPlace;

    // Fetch data from API
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=weather_code&hourly=weather_code&daily=weather_code&past_days=1&forecast_days=1`
      );
      const data = await response.json();

      // Check if weather code is present
      if (data.current && data.current.weather_code) {
        const weatherCode = data.current.weather_code;
        const weatherAlertMessage = getWeatherAlertMessage(weatherCode);
        setWeatherAlert(weatherAlertMessage);
        setLatitude(latitude);
        setLongitude(longitude);
      } else {
        setWeatherAlert('No weather alert available.');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherAlert('Error fetching weather data.');
    }
  };

  const getWeatherAlertMessage = (weatherCode) => {
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

    return weatherMessages[weatherCode] || 'Unknown weather code';
  };

  const handlePlaceChange = (event) => {
    const selectedName = event.target.value;
    const selected = places.find(place => place.name === selectedName);
    setSelectedPlace(selected);
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-2xl font-bold mb-4">Weather Alerts</h1>
      <div className="mb-4">
        <select
          onChange={handlePlaceChange}
          className="bg-white border border-gray-300 rounded px-4 py-2"
        >
          <option value="">Select a place</option>
          {places.map((place, index) => (
            <option key={index} value={place.name}>{place.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <button
          onClick={handleLocationClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Get Weather Alert
        </button>
      </div>
      <div className="border border-gray-300 rounded p-4">
        {latitude && longitude && (
          <p className="mb-2">Latitude: {latitude}, Longitude: {longitude}</p>
        )}
        <p className="mb-2">Weather Alert:</p>
        <p className="font-semibold">{weatherAlert}</p>
      </div>
    </div>
  );
};

export default Alerts;
