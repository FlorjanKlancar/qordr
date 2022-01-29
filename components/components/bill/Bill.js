import React, {Fragment, useContext} from "react";
import CartContext from "../store/cart-context";
import ListItems from "./ListItems";
import {useRouter} from "next/router";
import Lottie from "react-lottie";
import animationData from "../../../public/lottie/waiter.json";
import {useTranslation} from "react-i18next";
import Confetti from "react-confetti";

function Bill(props) {
  const {t} = useTranslation();
  const router = useRouter();
  const tableNr = router.query.tableNr;
  const cartCtx = useContext(CartContext);
  const comment = props.comment;
  const tip = props.tip * 1;
  const totalAmount = (cartCtx.totalAmount + tip).toFixed(2);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Fragment>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Confetti recycle={true} />
      </div>

      <div className="p-4 items-center text-center	 text-xl font-medium">
        {t("bill_thanks")}
      </div>

      <div className="w-10/12 m-auto">
        <Lottie
          options={defaultOptions}
          height={400}
          width={300}
          isClickToPauseDisabled={true}
        />
      </div>

      <div className="mt-8 w-10/12 lg:w-1/3 bg-white rounded-lg shadow m-auto">
        <ul className="divide-y-2 divide-gray-100">
          {cartCtx.items.map((item) => (
            <ListItems
              item={item.itemTitle}
              price={item.itemPrice}
              amount={item.amount}
              key={item.idItem}
            />
          ))}
          {tip > 0 && (
            <li key={props.key} className="p-3 text-sm">
              {t("payment_checkout_tip")}
              <span className="float-right">{tip}€</span>
            </li>
          )}
        </ul>
      </div>
      <div className="pt-4 font-bold items-center text-center float-right pr-8 lg:float-none lg:pr-0">
        {t("bill_total")} {(totalAmount - tip).toFixed(2)}€
      </div>
      <div className="mt-8 pt-8 items-center text-center	text-xl font-medium">
        {t("bill_payment")} {props.paymentOptionIs}
      </div>
      {comment && (
        <div className="pt-8 items-center text-center	text-xl font-medium">
          {t("bill_comment")}
          <div className="items-center text-center text-base font-normal">
            {comment}
          </div>
        </div>
      )}
    </Fragment>
  );
}
export default Bill;
