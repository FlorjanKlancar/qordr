/* import {Fragment, useState, useEffect} from "react";
import Head from "next/head";
import React from "react";
import LayoutDashboard from "../../../../components/layout/LayoutDashboard";
import Pusher from "pusher-js";
import HistoryPage from "../../../../components/components/dashboard/history/HistoryPage";
import useSWR, {mutate} from "swr";
import {withPageAuthRequired} from "@auth0/nextjs-auth0";

const fetcher = async () => {
  const response1 = await fetch("https://qorder.link/api/showAllOrders");
  const data1 = await response1.json();

  const props = {
    showAllOrders: data1,
  };
  return props;
};

export default withPageAuthRequired(function Dashboard(props) {
  const {data, error} = useSWR("data", fetcher);

  useEffect(() => {
    //Pusher.logToConsole = true;
    var pusher = new Pusher("e1ac6f9cc2607b50daf4", {
      cluster: "eu",
    });
    const channel = pusher.subscribe("new-order");
    channel.bind("App\\Events\\NewOrder", function (data) {
      console.log(data);
      mutate("data");
    });
  }, []);

  function fetchNewData() {
    mutate("data");
  }

  if (error) return "Error";
  if (!data) return "Loading";

  return (
    <Fragment>
      <Head>
        <title>Orders history - {props.restaurantData[0].restaurantName}</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;600;700;900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>

      <LayoutDashboard restaurantData={props.restaurantData[0]}>
        <HistoryPage orders={data.showAllOrders} fetchNewData={fetchNewData} />
      </LayoutDashboard>
    </Fragment>
  );
});

export async function getStaticPaths() {
  const response = await fetch(`${process.env.BACKEND_URL}/api/restaurantInfo`);
  const data = await response.json();

  const tables = [];
  for (var i = 1; i <= data[0].restaurantTables; i++) {
    tables.push({
      restaurant: data[0].queryName,
      tableNr: i.toString(),
    });
  }

  return {
    paths: tables.map((tables) => {
      return {
        params: {
          restaurantName: tables.restaurant,
          tableNr: tables.tableNr,
        },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps() {
  const response = await fetch(`${process.env.BACKEND_URL}/api/restaurantInfo`);
  const data = await response.json();
  return {
    props: {
      restaurantData: data,
    },
    revalidate: 1,
  };
}
 */

export default function History() {
  return <div>History</div>;
}
