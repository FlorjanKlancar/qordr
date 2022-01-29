import React from "react";

const restauranContext = React.createContext({
  idRestaurant: 0,
  restaurantName: "",
  queryName: "",
  restaurantAddress: "",
  restaurantWorkingHours: "",
  restaurantDescription: "",
  restaurantRate: 0,
  restaurantTables: 0,
});

export default CartContext;
