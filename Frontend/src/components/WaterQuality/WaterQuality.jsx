import React, { useEffect, useState, useRef } from "react";
import L from "leaflet"; // Importing Leaflet library for map
import "./WaterQuality.css";
import "leaflet/dist/leaflet.css";
import { Chart } from "chart.js/auto"; // Importing Chart.js library for charts
import DatePicker from "react-datepicker"; // Importing DatePicker component
import "react-datepicker/dist/react-datepicker.css";

const WaterQuality = () => {
  const mapRef = useRef(null); // Reference to the map DOM element
  const chartRef = useRef(null); // Reference to the chart DOM element
  const [map, setMap] = useState(null); // State for storing the map instance
  const [currentLat, setCurrentLat] = useState(null); // State for storing current latitude
  const [currentLng, setCurrentLng] = useState(null); // State for storing current longitude
  const markersRef = useRef([]); // Reference to store map markers
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 30))
  ); 
  // State for start date of data range
  const [endDate, setEndDate] = useState(new Date()); // State for end date of data range
  const [status, setStatus] = useState(""); // State for water status
  const [alertMessage, setAlertMessage] = useState(""); // State for alert message
  const [locationName, setLocationName] = useState(""); // State for location name

  // Effect to initialize the map and get user location
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

  // Effect to handle map clicks
  useEffect(() => {
    if (map) {
      map.on("click", handleMapClick);
    }
  }, [map]);

  // Handler for map click events
  const handleMapClick = (e) => {
    const clickedLocation = e.latlng;
    setCurrentLat(clickedLocation.lat);
    setCurrentLng(clickedLocation.lng);
    // Remove existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];
    // Add new marker
    const newMarker = L.marker(clickedLocation).addTo(map);
    markersRef.current.push(newMarker);
    // Fetch flood data and location name for the clicked location
    fetchFloodData(
      clickedLocation.lat,
      clickedLocation.lng,
      startDate,
      endDate
    );
    fetchLocationName(clickedLocation.lat, clickedLocation.lng);
  };

  // Function to fetch location name from coordinates
  const fetchLocationName = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      setLocationName(data.display_name);
    } catch (error) {
      console.error("Error fetching location name:", error);
      setLocationName("Unknown Location");
    }
  };

  // Handler for changing start date
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  // Handler for changing end date
  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  // Function to fetch flood data from API
  const fetchFloodData = async (latitude, longitude, startDate, endDate) => {
    try {
      const formattedStartDate = startDate.toISOString().split("T")[0];
      const formattedEndDate = endDate.toISOString().split("T")[0];
      const url = `https://flood-api.open-meteo.com/v1/flood?latitude=${latitude}&longitude=${longitude}&daily=river_discharge,river_discharge_mean&start_date=${formattedStartDate}&end_date=${formattedEndDate}`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        const { time, river_discharge, river_discharge_mean } = data.daily;
        // Update chart with the fetched data
        updateChart(
          chartRef.current,
          time,
          river_discharge,
          river_discharge_mean
        );
        // Update status and alert message based on discharge values
        updateStatusAndAlert(river_discharge[0], river_discharge_mean[0]);
      } else {
        throw new Error("Failed to fetch flood data");
      }
    } catch (error) {
      console.error("Error fetching flood data:", error);
      alert("Error fetching flood data. Please try again.");
    }
  };

  // Function to update status and alert message
  const updateStatusAndAlert = (riverDischarge, riverDischargeMean) => {
    if (riverDischarge > 100 && riverDischargeMean > 50) {
      setStatus("High Discharge");
      setAlertMessage("Alert: Potential flooding risk!");
    } else {
      setStatus("Normal Discharge");
      setAlertMessage("No immediate risk detected.");
    }
  };

  // Function to update or create the chart
  const updateChart = (
    chartCanvas,
    labels,
    riverDischarge,
    riverDischargeMean
  ) => {
    if (!chartCanvas) return;
    const chartInstance = Chart.getChart(chartCanvas);
    if (chartInstance) {
      // Update existing chart data
      chartInstance.data.labels = labels;
      chartInstance.data.datasets[0].data = riverDischarge;
      chartInstance.data.datasets[1].data = riverDischargeMean;
      chartInstance.update();
    } else {
      // Create a new chart
      new Chart(chartCanvas, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "River Discharge",
              data: riverDischarge,
              fill: true, // Enable area under the line to be filled
              backgroundColor: "rgba(54, 162, 235, 0.5)", // Semi-transparent fill color
              borderColor: "rgb(54, 162, 235)",
              tension: 0.1,
            },
            {
              label: "Mean River Discharge",
              data: riverDischargeMean,
              fill: true,
              backgroundColor: "rgba(255, 99, 132, 0.5)", // Semi-transparent fill color
              borderColor: "rgb(255, 99, 132)",
              tension: 0.1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  };

  return (
    <div className="flood-data-container">
      <div className="map-container">
        <div
          id="map"
          style={{ height: "38vh", width: "100%" }}
          ref={mapRef}
        ></div>
      </div>
      <div className="data-container">
        <div className="date-status-alert-index-container">
          <div className="status-alert-container">
            <div className="location-box">
              <p id="locationName">
                <span role="img" aria-label="Location">
                  📍
                </span>
                Location: {locationName}
              </p>
            </div>
            <div className="status-box">
              <p id="status">
                <span role="img" aria-label="Discharge">
                  🌊
                </span>
                Status: {status}
              </p>
            </div>
            <div className="alert-box">
              <p id="alert">
                <span role="img" aria-label="Alert">
                  {alertMessage.startsWith("Alert:") ? "🚨" : "🔍"}
                </span>
                Alert: {alertMessage}
              </p>
            </div>
          </div>

          <div className="date-selection-container">
            <label htmlFor="start-date-picker">Choose time period:</label>
            <label htmlFor="start-date-picker">Start Date:</label>
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              maxDate={new Date()}
              dateFormat="dd/MM/yyyy"
            />
            <label htmlFor="start-date-picker">End Date:</label>
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              maxDate={new Date()}
              dateFormat="dd/MM/yyyy"
            />
            <button
              className="update-charts-btn"
              onClick={() =>
                fetchFloodData(currentLat, currentLng, startDate, endDate)
              }
            >
              Update Data
            </button>
          </div>

          <div className="chartIndex-window">
            <h4 className="chart-index-title">Chart Index</h4>
            <ul>
              <li>
                <span role="img" aria-label="Water drop">
                  💧
                </span>
                River Discharge: Measured in cubic meters per second (m³/s).
                This represents the volume of water flowing through a river per
                unit of time.
              </li>
              <li>
                <span role="img" aria-label="Average">
                  📊
                </span>
                Mean River Discharge: Indicates the average discharge, helping
                to identify trends or deviations from typical water flow
                patterns.
              </li>
              <li>
                <span role="img" aria-label="Warning">
                  ⚠️
                </span>
                High Discharge Alert: Levels above 100 m³/s might indicate
                potential flooding. It's a crucial indicator for safety and
                preparedness.
              </li>
              <li>
                <span role="img" aria-label="Low level">
                  🔻
                </span>
                Low Discharge: Significantly low levels can suggest drought
                conditions, affecting water supply and ecosystem health.
              </li>
            </ul>
          </div>
        </div>

        <div className="chart-container">
          <canvas ref={chartRef} width="400" height="100"></canvas>
        </div>
      </div>
    </div>
  );
};

export default WaterQuality;
