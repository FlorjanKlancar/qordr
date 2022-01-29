import React, {Fragment, useEffect, useState} from "react";
import Head from "next/head";
import ProductsPage from "../../../../components/components/dashboard/editProducts/ProductsPage";
import LayoutDashboard from "../../../../components/layout/LayoutDashboard";
import Spinner from "../../../../components/components/spinner";
import {withPageAuthRequired} from "@auth0/nextjs-auth0";
import axios from "axios";

export default withPageAuthRequired(function EditProducts(props) {
  const [items, setItems] = useState();
  const [categories, setCategories] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    console.log("fetch");
    const response = await axios.get("/api/dashboard/items");

    setItems(response.data.items);
    setCategories(response.data.categories);
  }

  return (
    <Fragment>
      <Head>
        <title>Edit Products - {props.restaurantData[0].restaurantName}</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;600;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <LayoutDashboard restaurantData={props.restaurantData[0]}>
        {items && categories ? (
          <ProductsPage
            restaurantItems={items}
            updateItemHandler={fetchData}
            restaurantCategories={categories}
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
