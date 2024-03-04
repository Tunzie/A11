import { locationData } from '../../../main.js';

const european_aqi = {
  label: 'european_aqi',
  borderColor: 'orange',
  fill: false
};

const pm2_5 = {
  label: 'pm2_5',
  borderColor: 'red',
  fill: false
};

const ozone = {
  label: 'ozone',
  borderColor: 'green',
  fill: false
};

const pm10 = {
  label: 'pm10',
  borderColor: 'blue',
  fill: false
};

let filter = "H";

function buildUrl(locationData, variable, filter) {
  let url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${locationData.latitude}&longitude=${locationData.longitude}&timeformat=unixtime`;
  switch (variable) {
    case 'AQI':
      url += `&hourly=european_aqi&timeformat=unixtime`;
      break;
    case 'PP':
      url += `&hourly=pm2_5&timeformat=unixtime`;
      break;
    case 'PM10':
      url += `&hourly=pm10&timeformat=unixtime`;
      break;
    case "O3":
      url += `&hourly=ozone&timeformat=unixtime`;
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
  }
  return url;
}


// Fetch air quality data from the API
async function fetchAirQualityData(url, dataset, elementid, filter) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    createGraph(data, dataset, elementid, filter);
  } catch (err) {
    console.log(err);
  }
}

// Create graph using air quality data
function createGraph(data, dataset, elementid, filter) {
  const hourlyData = data.hourly;
  const timestamps = hourlyData.time;
  const labels = formatTimestamps(timestamps, filter);

  const chartDataset = {
    label: dataset.label,
    data: hourlyData[dataset.label],
    borderColor: dataset.borderColor,
    fill: dataset.fill
  };

  const chartData = {
    labels: labels,
    datasets: [chartDataset]
  };

  const options = {
    scales: {
      x: { display: true },
      y: { display: true }
    },
    plugins: { legend: { display: false } },
    layout: { padding: { top: 10, bottom: 10, left: 10, right: 10 } }
  };

  const ctx = document.getElementById(elementid).getContext("2d");
  
  // Check if a Chart instance already exists
  if (window.myChart && window.myChart[elementid]) {
    window.myChart[elementid].destroy(); // Destroy existing Chart instance
  }

  window.myChart = window.myChart || {}; // Create a global object to store Chart instances
  window.myChart[elementid] = new Chart(ctx, { type: "line", data: chartData, options: options });
}


// Function to format timestamps based on filter
function formatTimestamps(timestamps, filter) {
  if (filter === "H") {
    return timestamps.map(timestamp => formatAMPM(new Date(timestamp * 1000)));
  } else if (filter === "D" || filter === "M") {
    return timestamps.map(timestamp => formatDate(new Date(timestamp * 1000)));
  }
}

// Format time in "MM/DD/YYYY"
function formatDate(date) {
  const month = date.getMonth() + 1; // Month is zero-based, so we add 1
  const day = date.getDate();
  const year = date.getFullYear();
  return month + '/' + day + '/' + year;
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

function filterSelected(id) {
  // Remove background color from all buttons
  document.getElementById("button1").style.backgroundColor = "";
  document.getElementById("button2").style.backgroundColor = "";
  document.getElementById("button3").style.backgroundColor = "";

  // Set background color to peach for the selected button
  document.getElementById(id).style.backgroundColor = "peachpuff";
  switch (id) {
    case "button1":
      filter = "H";
      break;
    case "button2":
      filter = "D";
      break;
    case "button3":
      filter = "M";
      break;
    default:
      console.error("Invalid filter button ID");
      return;
  }
  
  fetchAirQualityData(buildUrl(locationData, "PP", filter), pm2_5, "line-chart1", filter);
  fetchAirQualityData(buildUrl(locationData, "PM10", filter), pm10, "line-chart2", filter);
  fetchAirQualityData(buildUrl(locationData, "O3", filter), ozone, "line-chart3", filter);
  fetchAirQualityData(buildUrl(locationData, "AQI", filter), european_aqi, "line-chart4", filter);

}

// Toggle Accessibility
function toggleAccessibility() {
  const accessibilityToggle = document.getElementById('accessibilityButton');
  if (accessibilityToggle.checked) {
      // Accessibility is ON
      // Perform actions when Accessibility is turned ON
      console.log("Accessibility is ON");
  } else {
      // Accessibility is OFF
      // Perform actions when Accessibility is turned OFF
      console.log("Accessibility is OFF");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Set location data
  locationData.latitude = 32.0045;
  locationData.longitude = 34.78;
  document.getElementById("button1").style.backgroundColor = "peachpuff";

  // Fetch air quality data for initial load
  fetchAirQualityData(buildUrl(locationData, "PP", filter), pm2_5, "line-chart1", filter);
  fetchAirQualityData(buildUrl(locationData, "PM10", filter), pm10, "line-chart2", filter);
  fetchAirQualityData(buildUrl(locationData, "O3", filter), ozone, "line-chart3", filter);
  fetchAirQualityData(buildUrl(locationData, "AQI", filter), european_aqi, "line-chart4", filter);

  // Add event listeners to filter buttons
  document.getElementById("button1").addEventListener("click", function () {
    filterSelected("button1");
  });

  document.getElementById("button2").addEventListener("click", function () {
    filterSelected("button2");
  });

  document.getElementById("button3").addEventListener("click", function () {
    filterSelected("button3");
  });
});

