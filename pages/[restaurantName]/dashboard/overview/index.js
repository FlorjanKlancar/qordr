import React, {useState, useEffect, Fragment} from "react";
import Head from "next/head";
import LayoutDashboard from "../../../../components/layout/LayoutDashboard";
import Tabs from "../../../../components/components/dashboard/overView/Tabs";
import axios from "axios";
import {withPageAuthRequired} from "@auth0/nextjs-auth0";
import Spinner from "../../../../components/components/spinner";

export default withPageAuthRequired(function Overview(props) {
  const [overviewOrders, setOverviewOrders] = useState(props.overview);
  const [overviewTables, setOverviewTables] = useState(props.tables);
  const [overviewItems, setOverviewItems] = useState(props.items);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    console.log("fetch");
    const response = await axios.get("/api/dashboard/overview");

    setOverviewOrders(response.data.orders);
    setOverviewTables(response.data.tables);
    setOverviewItems(response.data.items);
  }

  return (
    <Fragment>
      <Head>
        <title>Overview - {props.restaurantData[0].restaurantName}</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
          integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
          crossOrigin="anonymous"
        />
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
        {overviewOrders && overviewTables && overviewItems ? (
          <Tabs
            orders={overviewOrders}
            tables={overviewTables}
            items={overviewItems}
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
