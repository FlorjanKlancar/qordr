import {Fragment, useState, useEffect} from "react";
import Head from "next/head";
import DashboardPage from "../../../components/components/dashboard/DashboardPage";
import LayoutDashboard from "../../../components/layout/LayoutDashboard";
import React from "react";
import {withPageAuthRequired} from "@auth0/nextjs-auth0";
import Spinner from "../../../components/components/spinner";
import {db} from "../../../firebase/index";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

export default withPageAuthRequired(function Dashboard({restaurant, items}) {
  const [orders, setOrders] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "orders"), orderBy("timestamp", "desc")),
        (snapshot) => setOrders(snapshot.docs)
      ),
    [db]
  );

  return (
    <Fragment>
      <Head>
        <title>Dashboard - {restaurant[0].name}</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;600;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <LayoutDashboard restaurantData={restaurant[0].name}>
        {orders ? <DashboardPage orders={orders} /> : <Spinner />}
      </LayoutDashboard>
    </Fragment>
  );
});

export async function getStaticPaths() {
  const q = query(collection(db, "restaurant"));
  const querySnapshot = await getDocs(q);

  let restaurantName;
  let tableNr;
  querySnapshot.docs.forEach((item) => {
    restaurantName = item.data().queryName;
    tableNr = item.data().tableNr;
  });

  const tables = [];
  for (var i = 1; i <= tableNr; i++) {
    tables.push({
      restaurantName: restaurantName.toLowerCase().toString(),
      tableNr: i.toString(),
    });
  }

  return {
    paths: tables.map((tables) => {
      return {
        params: {
          restaurantName: tables.restaurantName,
          tableNr: tables.tableNr,
        },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps() {
  const itemsQ = query(collection(db, "items"));
  const queryItems = await getDocs(itemsQ);

  let items = [];
  queryItems.docs.forEach((item) => {
    items.push({item: {...item.data(), id: item.id}});
  });

  const restaurantQ = query(collection(db, "restaurant"));
  const queryRestaurant = await getDocs(restaurantQ);

  let restaurant = [];
  queryRestaurant.docs.forEach((item) => {
    restaurant.push(item.data());
  });

  return {
    props: {items: items, restaurant: restaurant},
  };
}
