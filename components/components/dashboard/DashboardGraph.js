import React, {useState, useEffect} from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import moment from "moment";
import {Bar} from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const defaultGraph = {
  label: "Orders",
  fill: false,
  backgroundColor: "rgba(23,174,182)",
  borderColor: "rgba(23,174,182)",
  borderCapStyle: "butt",
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: "miter",
  pointBorderColor: "rgba(23,174,182)",
  pointBackgroundColor: "#fff",
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBackgroundColor: "rgba(23,174,182)",
  pointHoverBorderColor: "rgba(23,174,182)",
  pointHoverBorderWidth: 2,
  pointRadius: 4,
  pointHitRadius: 10,
  data: [],
};

const DashboardGraph = ({year, month, day}) => {
  const [buttonState, setButtonState] = useState("daily");
  const [graphData, setGraphData] = useState({
    labels: dailyLabel,
    datasets: [{...defaultGraph, data: dailyData}],
  });

  function changeState(value) {
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
  let dayGraph = Object.keys(day).map(function (key, index) {
    {
      return {
        length: day[key].length,
        date: day[key][0].day,
      };
    }
  });

  dayGraph = dayGraph.reverse().slice(Math.max(dayGraph.length - 7, 0));

  const monthGraph = Object.keys(month).map(function (key, index) {
    {
      return {
        length: month[key].length,
        date: moment(month[key][0].month.substring(0, 2)).format("MMMM"),
      };
    }
  });

  const yearGraph = Object.keys(year).map(function (key, index) {
    {
      return {length: year[key].length, date: year[key][0].year};
    }
  });

  let dailyLabel = [];
  let monthlyLabel = [];
  let yearlyLabel = [];

  let dailyData = [];
  let monthlyData = [];
  let yearlyData = [];

  dayGraph.map((item, index) => {
    dailyLabel[index] = `${item.date}`;
    dailyData[index] = item.length;
  });
  monthGraph.reverse().map((item, index) => {
    monthlyLabel[index] = item.date;
    monthlyData[index] = item.length;
  });
  yearGraph.reverse().map((item, index) => {
    yearlyLabel[index] = item.date;
    yearlyData[index] = item.length;
  });

  const activeButton =
    "w-full bg-gray-200 hover:bg-gray-200 text-blue-700 font-semibold py-2 px-4 rounded-xl";
  const button =
    "w-full bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 ";

  useEffect(() => {
    changeState(buttonState);
  }, [year, month, day]);

  console.log("graphData", graphData);
  return (
    <div className="h-full">
      <div className="border-b p-3 border-gray-100">
        <p className="font-semibold text-lg">Restaurant orders graph</p>
      </div>
      <div className="h-5/6">
        {<Bar data={graphData} options={{maintainAspectRatio: false}} />}
      </div>
      <div className="flex space-x-4 items-center justify-items-center	text-center mx-2">
        <div className="flex-1">
          <button
            className={buttonState === "yearly" ? activeButton : button}
            value="yearly"
            onClick={() => changeState("yearly")}
          >
            Yearly
          </button>
        </div>
        <div className="flex-1">
          <button
            className={buttonState === "monthly" ? activeButton : button}
            value="monthly"
            onClick={() => changeState("monthly")}
          >
            Monthly
          </button>
        </div>
        <div className="flex-1">
          <button
            className={buttonState === "daily" ? activeButton : button}
            value="daily"
            onClick={() => changeState("daily")}
          >
            Daily
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardGraph;
