import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import LayoutDashboard from "../../../../components/layout/LayoutDashboard";
import Spinner from "../../../../components/components/spinner";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../../firebase";
import OrdersTable from "../../../../components/components/dashboard/orders/OrdersTable";

export default function Dashboard({ restaurant }) {
  const [orders, setOrders] = useState();

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "orders"),
          where("status", "==", "pending"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setOrders(snapshot.docs)
      ),
    [db]
  );

  return (
    <Fragment>
      <Head>
        <title>Orders - {restaurant[0].name}</title>

        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;600;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <LayoutDashboard restaurantData={restaurant[0].name}>
        {orders ? <OrdersTable orders={orders} /> : <Spinner />}
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
