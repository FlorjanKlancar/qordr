import React, {useState, useEffect} from "react";
import {Bar} from "react-chartjs-2";

function HorizontalBarChart(props) {
  console.log(props);
  const [buttonState, setButtonState] = useState("All");
  const [data, setData] = useState();

  const graphLabel = [];
  const graphData = [];

  const graphLabelAllTime = [];
  const graphDataAllTime = [];

  const graphLabelMonth = [];
  const graphDataMonth = [];

  props.data[0].allTimeTables.map((item, index) => {
    graphLabelAllTime[index] = "Table " + item.restaurantTableNr;
    graphDataAllTime[index] = item.count;
  });

  props.data[0].tablesThisYear.map((item, index) => {
    graphLabel[index] = "Table " + item.restaurantTableNr;
    graphData[index] = item.count;
  });

  props.data[0].tablesThisMonth.map((item, index) => {
    graphLabelMonth[index] = "Table " + item.restaurantTableNr;
    graphDataMonth[index] = item.count;
  });

  function setDefaultData() {
    setData({
      labels: graphLabelAllTime,
      datasets: [
        {
          label: "Number of table orders",
          fill: false,
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
          backgroundColor: ["rgba(27, 172, 255,0.5)"],
          borderColor: ["rgba(27, 172, 255 ,1)"],
          borderWidth: 1,
          pointRadius: 4,
          pointHitRadius: 10,
          data: graphDataAllTime,
        },
      ],
    });
  }

  useEffect(() => {
    setDefaultData();
  }, []);

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

  const activeButton =
    "w-full bg-gray-200 hover:bg-gray-200 text-blue-700 font-semibold py-2 px-4";
  const button =
    "w-full bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 ";

  function changeState(e) {
    const value = e.target.value;
    setButtonState(value);

    if (value === "All") {
      setDefaultData();
    } else if (value === "Year") {
      setData({
        labels: graphLabel,
        datasets: [
          {
            label: "Number of table orders",
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
      });
    } else if (value === "Month") {
      setData({
        labels: graphLabelMonth,
        datasets: [
          {
            label: "Number of table orders",
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
            backgroundColor: ["rgba(255,255,1,0.5)"],
            borderColor: ["rgba(204,204,0,1)"],
            borderWidth: 1,
            pointRadius: 4,
            pointHitRadius: 10,
            data: graphDataMonth,
          },
        ],
      });
    }
  }

  return (
    <div className="">
      <Bar data={data} options={options} />
      <div className="flex space-x-4 items-center justify-items-center	text-center">
        <div className="flex-1">
          <button
            className={buttonState === "All" ? activeButton : button}
            value="All"
            onClick={(e) => changeState(e)}
          >
            All time
          </button>
        </div>
        <div className="flex-1">
          <button
            className={buttonState === "Year" ? activeButton : button}
            value="Year"
            onClick={(e) => changeState(e)}
          >
            This year
          </button>
        </div>
        <div className="flex-1">
          <button
            className={buttonState === "Month" ? activeButton : button}
            value="Month"
            onClick={(e) => changeState(e)}
          >
            This month
          </button>
        </div>
      </div>
    </div>
  );
}

export default HorizontalBarChart;
