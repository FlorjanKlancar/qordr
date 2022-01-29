import React, {useState, useEffect} from "react";
import {Bar} from "react-chartjs-2";

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

const defaultGraph = {
  label: "Orders",
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
  pointRadius: 4,
  pointHitRadius: 10,
  data: [],
};

const DashboardGraph = (props) => {
  console.log(props.ordersGraph[0].Daily[0]);

  const [buttonState, setButtonState] = useState("daily");

  let daily = props.ordersGraph[0].Daily;
  let monthly = props.ordersGraph[0].Monthly;
  let yearly = props.ordersGraph[0].Yearly;

  let dailyLabel = [];
  let monthlyLabel = [];
  let yearlyLabel = [];

  let dailyData = [];
  let monthlyData = [];
  let yearlyData = [];

  daily.map((item, index) => {
    dailyLabel[index] = item.day + "." + item.month;
    dailyData[index] = item.count;
  });
  monthly.map((item, index) => {
    monthlyLabel[index] = months[item.month - 1];
    monthlyData[index] = item.count;
  });
  yearly.map((item, index) => {
    yearlyLabel[index] = item.year;
    yearlyData[index] = item.orders;
  });

  const activeButton =
    "w-full bg-gray-200 hover:bg-gray-200 text-blue-700 font-semibold py-2 px-4";
  const button =
    "w-full bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 ";

  const [graphData, setGraphData] = useState({
    labels: dailyLabel,
    datasets: [{...defaultGraph, data: dailyData}],
  });

  function changeState(e) {
    const value = e.target.value;
    setButtonState(value);

    if (value === "daily") {
      setGraphData({
        labels: dailyLabel,
        datasets: [{...defaultGraph, data: dailyData}],
      });
    }

    if (value === "monthly") {
      setGraphData({
        labels: monthlyLabel,
        datasets: [{...defaultGraph, data: monthlyData}],
      });
    }

    if (value === "yearly") {
      setGraphData({
        labels: yearlyLabel,
        datasets: [{...defaultGraph, data: yearlyData}],
      });
    }
  }

  console.log(graphData);
  return (
    <div className=" bg-white shadow-sm w-full xl:w-8/12 border rounded-xl border-gray-100 xl:ml-4">
      <div className="border-b p-3 border-gray-100">
        <p className="font-semibold text-lg">Restaurant orders graph</p>
      </div>
      <div>
        <Bar data={graphData} />
      </div>
      <div className="flex space-x-4 items-center justify-items-center	text-center">
        <div className="flex-1">
          <button
            className={buttonState === "yearly" ? activeButton : button}
            value="yearly"
            onClick={(e) => changeState(e)}
          >
            Yearly
          </button>
        </div>
        <div className="flex-1">
          <button
            className={buttonState === "monthly" ? activeButton : button}
            value="monthly"
            onClick={(e) => changeState(e)}
          >
            Monthly
          </button>
        </div>
        <div className="flex-1">
          <button
            className={buttonState === "daily" ? activeButton : button}
            value="daily"
            onClick={(e) => changeState(e)}
          >
            Daily
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardGraph;
