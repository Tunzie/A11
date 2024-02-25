var myChart1, myChart2, myChart3, myChart4, data1, data2, data3, data4;
document.addEventListener("DOMContentLoaded", function() {
  // Data for each chart
  data1 = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        data: [6.5, 5.9, 8.0, 8.1, 5.6, 5.5, 4],
        fill: false,
        borderColor: "green",
        tension: 0.1,
      },
    ],
  };

  data2 = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        data: [4, 6, 7, 5.5, 6.8, 7.2, 6],
        fill: false,
        borderColor: "blue",
        tension: 0.1,
      },
    ],
  };

  data3 = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        data: [3, 5, 6, 5.2, 4.8, 4.6, 4.2],
        fill: false,
        borderColor: "red",
        tension: 0.1,
      },
    ],
  };

  data4 = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        data: [7, 7.5, 8, 8.2, 7.8, 7.2, 7],
        fill: false,
        borderColor: "orange",
        tension: 0.1,
      },
    ],
  };

  // Configuration options for the chart
  var options = {
    scales: {
      x: {
        display: true, // Hide x-axis
      },
      y: {
        display: true, // Hide y-axis
      },
    },
    plugins: {
      legend: {
        display: false, // Hide legend
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      },
    },
  };

  // Get the context of the canvas elements we want to select
  var ctx1 = document.getElementById("line-chart1").getContext("2d");
  var ctx2 = document.getElementById("line-chart2").getContext("2d");
  var ctx3 = document.getElementById("line-chart3").getContext("2d");
  var ctx4 = document.getElementById("line-chart4").getContext("2d");

  // Create the line charts with respective data
  myChart1 = new Chart(ctx1, {
    type: "line",
    data: data1,
    options: options,
  });

  myChart2 = new Chart(ctx2, {
    type: "line",
    data: data2,
    options: options,
  });

  myChart3 = new Chart(ctx3, {
    type: "line",
    data: data3,
    options: options,
  });

  myChart4 = new Chart(ctx4, {
    type: "line",
    data: data4,
    options: options,
  });
});

function filterSelected(id) {
  // Iterate over all buttons
  var buttons = document.querySelectorAll('button');
  buttons.forEach(function(button) {
      // Check if the button's id matches the provided id
      if (button.id === id) {
          // Change background color to peachpuff for the selected button
          button.style.backgroundColor = "peachpuff";
      } else {
          // Reset background color for other buttons
          button.style.backgroundColor = "";
      }
  });

  // Update chart data based on the selected dataset
  switch(id) {
      case 'button1':
          myChart1.data = data1;
          myChart1.update();
          myChart2.data = data1;
          myChart2.update();
          myChart3.data = data2;
          myChart3.update();
          myChart4.data = data2;
          myChart4.update();
          break;
      case 'button2':
        myChart1.data = data3;
        myChart1.update();
        myChart2.data = data3;
        myChart2.update();
        myChart3.data = data4;
        myChart3.update();
        myChart4.data = data4;
        myChart4.update();
          break;
      // Add cases for additional buttons if needed
  }

}

