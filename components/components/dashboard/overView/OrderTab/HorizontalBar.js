import React from "react";
import {Bar} from "react-chartjs-2";

function HorizontalBarChart(props) {
  console.log(props);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const graphLabel = [];
  const graphData = [];

  props.data.map((item, index) => {
    graphLabel[index] = months[item.month - 1];
    graphData[index] = item.count;
  });

  const data = {
    labels: graphLabel,
    datasets: [
      {
        label: "Number of orders",
        fill: false,
        backgroundColor: "rgba(67, 56, 202)",
        borderColor: "rgba(67, 56, 202)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(67, 56, 202)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(67, 56, 202)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        backgroundColor: ["rgba(51, 204, 51,0.5)"],
        borderColor: ["rgba(51, 204, 51,1)"],
        borderWidth: 1,
        pointRadius: 4,
        pointHitRadius: 10,
        data: graphData,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return <Bar data={data} options={options} />;
}

export default HorizontalBarChart;
