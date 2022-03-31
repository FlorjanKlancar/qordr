import { Fragment, useState, useEffect } from "react";
import Head from "next/head";
import React from "react";
import LayoutDashboard from "../../../../components/layout/LayoutDashboard";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../../firebase";
import History from "../../../../components/components/dashboard/history/History";

export default function Dashboard({ restaurant }) {
  const [orders, setOrders] = useState();

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "orders"), orderBy("timestamp", "desc")),
        (snapshot) => setOrders(snapshot.docs)
      ),
    [db]
  );

  console.log("orders", orders);
  return (
    <Fragment>
      <Head>
        <title>Orders history - {restaurant[0].name}</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;600;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <LayoutDashboard restaurantData={restaurant[0].name}>
        <History orders={orders} />
      </LayoutDashboard>
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const restaurantName = context.query.restaurantName;

  const restaurantQ = query(
    collection(db, "restaurant"),
    where("queryName", "==", restaurantName)
  );

  const queryRestaurant = await getDocs(restaurantQ);

  let restaurant = [];
  queryRestaurant.docs.forEach((item) => {
    restaurant.push(item.data());
  });

  if (restaurant.length === 0) {
    return { notFound: true };
  }

  return {
    props: { restaurant: restaurant },
  };
}
