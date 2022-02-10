import DashboardCard from "./DashboardCard";
import DashboardCardOrders from "./DashboardCardOrders";
import DashboardGraph from "./DashboardGraph";
import React from "react";
import moment from "moment";
import {TrendingUpIcon} from "@heroicons/react/solid";
import {TrendingDownIcon} from "@heroicons/react/solid";
import {ChartBarIcon} from "@heroicons/react/solid";
import {LibraryIcon} from "@heroicons/react/outline";
import {TableIcon} from "@heroicons/react/solid";
import {HeartIcon} from "@heroicons/react/solid";

function percIncrease(a, b) {
  let percent;
  if (b !== 0) {
    if (a !== 0) {
      percent = ((b - a) / a) * 100;
    } else {
      percent = b * 100;
    }
  } else {
    percent = -a * 100;
  }
  return Math.floor(percent);
}

function DashboardPage({orders}) {
  const thisMonthStart = moment().startOf("month");
  const lastMonthStart = moment().subtract(1, "months").startOf("month");

  const thisYear = moment().year();

  const ordersThisMonth = orders.filter(
    (o) => o.data().timestamp?.toDate() > thisMonthStart.toDate()
  );
  const ordersLastMonth = orders.filter((o) => {
    return (
      o.data().timestamp?.toDate() > lastMonthStart.toDate() &&
      o.data().timestamp?.toDate() < thisMonthStart.toDate()
    );
  });

  let incomeThisMonth = 0;
  ordersThisMonth.map(
    (order) => (incomeThisMonth = incomeThisMonth + order.data().totalAmount)
  );
  let incomeLastMonth = 0;
  ordersLastMonth.map(
    (order) => (incomeLastMonth = incomeLastMonth + order.data().totalAmount)
  );

  let tableThisMonth = "No data yet";
  let tableLastMonth = "No data yet";

  let itemThisMonth = "No data yet";
  let itemLastMonth = "No data yet";

  const percentOrders = percIncrease(
    ordersLastMonth.length,
    ordersThisMonth.length
  );
  const percentIncome = percIncrease(incomeLastMonth, incomeThisMonth);

  const ordersFull = orders.map((order) => {
    return {
      ...order.data(),
      id: order.id,
      day: moment(order.data().timestamp.toDate()).format("DD. MM. YYYY"),
      month: moment(order.data().timestamp.toDate()).format("M-Y"),
      year: moment(order.data().timestamp.toDate()).format("Y"),
    };
  });

  console.log("ordersFull", ordersFull);

  const groupBy = (array, key) => {
    // Return the reduced array
    return array.reduce((result, currentItem) => {
      // If an array already present for key, push it to the array. Otherwise create an array and push the object.
      (result[currentItem[key]] = result[currentItem[key]] || []).push(
        currentItem
      );
      // return the current iteration `result` value, this will be the next iteration's `result` value and accumulate
      return result;
    }, {}); // Empty object is the initial value for result object
  };

  const data = [
    {
      title: "Total orders this month",
      number: ordersThisMonth.length,
      icon: <ChartBarIcon className="text-white p-1" />,
      bottomText: (
        <div
          className={`${
            percentOrders >= 0 ? "text-green-600" : "text-red-500"
          }  font-semibold`}
        >
          <div className="flex flex-row space-x-4">
            {percentOrders >= 0 ? (
              <TrendingUpIcon className="w-5 h-5 mr-1 mt-1" />
            ) : (
              <TrendingDownIcon className="w-5 h-5 mr-1 mt-1" />
            )}
            {percentOrders}%{" "}
            <span className="text-gray-200">
              Last month {ordersLastMonth.length} orders
            </span>
          </div>
        </div>
      ),
      color: "from-indigo-500 via-indigo-600 to-indigo-700",
    },

    {
      title: "Total income",
      number: incomeThisMonth.toFixed(2),
      icon: <LibraryIcon className="text-white p-1" />,
      bottomText: (
        <div
          className={`${
            percentIncome >= 0 ? "text-green-600" : "text-red-500"
          }  font-semibold`}
        >
          <div className="flex flex-row space-x-4">
            {percentIncome >= 0 ? (
              <TrendingUpIcon className="w-5 h-5 mr-1 mt-1" />
            ) : (
              <TrendingDownIcon className="w-5 h-5 mr-1 mt-1" />
            )}
            {percentIncome}%
            <span className="text-gray-200">
              Last month {incomeLastMonth.toFixed(2)}€
            </span>
          </div>
        </div>
      ),

      currency: "yes",
      color: "from-blue-500 via-blue-600 to-blue-700",
    },

    {
      title: "Most popular table",
      number: tableThisMonth,
      icon: <TableIcon className="text-white p-1" />,
      bottomText: (
        <span className="text-gray-300">
          Last month table: {tableLastMonth}
        </span>
      ),
      currency: "no",
      color: "from-cyan-500 via-cyan-600 to-cyan-700",
    },

    {
      title: "Most popular item",
      number: itemThisMonth,
      icon: <HeartIcon className="text-white p-1" />,
      bottomText: (
        <span className="text-gray-300">Last month item {itemLastMonth}</span>
      ),
      color: "from-amber-500 via-amber-600 to-amber-700",
    },
  ];

  return (
    <div id="container">
      <div className="flex flex-wrap p-4 xl:space-x-3 xl:flex-nowrap">
        {data.map((item, index) => (
          <DashboardCard
            key={index}
            title={item.title}
            number={item.number}
            icon={item.icon}
            bottomText={item.bottomText}
            currency={item.currency}
            color={item.color}
          />
        ))}
      </div>

      <div className="flex flex-col xl:flex-row w-full p-4 xl:space-x-4">
        <div className="shadow-xl border-2 border-gray-200 rounded border-opacity-20 w-full xl:w-1/2 h-[606px]">
          <DashboardGraph
            year={groupBy(ordersFull, "year")}
            month={groupBy(ordersFull, "month")}
            day={groupBy(ordersFull, "day")}
          />
        </div>

        {
          <div className="shadow-xl border-2 border-gray-200 rounded border-opacity-20  w-full xl:w-1/2 h-[606px]">
            <DashboardCardOrders orders={ordersFull} />
          </div>
        }
      </div>
    </div>
  );
}
export default DashboardPage;
