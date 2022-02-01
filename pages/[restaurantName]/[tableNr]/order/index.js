import React, { Fragment } from "react";
import Head from "next/head";
import OrderPage from "../../../../components/components/order/OrderPage";
import { db } from "../../../../firebase/index";
import { collection, getDocs, query } from "firebase/firestore";

function Order({ restaurant, items: restaurantItems }) {
  return (
    <Fragment>
      <Head>
        <title>Order - {restaurant[0].name}</title>
      </Head>

      <OrderPage restaurantInfo={restaurant} />
    </Fragment>
  );
}
export default Order;

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
    items.push({ item: { ...item.data(), id: item.id } });
  });

  const restaurantQ = query(collection(db, "restaurant"));
  const queryRestaurant = await getDocs(restaurantQ);

  let restaurant = [];
  queryRestaurant.docs.forEach((item) => {
    restaurant.push(item.data());
  });

  return {
    props: { items: items, restaurant: restaurant },
  };
}
