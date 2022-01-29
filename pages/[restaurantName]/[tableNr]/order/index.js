import React, {Fragment} from "react";
import Head from "next/head";
import OrderPage from "../../../../components/components/order/OrderPage";

function Order(props) {
  return (
    <Fragment>
      <Head>
        <title>Order</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
          integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
          crossOrigin="anonymous"
        />
        <link href="https://css.gg/heart.css" rel="stylesheet"></link>
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Head>

      <OrderPage restaurantInfo={props.restaurantData} />
    </Fragment>
  );
}
export default Order;

export async function getStaticPaths() {
  const response = await fetch(` https://qorder.link/api/restaurantInfo`);
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
  const response = await fetch(` https://qorder.link/api/restaurantInfo`);
  const data = await response.json();

  const response2 = await fetch(
    `https://qorder.link/api/showRestaurantSideMenu`
  );
  const sideMenu = await response2.json();

  return {
    props: {restaurantData: data, sideMenu: sideMenu},
  };
}
