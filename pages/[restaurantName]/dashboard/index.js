import {Fragment, useState, useEffect} from "react";
import Head from "next/head";
import DashboardPage from "../../../components/components/dashboard/DashboardPage";
import LayoutDashboard from "../../../components/layout/LayoutDashboard";
import React from "react";
import Pusher from "pusher-js";
import {withPageAuthRequired} from "@auth0/nextjs-auth0";
import axios from "axios";
import Spinner from "../../../components/components/spinner";

export default withPageAuthRequired(function Dashboard(props) {
  const [cardInfo, setCardInfo] = useState();
  const [itemsOnOrder, setItemsOnOrder] = useState();
  const [graphData, setGraphData] = useState();

  useEffect(() => {
    //Pusher.logToConsole = true;
    var pusher = new Pusher("e1ac6f9cc2607b50daf4", {
      cluster: "eu",
    });
    const channel = pusher.subscribe("new-order");
    channel.bind("App\\Events\\NewOrder", function (data) {
      console.log(data);
      fetchData();
    });
    fetchData();
  }, []);

  async function fetchData() {
    console.log("fetch");
    const response = await axios.get("/api/dashboard/info");

    setCardInfo(response.data.cardInfo);
    setItemsOnOrder(response.data.itemsOrder);
    setGraphData(response.data.graph);
  }

  return (
    <Fragment>
      <Head>
        <title>Dashboard - {props.restaurantData[0].restaurantName}</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;600;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <LayoutDashboard restaurantData={props.restaurantData[0]}>
        {cardInfo && itemsOnOrder && graphData ? (
          <DashboardPage
            orders={itemsOnOrder}
            dashboardCards={cardInfo}
            ordersGraph={graphData}
          />
        ) : (
          <Spinner />
        )}
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
