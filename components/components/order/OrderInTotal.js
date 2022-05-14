import React, {useContext} from "react";
import CartContext from "../store/cart-context";

function OrderInTotal(props) {
  const cartCtx = useContext(CartContext);
  const tip = props.tip * 1;
  const itemsAmount = cartCtx.totalAmount.toFixed(2) * 1;
  const inTotal = itemsAmount + tip;

  return (
    <div className="grid grid-cols-2 gap-4 p-2 mx-auto rounded-md border shadow-md w-11/12">
      <div className="col-span-2 text-center font-bold text-xl">
        Total amount including VAT
      </div>
      <div className="pl-4">Items total amount</div>
      <div className="text-right pr-4">{cartCtx.totalAmount.toFixed(2)}€</div>
      <div className="pl-4">Tip for waiter</div>
      <div className="text-right pr-4">{tip.toFixed(2)}€</div>
      <div className="col-span-2 divide-y-2  border-black"></div>
      <div className="pl-4 font-medium text-lg">In total</div>
      <div className="text-right pr-4 font-medium text-lg">
        {inTotal.toFixed(2)}€
      </div>
      <div className="col-span-2 ">
        <button
          className="w-full bg-default text-white font-bold py-2 px-4 rounded "
          onClick={props.orderToggle}
        >
          Send order to restaurant
        </button>
      </div>
    </div>
  );
}
export default OrderInTotal;
