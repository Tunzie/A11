import { locationData } from '../main.js';


document.addEventListener("DOMContentLoaded", function() {
  // Fetch air quality data and create graph
  fetchAirQualityData(locationData.latitude, locationData.longitude);

  // Initialize charts
  initializeCharts();
});

// Fetch air quality data from the API
function fetchAirQualityData(latitude, longitude) {
  const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=european_aqi&hourly=european_aqi&timeformat=unixtime`;
  fetch(url)
    .then(response => response.json())
    .then(data => createGraph(data))
    .catch(err => console.log(err));
}

// Create graph using air quality data
function createGraph(data) {
  const hourlyData = data.hourly;
  const timestamps = hourlyData.time.map(timestamp => new Date(timestamp * 1000));
  const labels = timestamps.map(date => formatAMPM(date));
  const europeanAQI = hourlyData.european_aqi;

  const dataset = {
    label: 'European AQI',
    data: europeanAQI,
    borderColor: 'orange',
    fill: false
  };

  const chartData = {
    labels: labels,
    datasets: [dataset]
  };

  const options = {
    scales: {
      x: { display: true },
      y: { display: true }
    },
    plugins: { legend: { display: false } },
    layout: { padding: { top: 10, bottom: 10, left: 10, right: 10 } }
  };

  const ctx = document.getElementById("line-chart4").getContext("2d");
  const myChart = new Chart(ctx, { type: "line", data: chartData, options: options });
}

// Format time in "hh:mm am/pm"
function formatAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12 || 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return hours + ':' + minutes + ' ' + ampm;
}

// Initialize charts
function initializeCharts() {
  const data1 = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [{ data: [6.5, 5.9, 8.0, 8.1, 5.6, 5.5, 4], fill: false, borderColor: "green", tension: 0.1 }]
  };

  const data2 = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [{ data: [4, 6, 7, 5.5, 6.8, 7.2, 6], fill: false, borderColor: "blue", tension: 0.1 }]
  };

  const data3 = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [{ data: [3, 5, 6, 5.2, 4.8, 4.6, 4.2], fill: false, borderColor: "red", tension: 0.1 }]
  };

  const data4 = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [{ data: [7, 7.5, 8, 8.2, 7.8, 7.2, 7], fill: false, borderColor: "orange", tension: 0.1 }]
  };

  const options = {
    scales: { x: { display: true }, y: { display: true } },
    plugins: { legend: { display: false } },
    layout: { padding: { top: 10, bottom: 10, left: 10, right: 10 } }
  };

  const ctx1 = document.getElementById("line-chart1").getContext("2d");
  const ctx2 = document.getElementById("line-chart2").getContext("2d");
  const ctx3 = document.getElementById("line-chart3").getContext("2d");

  const myChart1 = new Chart(ctx1, { type: "line", data: data1, options: options });
  const myChart2 = new Chart(ctx2, { type: "line", data: data2, options: options });
  const myChart3 = new Chart(ctx3, { type: "line", data: data3, options: options });
}

function filterSelected(id) {
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => button.style.backgroundColor = button.id === id ? "peachpuff" : "");

  switch (id) {
    case 'button1':
      updateCharts(data1, data1, data2, data2);
      break;
    case 'button2':
      updateCharts(data3, data3, data4, data4);
      break;
    // Add cases for additional buttons if needed
  }
}

// Update chart data based on the selected dataset
function updateCharts(chartData1, chartData2, chartData3, chartData4) {
  myChart1.data = chartData1;
  myChart1.update();
  myChart2.data = chartData2;
  myChart2.update();
  myChart3.data = chartData3;
  myChart3.update();
}
