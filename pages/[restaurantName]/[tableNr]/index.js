import React from "react";
import Head from "next/head";
import Restaurant from "../../../components/components/restaurant/Restaurant";
import { Fragment, useState, useEffect } from "react";
import Tooltip from "../../../components/layout/ToolTip";
import Modal from "../../../components/layout/Modal";
import OpenCart from "../../../components/components/store/OpenCart";
import Cart from "../../../components/components/store/Cart";
import RestaurantPickLanguage from "../../../components/components/restaurant/RestaurantPickLanguage";
import HttpApi from "i18next-http-backend";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { db } from "../../../firebase/index";
import { collection, getDocs, query } from "firebase/firestore";

i18n
  .use(initReactI18next)
  .use(HttpApi)
  .init({
    fallbackLng: "GB",
    backend: {
      loadPath: "/assets/locales/{{lng}}/translations.json",
    },
  });

export default function Home({ restaurant, items: restaurantItems }) {
  const favItems = restaurantItems.filter(
    (item) => item.item.recommendation === true
  );

  const groupedItems = restaurantItems
    .map((item) => item.item)
    .reduce((r, a) => {
      r[a.type] = [...(r[a.type] || []), a];
      return r;
    }, {});

  const [openCart, setOpenCart] = useState(false);
  const [language, setLanguage] = useState();

  function openCartHandler() {
    setOpenCart(true);
  }
  function closeCartHandler() {
    setOpenCart(false);
  }

  function pickLang(language) {
    setLanguage(language);
  }

  return (
    <Fragment>
      <Head>
        <title>{restaurant[0].name}</title>

        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;600;700;900&display=swap"
          rel="stylesheet"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Montagu+Slab:wght@200;300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {language ? (
        <Fragment>
          <Tooltip selector="#tooltip">
            {openCart && (
              <Modal onClose={closeCartHandler}>
                <OpenCart onClick={closeCartHandler} />
              </Modal>
            )}
          </Tooltip>

          <Cart onClick={openCartHandler} />
          <Restaurant
            sideMenu={groupedItems}
            restaurantInfo={restaurant}
            favItems={favItems}
          />
        </Fragment>
      ) : (
        <RestaurantPickLanguage pickLang={pickLang} />
      )}
    </Fragment>
  );
}

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
