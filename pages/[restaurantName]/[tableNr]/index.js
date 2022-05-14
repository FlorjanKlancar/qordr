import React from "react";
import Head from "next/head";
import Restaurant from "../../../components/components/restaurant/Restaurant";
import {Fragment, useState} from "react";
import Tooltip from "../../../components/layout/ToolTip";
import Modal from "../../../components/layout/Modal";
import OpenCart from "../../../components/components/store/OpenCart";
import Cart from "../../../components/components/store/Cart";
import {db} from "../../../firebase/index";
import {collection, getDocs, query, where} from "firebase/firestore";

export default function Home({restaurant, restaurantItems: restaurantItems}) {
  const [openCart, setOpenCart] = useState(false);

  const [items, setItems] = useState(JSON.parse(restaurantItems));

  const favItems = items.filter((item) => item.item.recommendation === true);

  const groupedItems = items
    .map((item) => item.item)
    .reduce((r, a) => {
      r[a.type] = [...(r[a.type] || []), a];
      return r;
    }, {});

  function openCartHandler() {
    setOpenCart(true);
  }
  function closeCartHandler() {
    setOpenCart(false);
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
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const restaurantName = context.query.restaurantName;
  const tableNr = context.query.tableNr;

  const restaurantQ = query(
    collection(db, "restaurant"),
    where("queryName", "==", restaurantName)
  );
  const itemsQ = query(collection(db, "items"));

  const queryRestaurant = await getDocs(restaurantQ);
  const queryItems = await getDocs(itemsQ);

  let restaurant = [];
  queryRestaurant.docs.forEach((item) => {
    restaurant.push(item.data());
  });

  let items = [];
  queryItems.docs.forEach((item) => {
    items.push({item: {...item.data(), id: item.id}});
  });

  if (restaurant.length === 0 || restaurant[0].tableNr < tableNr) {
    return {notFound: true};
  }

  return {
    props: {restaurant: restaurant, restaurantItems: JSON.stringify(items)},
  };
}
