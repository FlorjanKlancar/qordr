import React, { Suspense } from "react";
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
import Spinner from "../../../components/components/spinner/index";
import axios from "axios";

i18n
  .use(initReactI18next)
  .use(HttpApi)
  .init({
    fallbackLng: "GB",
    backend: {
      loadPath: "/assets/locales/{{lng}}/translations.json",
    },
  });

export default function Home(props) {
  const restaurantName = props.restaurantData[0].restaurantName;
  const [openCart, setOpenCart] = useState(false);
  const [items, setItems] = useState(props.sideMenu);
  const [language, setLanguage] = useState();
  const [favItems, setFavItems] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    console.log("fetch");
    const response = await axios.get("/api/restaurant/items");

    setItems(response.data.showRestaurantSideMenu);
    setFavItems(response.data.favouriteItemsCard);
    console.log(response);
  }

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
        <title>{restaurantName}</title>

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
            sideMenu={items}
            restaurantInfo={props.restaurantData}
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
    props: { restaurantData: data, sideMenu: sideMenu },
  };
}
