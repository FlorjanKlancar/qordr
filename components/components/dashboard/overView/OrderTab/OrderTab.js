import {Doughnut} from "react-chartjs-2";
import React from "react";
import HorizontalBar from "./HorizontalBar";
import CommentsCard from "./CommentsCard";
import BestSellers from "./BestSellers";

export default function OrderTab(props) {
  console.log(props);

  const pieGraph = [
    props.orders.paymentGraph.card[0].count,
    props.orders.paymentGraph.cash[0].count,
  ];
  const chartdata = {
    labels: ["Cash", "Card"],
    datasets: [
      {
        data: pieGraph,

        borderWidth: "3",

        backgroundColor: ["#68C6FC", "#56d798", "#ff8397", "#6970d5"],
      },
    ],
  };

  const dataHorBar = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "#EC932F",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [65, 59, 80, 81, 56, 55, 40],
      },
      {
        label: "My First dataset 2",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };
  console.log(props);
  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      <div className="w-full flex flex-wrap lg:flex-nowrap">
        <div className="w-full lg:w-9/12 bg-white shadow-sm border rounded-xl border-gray-100 p-4">
          <p className="font-semibold text-lg border-b-2 h-8">Orders graph</p>
          <HorizontalBar data={props.orders.graph} />
        </div>
        <div className=" bg-white shadow-sm w-full lg:w-3/12 border rounded-xl border-gray-100 lg:ml-4 mt-4 lg:mt-0">
          <div className="border-b p-3 border-gray-100">
            <p className="font-semibold text-lg border-b-2 h-8">
              Payment type graph
            </p>
            <p className="text-gray-500 text-sm pt-2">
              Total orders: {props.orders.ordersTotalNr[0].count}
            </p>
          </div>
          <Doughnut data={chartdata} />
        </div>
      </div>

      <div className="w-full flex flex-wrap lg:flex-nowrap">
        <div className="w-full lg:w-1/2 ">
          <div className="bg-white shadow-sm w-full border rounded-xl border-gray-100 p-2 lg:mr-2">
            <p className="font-semibold text-lg border-b-2 h-8">Best sellers</p>
            <BestSellers bestSell={props.orders.bestSellers} />
          </div>
        </div>
        <div className="w-full lg:w-1/2 mt-4 lg:mt-0 lg:ml-2">
          <div className="bg-white shadow-sm w-full border rounded-xl border-gray-100 p-2">
            <p className="font-semibold text-lg border-b-2 h-8">
              Customer comments
            </p>
            <CommentsCard comments={props.orders.comments} />
          </div>
        </div>
      </div>
    </div>
  );
}
