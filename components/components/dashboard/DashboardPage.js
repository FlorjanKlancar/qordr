import DashboardCard from "./DashboardCard";
import DashboardCardOrders from "./DashboardCardOrders";
import DashboardGraph from "./DashboardGraph";
import AssessmentIcon from "@material-ui/icons/Assessment";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import TableChartIcon from "@material-ui/icons/TableChart";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import React, {useState} from "react";

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

function DashboardPage(props) {
  let thisMonthOrders = props.dashboardCards[0].orders.thisMonth[0].orders;
  let lastMonthOrders = props.dashboardCards[0].orders.lastMonth[0].orders;

  let thisMonthTable =
    props.dashboardCards[0].table.thisMonth[0]?.restaurantTableNr;
  let lastMonthTable =
    props.dashboardCards[0].table.lastMonth[0]?.restaurantTableNr;

  let thisMonthItem = props.dashboardCards[0].items.thisMonth[0]?.itemTitle;
  let lastMonthItem = props.dashboardCards[0].items.lastMonth[0]?.itemTitle;

  let thisMonthIncome = props.dashboardCards[0].orders.thisMonth[0].income;
  let lastMonthIncome = props.dashboardCards[0].orders.lastMonth[0].income;

  const percentOrders = percIncrease(lastMonthOrders, thisMonthOrders);

  const percentIncome = percIncrease(lastMonthIncome, thisMonthIncome);

  const data = [
    {
      title: "Total orders this month",
      number: thisMonthOrders,
      icon: (
        <AssessmentIcon
          fontSize="large"
          className="text-white text-xs from-indigo-500 to-blue-500 "
        />
      ),
      bottomText:
        percentOrders >= 0 ? (
          <div>
            <span className="text-green-500 font-semibold">
              <ArrowUpwardIcon /> {percentOrders}%
            </span>{" "}
            <span className="pl-2 text-gray-300  text-sm">
              Last month {lastMonthOrders} orders
            </span>
          </div>
        ) : (
          <div>
            <span className="text-red-500 font-semibold">
              <ArrowDownwardIcon /> {percentOrders}%
            </span>{" "}
            <span className="pl-2 text-gray-300  text-sm">
              Last month {lastMonthOrders} orders
            </span>
          </div>
        ),
      color: "from-indigo-500 to-blue-500",
    },

    {
      title: "Total income",
      number: thisMonthIncome.toFixed(2),
      icon: <AttachMoneyIcon fontSize="large" className="text-white text-xs" />,
      bottomText:
        percentIncome >= 0 ? (
          <div>
            <span className="text-green-500 font-semibold">
              <ArrowUpwardIcon /> {percentIncome}%
            </span>{" "}
            <span className="pl-2 text-gray-300  text-sm">Last month €</span>
          </div>
        ) : (
          <div>
            <span className="text-red-500 font-semibold">
              <ArrowDownwardIcon /> {percentIncome}%
            </span>{" "}
            <span className="pl-2 text-gray-300  text-sm">
              Last month {lastMonthIncome.toFixed(2)}€
            </span>
          </div>
        ),
      currency: "yes",
      color: "from-blue-400 to-blue-300",
    },

    {
      title: "Most popular table",
      number: "Table " + thisMonthTable,
      icon: <TableChartIcon fontSize="large" className="text-white text-xs" />,
      bottomText: (
        <span className="text-gray-300  text-sm">
          Last month table {lastMonthTable}
        </span>
      ),
      currency: "no",
      color: "from-green-500 to-green-400",
    },

    {
      title: "Most popular item",
      number: thisMonthItem,
      icon: (
        <RestaurantMenuIcon fontSize="large" className="text-white text-xs" />
      ),
      bottomText: (
        <span className="text-gray-300  text-sm">
          Last month item {lastMonthItem}
        </span>
      ),
      color: "from-yellow-600 to-yellow-500",
    },
  ];
  return (
    <div className="" id="container">
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
      <div className="p-2 xl:p-0 flex flex-wrap xl:flex-nowrap xl:ml-3 mt-6 xl:space-x-6  xl:mr-4">
        <DashboardGraph ordersGraph={props.ordersGraph} />

        <DashboardCardOrders orders={props.orders} />
      </div>
    </div>
  );
}
export default DashboardPage;
