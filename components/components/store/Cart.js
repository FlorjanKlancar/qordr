import React, { Fragment, useContext } from "react";
import CartContext from "./cart-context";
//import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@mui/material/Badge";

function Cart(props) {
  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  return (
    <Fragment>
      {numberOfCartItems > 0 && (
        <div
          className="rounded-full h-12 w-12 flex items-center justify-center fixed bottom-12 right-3 bg-defaultDark"
          onClick={props.onClick}
          id="cart"
        >
          <Badge badgeContent={numberOfCartItems} color="primary">
            {/*<ShoppingCartIcon color="" className="text-white" />*/}
          </Badge>
        </div>
      )}
    </Fragment>
  );
}
export default Cart;
