import {Fragment} from "react";
import React from "react";
import OrdersTable from "./OrdersTable";

function Orders(props) {
  function getUniqueListBy(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }

  const uniqueOrders = getUniqueListBy(props.orders, "idOrder");

  return (
    <Fragment>
      <OrdersTable
        orders={props.orders}
        uniqueOrders={uniqueOrders}
        fetchNewData={props.fetchNewData}
      />
    </Fragment>
  );
}
export default Orders;
