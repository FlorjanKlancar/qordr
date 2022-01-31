import { Fragment } from "react";
import RestaurantHeader from "./RestaurantHeader";
import RestaurantCards from "./RestaurantCards";
import React from "react";

function Restaurant(props) {
  return (
    <Fragment>
      <RestaurantHeader restaurantInfo={props.restaurantInfo} />
      <RestaurantCards
        sideMenu={props.sideMenu}
        restaurantInfo={props.restaurantInfo}
        favItems={props.favItems}
      />
    </Fragment>
  );
}
export default Restaurant;
