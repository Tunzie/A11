import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./AirQuality.css";
import { Wind } from "lucide-react";

const AirQuality = () => {
  // State variables
  const [filter, setFilter] = useState("H"); // Default filter set to "H" (hourly)
  const mapRef = useRef(null); // Reference for the map container
  const [map, setMap] = useState(null); // State to store the map instance
  const [marker, setMarker] = useState(null); // State to store the marker instance
  const [currentLat, setCurrentLat] = useState(null); // State to store the current latitude
  const [currentLng, setCurrentLng] = useState(null); // State to store the current longitude
  const markersRef = useRef([]); // Reference to store markers on the map
  const [lastEuropeanAQI, setLastEuropeanAQI] = useState(null); // State to store the last European AQI value
  const [lastTime, setLastTime] = useState(null); // State to store the last updated time
  const [status, setStatus] = useState(null); // State to store the status of air quality

  // Data for location
  const locationData = {
    latitude: currentLat,
    longitude: currentLng,
  };

  // Datasets for different air quality metrics
  const european_aqi = {
    label: "european_aqi",
    borderColor: "orange",
    fill: false,
  };

  const pm2_5 = {
    label: "pm2_5",
    borderColor: "red",
    fill: false,
  };

  const ozone = {
    label: "ozone",
    borderColor: "green",
    fill: false,
  };

  const pm10 = {
    label: "pm10",
    borderColor: "blue",
    fill: false,
  };

  // Function to determine air quality status based on AQI
  const getStatus = (aqi) => {
    if (aqi >= 0 && aqi <= 20) {
      return "Good";
    } else if (aqi > 20 && aqi <= 40) {
      return "Fair";
    } else if (aqi > 40 && aqi <= 60) {
      return "Moderate";
    } else if (aqi > 60 && aqi <= 80) {
      return "Poor";
    } else if (aqi > 80 && aqi <= 100) {
      return "Very Poor";
    } else {
      return "Extremely Poor";
    }
  };

  // Function to determine status color based on air quality status
  const getStatusColor = (status) => {
    switch (status) {
      case "Good":
        return "text-cyan-600";
      case "Fair":
        return "text-green-600";
      case "Moderate":
        return "text-yellow-600";
      case "Poor":
        return "text-red-600";
      case "Very Poor":
        return "text-red-900";
      case "Extremely Poor":
        return "text-purple-600";
      default:
        return "text-gray-600";
    }
  };

  // Function to determine health advisory based on air quality status
  const getStatusInst = (status) => {
    switch (status) {
      case "Good":
        return "The air quality is ideal for most individuals; enjoy your normal outdoor activities.";
      case "Fair":
        return "The air quality is generally acceptable for most individuals. However, sensitive groups may experience minor to moderate symptoms from long-term exposure.";
      case "Moderate":
        return "The air has reached a high level of pollution and is unhealthy for sensitive groups. Reduce time spent outside if you are feeling symptoms such as difficulty breathing or throat irritation.";
      case "Poor":
        return "Health effects can be immediately felt by sensitive groups. Healthy individuals may experience difficulty breathing and throat irritation with prolonged exposure. Limit outdoor activity.";
      case "Very Poor":
        return "Health effects will be immediately felt by sensitive groups and should avoid outdoor activity. Healthy individuals are likely to experience difficulty breathing and throat irritation; consider staying indoors and rescheduling outdoor activities.";
      case "Extremely Poor":
        return "Any exposure to the air, even for a few minutes, can lead to serious health effects on everybody. Avoid outdoor activities.";
    }
  };

  // Function to build the API URL based on selected variable and filter
  const buildUrl = (variable) => {
    let url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${locationData.latitude}&longitude=${locationData.longitude}&timeformat=unixtime`;
    switch (variable) {
      case "AQI":
        url += `&hourly=european_aqi&timeformat=unixtime`;
        break;
      case "PP":
        url += `&hourly=pm2_5&timeformat=unixtime`;
        break;
      case "PM10":
        url += `&hourly=pm10&timeformat=unixtime`;
        break;
      case "O3":
        url += `&hourly=ozone&timeformat=unixtime`;
        break;
      default:
        break;
    }

    switch (filter) {
      case "H":
        url += `&past_days=0`;
        break;
      case "D":
        url += `&past_days=7`;
        break;
      case "M":
        url += `&past_days=92`;
        break;
      default:
        break;
    }
    return url;
  };

  // Function to fetch air quality data and update the chart
  const fetchAirQualityData = async (url, dataset, elementid) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      createGraph(data, dataset, elementid);
      // Extract and return the last European AQI value
      setLastEuropeanAQI(
        data.hourly.european_aqi[data.hourly.european_aqi.length - 1]
      );
      const newStatus = getStatus(
        data.hourly.european_aqi[data.hourly.european_aqi.length - 1]
      );
      setStatus(newStatus);
      const timestamp = data.hourly.time[data.hourly.time.length - 1];
      setLastTime(formatAMPM(new Date(timestamp * 1000)));
    } catch (err) {
      console.log(err);
    }
  };

  // Function to create and display the chart using Chart.js
  const createGraph = (data, dataset, elementid) => {
    const hourlyData = data.hourly;
    const timestamps = hourlyData.time;
    const labels = formatTimestamps(timestamps);

    const chartDataset = {
      label: dataset.label,
      data: hourlyData[dataset.label],
      borderColor: dataset.borderColor,
      fill: dataset.fill,
    };

    const chartData = {
      labels: labels,
      datasets: [chartDataset],
    };

    const options = {
      scales: {
        x: { display: true },
        y: { display: true },
      },
      plugins: { legend: { display: false } },
      layout: { padding: { top: 10, bottom: 10, left: 10, right: 10 } },
    };

    const ctx = document.getElementById(elementid).getContext("2d");

    // Destroy the previous chart instance if it exists
    if (window.myChart && window.myChart[elementid]) {
      window.myChart[elementid].destroy();
    }

    // Create a new chart instance
    window.myChart = window.myChart || {};
    window.myChart[elementid] = new Chart(ctx, {
      type: "line",
      data: chartData,
      options: options,
    });
  };

  // Function to format timestamps based on the selected filter
  const formatTimestamps = (timestamps) => {
    if (filter === "H") {
      return timestamps.map((timestamp) =>
        formatAMPM(new Date(timestamp * 1000))
      );
    } else if (filter === "D" || filter === "M") {
      return timestamps.map((timestamp) =>
        formatDate(new Date(timestamp * 1000))
      );
    }
  };

  // Function to format a date object to MM/DD/YYYY
  const formatDate = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return month + "/" + day + "/" + year;
  };

  // Function to format a date object to hh:mm am/pm
  const formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return hours + ":" + minutes + " " + ampm;
  };

  // Fetch air quality data when component mounts or filter/location changes
  useEffect(() => {
    fetchAirQualityData(buildUrl("PP"), pm2_5, "line-chart1");
    fetchAirQualityData(buildUrl("PM10"), pm10, "line-chart2");
    fetchAirQualityData(buildUrl("O3"), ozone, "line-chart3");
    fetchAirQualityData(buildUrl("AQI"), european_aqi, "line-chart4");
  }, [filter, locationData]);

  // Update the filter when a new filter is selected
  const filterSelected = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  // Initialize the map and set user's location
  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            const newMap = L.map(mapRef.current).setView(
              [userLocation.lat, userLocation.lng],
              13
            );
            L.tileLayer(
              "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            ).addTo(newMap);
            setMap(newMap);
          },
          () => alert("Error: The Geolocation service failed.")
        );
      } else {
        alert("Error: Your browser doesn't support geolocation.");
      }
    };

    getLocation();
  }, []);

  // Add click event listener to the map
  useEffect(() => {
    if (map) {
      map.on("click", handleMapClick);
    }
  }, [map]);

  // Handle map click to set new marker and fetch data for the clicked location
  const handleMapClick = (e) => {
    const clickedLocation = e.latlng;
    setCurrentLat(clickedLocation.lat);
    setCurrentLng(clickedLocation.lng);
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];
    const newMarker = L.marker(clickedLocation).addTo(map);
    markersRef.current.push(newMarker);
    fetchSoilDataAndUpdateCharts(clickedLocation.lat, clickedLocation.lng);
    fetchElevationData(clickedLocation.lat, clickedLocation.lng);
  };

  return (
    <div className="flex  ">
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flexwindow map-window mb-4 bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Choose Location:</h3>
          <div
            id="map"
            style={{ height: "40vh", width: "100%" }}
            ref={mapRef}
          ></div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">
            Air Quality
          </h2>
          <Wind size={75} className="mx-auto mb-2" />
          <div className="text-center">
            <p className="text-gray-700">
              Current AQI: <span className="font-bold">{lastEuropeanAQI}</span>
            </p>
            <p className="text-gray-700">
              Status:{" "}
              <span className={`font-bold ${getStatusColor(status)}`}>
                {status}
              </span>
            </p>
            <p className="text-gray-700">
              Health Advisory:{" "}
              <span className="font-bold">{getStatusInst(status)}</span>
            </p>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="text-gray-600">
              <i className="fas fa-chart-line mr-1"></i>
              Last Updated: {lastTime}
            </div>
          </div>
        </div>
        <div>
          <button
            className="rounded-full text-xl px-1 py-1 mx-1 w-12 h-12"
            style={{ backgroundColor: filter === "H" ? "peachpuff" : "" }}
            onClick={() => filterSelected("H")}
          >
            {" "}
            H
          </button>
          <button
            className="rounded-full text-xl px-1 py-1 mx-1 w-12 h-12"
            style={{ backgroundColor: filter === "D" ? "peachpuff" : "" }}
            onClick={() => filterSelected("D")}
          >
            D
          </button>
          <button
            className="rounded-full text-xl px-1 py-1 mx-1 w-12 h-12"
            style={{ backgroundColor: filter === "M" ? "peachpuff" : "" }}
            onClick={() => filterSelected("M")}
          >
            {" "}
            M
          </button>
          <div className="window charts-window mb-4">
            <h1 className="">Air Quality Score</h1>
            <canvas id="line-chart4"></canvas>
            <h1>Partical Pollution</h1>
            <canvas id="line-chart1"></canvas>
          </div>
        </div>
        <div className="window charts-window mb-4 mt-20">
          <h1>O₃</h1>
          <canvas id="line-chart2"></canvas>
          <h1>PM₁₀</h1>
          <canvas id="line-chart3"></canvas>
        </div>
      </div>
    </div>
  );
};

export default AirQuality;
