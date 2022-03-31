import React, { Fragment } from "react";
import Head from "next/head";
import OrderPage from "../../../../components/components/order/OrderPage";
import { db } from "../../../../firebase/index";
import { collection, getDocs, query, where } from "firebase/firestore";

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
