import { Fragment, useState, useEffect } from "react";
import Head from "next/head";
import DashboardPage from "../../../components/components/dashboard/DashboardPage";
import LayoutDashboard from "../../../components/layout/LayoutDashboard";
import React from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Spinner from "../../../components/components/spinner";
import { db } from "../../../firebase/index";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { useDispatch } from "react-redux";
import { themeActions } from "../../../store/theme-slice";

export default function Dashboard({ restaurant, items }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(themeActions.changeTheme(true));

    if (!session) {
      router.push("/api/auth/signin");
    }
  }, []);

  const [orders, setOrders] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();
  console.log("session", session);

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

        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;600;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <LayoutDashboard restaurantData={restaurant[0].name}>
        {orders.length && session ? (
          <DashboardPage orders={orders} />
        ) : (
          <Spinner />
        )}
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
