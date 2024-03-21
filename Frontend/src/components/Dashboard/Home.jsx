import React from 'react';
import { Wind, Droplet, CloudSunRain, LandPlot } from 'lucide-react';

function Home() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-blue-600 mb-2">Air Quality</h2>
        <Wind size={75} className="mx-auto mb-2" />
        <div className="text-center">
          <p className="text-gray-700">
            Current AQI: <span className="font-bold">65</span>
          </p>
          <p className="text-gray-700">
            Status: <span className="font-bold text-green-600">Good</span>
          </p>
          <p className="text-gray-700">
            Pollutants: <span className="font-bold">PM2.5, PM10</span>
          </p>
          <p className="text-gray-700">
            Health Advisory: <span className="font-bold">No health impacts</span>
          </p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="text-gray-600">
            <i className="fas fa-chart-line mr-1"></i>
            Last Updated: 10:30 AM
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-green-600 mb-2">Water Quality</h2>
        <Droplet size={75} className="mx-auto mb-2" />
        <div className="text-center">
          <p className="text-gray-700">
            pH Level: <span className="font-bold">7.2</span>
          </p>
          <p className="text-gray-700">
            Status: <span className="font-bold text-yellow-600">Moderate</span>
          </p>
          <p className="text-gray-700">
            Turbidity: <span className="font-bold">Low</span>
          </p>
          <p className="text-gray-700">
            Contaminants: <span className="font-bold">Lead, Chlorine</span>
          </p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="text-gray-600">
            <i className="fas fa-chart-line mr-1"></i>
            Last Updated: 11:45 AM
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-orange-600 mb-2">Weather Conditions</h2>
        <CloudSunRain size={75} className="mx-auto mb-2" />
        <div className="text-center">
          <p className="text-gray-700">
            Temperature: <span className="font-bold">23°C</span>
          </p>
          <p className="text-gray-700">
            Conditions: <span className="font-bold text-blue-600">Partly Cloudy</span>
          </p>
          <p className="text-gray-700">
            Wind Speed: <span className="font-bold">10 km/h</span>
          </p>
          <p className="text-gray-700">
            Humidity: <span className="font-bold">55%</span>
          </p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="text-gray-600">
            <i className="fas fa-chart-line mr-1"></i>
            Last Updated: 12:00 PM
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-brown-600 mb-2">Land Quality</h2>
        <LandPlot size={75} className="mx-auto mb-2" />
        <div className="text-center">
          <p className="text-gray-700">
            Elevation: <span className="font-bold">3500 ft</span>
          </p>
          <p className="text-gray-700">
            Status: <span className="font-bold text-red-600">High Risk</span>
          </p>
          <p className="text-gray-700">
            Soil Type: <span className="font-bold">Clay</span>
          </p>
          <p className="text-gray-700">
            Vegetation: <span className="font-bold">Sparse</span>
          </p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="text-gray-600">
            <i className="fas fa-chart-line mr-1"></i>
            Last Updated: 11:30 AM
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
