import DashboardCard from "./DashboardCard";
import DashboardCardOrders from "./DashboardCardOrders";
import DashboardGraph from "./DashboardGraph";
import React from "react";
import moment from "moment";
import { TrendingUpIcon } from "@heroicons/react/solid";
import { TrendingDownIcon } from "@heroicons/react/solid";
import { ChartBarIcon } from "@heroicons/react/solid";
import { LibraryIcon } from "@heroicons/react/outline";
import { TableIcon } from "@heroicons/react/solid";
import { HeartIcon } from "@heroicons/react/solid";

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

function DashboardPage({ orders }) {
  const thisMonthStart = moment().startOf("month");
  const lastMonthStart = moment().subtract(1, "months").startOf("month");

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

  const tablesThisMonth = ordersThisMonth.map((order) => {
    return { id: order.id, table: order.data().restaurantTableNr };
  });
  const tablesLastMonth = ordersLastMonth.map((order) => {
    return { id: order.id, table: order.data().restaurantTableNr };
  });

  let itemsInOrdersThisMonth = [];
  let itemsInOrdersLastMonth = [];
  ordersThisMonth.forEach((order) =>
    itemsInOrdersThisMonth.push(
      order.data().items.map((item) => {
        return { id: item.id, name: item.title };
      })
    )
  );
  ordersLastMonth.forEach((order) =>
    itemsInOrdersLastMonth.push(
      order.data().items.map((item) => {
        return { id: item.id, name: item.title };
      })
    )
  );

  itemsInOrdersThisMonth = [].concat.apply([], itemsInOrdersThisMonth);
  itemsInOrdersLastMonth = [].concat.apply([], itemsInOrdersLastMonth);

  const groupBy = (array, key) => {
    return array.reduce((result, currentItem) => {
      (result[currentItem[key]] = result[currentItem[key]] || []).push(
        currentItem
      );

      return result;
    }, {});
  };

  const bestItemsThisMonth = groupBy(itemsInOrdersThisMonth, "id");
  const bestItemsLastMonth = groupBy(itemsInOrdersLastMonth, "id");
  const bestTableThisMonth = groupBy(tablesThisMonth, "table");
  const bestTableLastMonth = groupBy(tablesLastMonth, "table");

  const bestItemsThisMonthArray = Object.keys(bestItemsThisMonth).map(function (
    key
  ) {
    {
      return {
        length: bestItemsThisMonth[key].length,
        name: bestItemsThisMonth[key][0].name,
      };
    }
  });
  const bestItemsLastMonthArray = Object.keys(bestItemsLastMonth).map(function (
    key
  ) {
    {
      return {
        length: bestItemsLastMonth[key].length,
        name: bestItemsLastMonth[key][0].name,
      };
    }
  });
  const bestTableThisMonthArray = Object.keys(bestTableThisMonth).map(function (
    key
  ) {
    {
      return {
        length: bestTableThisMonth[key].length,
        table: bestTableThisMonth[key][0].table,
      };
    }
  });
  const bestTableLastMonthArray = Object.keys(bestTableLastMonth).map(function (
    key
  ) {
    {
      return {
        length: bestTableLastMonth[key].length,
        table: bestTableLastMonth[key][0].table,
      };
    }
  });

  bestItemsThisMonthArray.sort(function (a, b) {
    return b.length - a.length;
  });
  bestItemsLastMonthArray.sort(function (a, b) {
    return b.length - a.length;
  });
  bestTableThisMonthArray.sort(function (a, b) {
    return b.length - a.length;
  });
  bestTableLastMonthArray.sort(function (a, b) {
    return b.length - a.length;
  });

  const bestItemThisMonthCard = {
    number: bestItemsThisMonthArray[0]?.length,
    title: bestItemsThisMonthArray[0]?.name,
  };
  const bestItemLastMonthCard = {
    number: bestItemsLastMonthArray[0]?.length,
    title: bestItemsLastMonthArray[0]?.name,
  };
  const bestTableThisMonthCard = {
    orders: bestTableThisMonthArray[0]?.length,
    table: bestTableThisMonthArray[0]?.table,
  };
  const bestTableLastMonthCard = {
    orders: bestTableLastMonthArray[0]?.length,
    table: bestTableLastMonthArray[0]?.table,
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
          <div className="flex flex-row justify-between px-1">
            <div className="flex">
              {percentOrders >= 0 ? (
                <TrendingUpIcon className="w-5 h-5 mr-1 mt-1" />
              ) : (
                <TrendingDownIcon className="w-5 h-5 mr-1 mt-1" />
              )}
              {percentOrders}%
            </div>
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
          <div className="flex flex-row justify-between px-1">
            <div className="flex">
              {percentIncome >= 0 ? (
                <TrendingUpIcon className="w-5 h-5 mr-1 mt-1" />
              ) : (
                <TrendingDownIcon className="w-5 h-5 mr-1 mt-1" />
              )}
              {percentIncome}%
            </div>
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
      number: (
        <div className="flex flex-row justify-between px-1 text-sm md:text-lg xl:text-xl">
          <div>{`Table: ${
            bestTableThisMonthCard.table
              ? bestTableThisMonthCard.table
              : "No data"
          } `}</div>
          <div>{`Orders: ${
            bestTableThisMonthCard.orders
              ? bestTableThisMonthCard.orders
              : "No data"
          }`}</div>
        </div>
      ),
      icon: <TableIcon className="text-white p-1" />,
      bottomText: (
        <div className="flex flex-row justify-between px-1 text-gray-300 text-sm md:text-base">
          <div>{`Last month Table: ${
            bestTableLastMonthCard.table
              ? bestTableLastMonthCard.table
              : "No data"
          } `}</div>
          <div>{`Orders: ${
            bestTableLastMonthCard.orders
              ? bestTableLastMonthCard.orders
              : "No data"
          }`}</div>
        </div>
      ),
      currency: "no",
      color: "from-cyan-500 via-cyan-600 to-cyan-700",
    },

    {
      title: "Most popular item",
      number: (
        <div className="flex flex-row justify-between px-1 ">
          <div className="truncate w-3/4 text-sm md:text-lg xl:text-xl">{`${
            bestItemThisMonthCard.title
              ? bestItemThisMonthCard.title
              : "No data"
          } `}</div>
          <div className="text-sm md:text-lg">{`Orders: ${
            bestItemThisMonthCard.number
              ? bestItemThisMonthCard.number
              : "No data"
          }`}</div>
        </div>
      ),
      icon: <HeartIcon className="text-white p-1" />,
      bottomText: (
        <div className="flex flex-row justify-between px-1 text-gray-300 text-sm md:text-base">
          <div className="truncate w-4/6">{`Last month: ${
            bestItemLastMonthCard.title
              ? bestItemLastMonthCard.title
              : "No data"
          } `}</div>
          <div className="">{`Orders: ${
            bestItemLastMonthCard.number
              ? bestItemLastMonthCard.number
              : "No data"
          }`}</div>
        </div>
      ),
      color: "from-amber-500 via-amber-600 to-amber-700",
    },
  ];

  return (
    <div id="container">
      <div className="flex flex-col md:grid md:grid-cols-2 mx-2 md:gap-2 xl:pt-4 2xl:grid-cols-4">
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
          {ordersFull && (
            <DashboardGraph
              year={groupBy(ordersFull, "year")}
              month={groupBy(ordersFull, "month")}
              day={groupBy(ordersFull, "day")}
            />
          )}
        </div>

        <div className="shadow-xl border-2 border-gray-200 rounded border-opacity-20   xl:w-1/2 h-[606px]">
          <DashboardCardOrders orders={ordersFull} />
        </div>
      </div>
    </div>
  );
}
export default DashboardPage;
