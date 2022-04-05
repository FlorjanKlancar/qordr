import React from "react";
import {Fragment, useState, useEffect} from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import {db} from "../../../../../firebase";
import Head from "next/head";
import LayoutDashboard from "../../../../../components/layout/LayoutDashboard";
import EditProductsPage from "../../../../../components/components/dashboard/editProducts/EditProductsPage";

function EditProductPage({restaurant, item}) {
  console.log("item main", item);
  return (
    <Fragment>
      <Head>
        <title>Edit product - {item.title}</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;600;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <LayoutDashboard restaurantData={restaurant[0].name}>
        <div id="container">
          <EditProductsPage item={item} />
        </div>
      </LayoutDashboard>
    </Fragment>
  );
}

export default EditProductPage;

export async function getServerSideProps(context) {
  const restaurantName = context.query.restaurantName;
  const item = context.query.id;

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
    return {notFound: true};
  }

  const docRef = doc(db, "items", item);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return {notFound: true};
  }

  return {
    props: {
      restaurant: restaurant,
      item: {id: docSnap.id, item: docSnap.data()},
    },
  };
}
