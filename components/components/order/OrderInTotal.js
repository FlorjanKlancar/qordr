import React, {useContext} from "react";
import CartContext from "../store/cart-context";
import {useTranslation} from "react-i18next";

function OrderInTotal(props) {
  const {t} = useTranslation();

  const cartCtx = useContext(CartContext);
  const tip = props.tip * 1;
  const itemsAmount = cartCtx.totalAmount.toFixed(2) * 1;
  const inTotal = itemsAmount + tip;

  return (
    <div className="grid grid-cols-2 gap-4 p-2 mx-auto rounded-md border shadow-md w-11/12">
      <div className="col-span-2 text-center font-bold text-xl">
        {t("payment_checkout_header")}
      </div>
      <div className="pl-4">{t("payment_checkout_total")}</div>
      <div className="text-right pr-4">{cartCtx.totalAmount.toFixed(2)}€</div>
      <div className="pl-4">{t("payment_checkout_tip")}</div>
      <div className="text-right pr-4">{tip.toFixed(2)}€</div>
      <div className="col-span-2 divide-y-2  border-black"></div>
      <div className="pl-4 font-medium text-lg">
        {t("payment_last_section")}
      </div>
      <div className="text-right pr-4 font-medium text-lg">
        {inTotal.toFixed(2)}€
      </div>
      <div className="col-span-2 ">
        <button
          className="w-full bg-default text-white font-bold py-2 px-4 rounded "
          onClick={props.orderToggle}
        >
          {t("payment_button")}
        </button>
      </div>
    </div>
  );
}
export default OrderInTotal;
