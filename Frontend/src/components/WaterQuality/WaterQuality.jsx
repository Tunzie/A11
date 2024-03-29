import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import './WaterQuality.css';
import 'leaflet/dist/leaflet.css';
import { Chart } from 'chart.js/auto';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const WaterQuality = () => {
    const mapRef = useRef(null);
    const chartRef = useRef(null);
    const [map, setMap] = useState(null);
    const [currentLat, setCurrentLat] = useState(null);
    const [currentLng, setCurrentLng] = useState(null);
    const markersRef = useRef([]);
    const [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 30)));
    const [endDate, setEndDate] = useState(new Date());
    const [status, setStatus] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [locationName, setLocationName] = useState('');

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
        fetchFloodData(clickedLocation.lat, clickedLocation.lng, startDate, endDate);
        fetchLocationName(clickedLocation.lat, clickedLocation.lng);
    };

    const fetchLocationName = async (lat, lng) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
            const data = await response.json();
            setLocationName(data.display_name);
        } catch (error) {
            console.error('Error fetching location name:', error);
            setLocationName('Unknown Location');
        }
    };



    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const fetchFloodData = async (latitude, longitude, startDate, endDate) => {
        try {
            const formattedStartDate = startDate.toISOString().split('T')[0];
            const formattedEndDate = endDate.toISOString().split('T')[0];
            const url = `https://flood-api.open-meteo.com/v1/flood?latitude=${latitude}&longitude=${longitude}&daily=river_discharge,river_discharge_mean&start_date=${formattedStartDate}&end_date=${formattedEndDate}`;
            const response = await fetch(url);
            const data = await response.json();

            if (response.ok) {
                const { time, river_discharge, river_discharge_mean } = data.daily;
                updateChart(chartRef.current, time, river_discharge, river_discharge_mean);
                updateStatusAndAlert(river_discharge[0], river_discharge_mean[0]);
            } else {
                throw new Error('Failed to fetch flood data');
            }
        } catch (error) {
            console.error('Error fetching flood data:', error);
            alert('Error fetching flood data. Please try again.');
        }
    };

    const updateStatusAndAlert = (riverDischarge, riverDischargeMean) => {
        if (riverDischarge > 100 && riverDischargeMean > 50) {
            setStatus('High Discharge');
            setAlertMessage('Alert: Potential flooding risk!');
        } else {
            setStatus('Normal Discharge');
            setAlertMessage('No immediate risk detected.');
        }
    };


    const updateChart = (chartCanvas, labels, riverDischarge, riverDischargeMean) => {
        if (!chartCanvas) return;
        const chartInstance = Chart.getChart(chartCanvas);
        if (chartInstance) {
            chartInstance.data.labels = labels;
            chartInstance.data.datasets[0].data = riverDischarge;
            chartInstance.data.datasets[1].data = riverDischargeMean;
            chartInstance.update();
        } else {
            new Chart(chartCanvas, {
                type: 'line',
                data: {
                    labels,
                    datasets: [{
                        label: 'River Discharge',
                        data: riverDischarge,
                        fill: true, // This enables the area under the line to be filled
                        backgroundColor: 'rgba(54, 162, 235, 0.5)', // Semi-transparent fill color
                        borderColor: 'rgb(54, 162, 235)',
                        tension: 0.1,
                    }, {
                        label: 'Mean River Discharge',
                        data: riverDischargeMean,
                        fill: true,
                        backgroundColor: 'rgba(255, 99, 132, 0.5)', // Semi-transparent fill color
                        borderColor: 'rgb(255, 99, 132)',
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
        <div className="flood-data-container">
            <div className="map-container">
                <div id="map" style={{ height: '38vh', width: '100%' }} ref={mapRef}></div>
            </div>
            <div className="data-container">
                <div className="date-status-alert-index-container">

                    <div className="status-alert-container">
                        <p id="locationName">
                            <span role="img" aria-label="Location">📍</span>
                            Location: {locationName}
                        </p>
                        <p id="status">
                            <span role="img" aria-label="Discharge">🌊</span> {/* Wave symbol to represent water flow or discharge */}
                            State: {status}
                        </p>
                        <p id="alert">
                            <span role="img" aria-label="Alert">{alertMessage.startsWith("Alert:") ? "🚨" : "🔍"}</span> {/* Alarm symbol for alerts and magnifying glass for normal checks */}
                            {alertMessage}
                        </p>
                    </div>

                    <div className="date-selection-container">
                        <DatePicker
                            selected={startDate}
                            onChange={handleStartDateChange}
                            maxDate={new Date()}
                            dateFormat="dd/MM/yyyy"
                        />
                        <DatePicker
                            selected={endDate}
                            onChange={handleEndDateChange}
                            maxDate={new Date()}
                            dateFormat="dd/MM/yyyy"
                        />
                        <button className="update-charts-btn" onClick={() => fetchFloodData(currentLat, currentLng, startDate, endDate)}>
                            Update Data
                        </button>
                    </div>


                    <div className="chartIndex-window">
                        <h4 className="chart-index-title">Chart Index</h4>
                        <ul>
                            <li>
                                <span role="img" aria-label="Water drop">💧</span>
                                River Discharge: Measured in cubic meters per second (m³/s). This represents the volume of water flowing through a river per unit of time.
                            </li>
                            <li>
                                <span role="img" aria-label="Average">📊</span>
                                Mean River Discharge: Indicates the average discharge, helping to identify trends or deviations from typical water flow patterns.
                            </li>
                            <li>
                                <span role="img" aria-label="Warning">⚠️</span>
                                High Discharge Alert: Levels above 100 m³/s might indicate potential flooding. It's a crucial indicator for safety and preparedness.
                            </li>
                            <li>
                                <span role="img" aria-label="Low level">🔻</span>
                                Low Discharge: Significantly low levels can suggest drought conditions, affecting water supply and ecosystem health.
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
