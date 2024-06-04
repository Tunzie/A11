import React from 'react';
import './Settings.css'; 

const Settings = () => {
  
  return (
    <div className="container h-screen mx-auto p-4">
      <h1 className="text-2xl text-center font-bold mb-4">Environmental Dashboard Settings</h1>
      <form id="settingsForm" className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location:</label>
          <input type="text" id="location" name="location" placeholder="Enter location..." className="input-style" />
        </div>
        <div className="mb-4">
          <label htmlFor="temperatureUnit" className="block text-sm font-medium text-gray-700">Temperature Unit:</label>
          <select id="temperatureUnit" name="temperatureUnit" className="input-style">
            <option value="celsius">Celsius</option>
            <option value="fahrenheit">Fahrenheit</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="windSpeedUnit" className="block text-sm font-medium text-gray-700">Wind Speed Unit:</label>
          <select id="windSpeedUnit" name="windSpeedUnit" className="input-style">
            <option value="kmh">km/h</option>
            <option value="mph">mph</option>
            <option value="ms">m/s</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="pressureUnit" className="block text-sm font-medium text-gray-700">Pressure Unit:</label>
          <select id="pressureUnit" name="pressureUnit" className="input-style">
            <option value="hpa">hPa</option>
            <option value="mb">mb</option>
            <option value="inHg">inHg</option>
          </select>
        </div>

        <div className="mb-4">
          <div className="flex items-center">
            <input type="checkbox" id="notifications" name="notifications" value="enabled" className="checkbox-style" />
            <label htmlFor="notifications" className="ml-2 block text-sm text-gray-900">Receive notifications</label>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="language" className="block text-sm font-medium text-gray-700">Language:</label>
          <select id="language" name="language" className="input-style">
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700">
  Save Settings
</button>
      </form>
    </div>
  );
};

export default Settings;