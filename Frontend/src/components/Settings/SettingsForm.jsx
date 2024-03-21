import React from 'react';

const SettingsForm = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Environmental Dashboard Settings</h1>
      <form id="settingsForm" className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location:</label>
          <input type="text" id="location" name="location" placeholder="Enter location..." className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div className="mb-4">
          <label htmlFor="temperatureUnit" className="block text-sm font-medium text-gray-700">Temperature Unit:</label>
          <select id="temperatureUnit" name="temperatureUnit" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="celsius">Celsius</option>
            <option value="fahrenheit">Fahrenheit</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="windSpeedUnit" className="block text-sm font-medium text-gray-700">Wind Speed Unit:</label>
          <select id="windSpeedUnit" name="windSpeedUnit" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="kmh">km/h</option>
            <option value="mph">mph</option>
            <option value="ms">m/s</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="pressureUnit" className="block text-sm font-medium text-gray-700">Pressure Unit:</label>
          <select id="pressureUnit" name="pressureUnit" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="hpa">hPa</option>
            <option value="mb">mb</option>
            <option value="inHg">inHg</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="theme" className="block text-sm font-medium text-gray-700">Theme:</label>
          <select id="theme" name="theme" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div className="mb-4">
          <div className="flex items-center">
            <input type="checkbox" id="notifications" name="notifications" value="enabled" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
            <label htmlFor="notifications" className="ml-2 block text-sm text-gray-900">Receive notifications</label>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="language" className="block text-sm font-medium text-gray-700">Language:</label>
          <select id="language" name="language" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Save Settings</button>
      </form>
      <a href="javascript:history.back()" className="block mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded">Back</a>
    </div>
  );
};

export default SettingsForm;
