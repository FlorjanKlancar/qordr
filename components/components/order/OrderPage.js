import React, {Fragment, useContext, useState} from "react";
import RestaurantSideInfo from "../restaurant/RestaurantSideInfo";
import OrderItem from "./OrderItem";
import OrderComment from "./OrderComment";
import OrderInTotal from "./OrderInTotal";
import PaymentDetails from "./PaymentDetails";
import CartContext from "../store/cart-context";
import RestaurantHeader from "../restaurant/RestaurantHeader";
import Bill from "../bill/Bill";
import AlertPopUp from "./AlertPopUp";
import {useRouter} from "next/router";
import Link from "next/link";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {useTranslation} from "react-i18next";

function OrderPage(props) {
  const {t} = useTranslation();

  const router = useRouter();
  const restaurantName = router.query.restaurantName;
  const tableNr = router.query.tableNr;
  const cartCtx = useContext(CartContext);
  const [tip, setTip] = useState(0);
  const [paymentOption, setPaymentOption] = useState("");
  const [comment, setComment] = useState("");
  const [showOrderPage, setShowOrderPage] = useState(true);
  const [alertForPayment, setAlertForPayment] = useState(false);
  const [alertForItems, setAlertForItems] = useState(false);

  function setTipHandler(value) {
    setTip(value);
  }

  function setPaymentOptionHandler(value) {
    setPaymentOption(value);
  }

  function setCommentHandler(value) {
    setComment(value);
  }

  function closeAlertHandler() {
    setAlertForItems(false);
  }

  const insertOrder = [
    {
      items: cartCtx.items,
      totalAmount: cartCtx.totalAmount,
      customerComment: comment,
      customerTip: tip,
      paymentType: paymentOption,
      restaurantTableNr: tableNr,
    },
  ];

  async function orderTogglePage() {
    if (paymentOption !== "" && cartCtx.items.length > 0) {
      await fetch(`https://qorder.link/api/insertOrder`, {
        method: "post",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(insertOrder),
      }).then((res) => {
        if (res.status === 200) setShowOrderPage(false);
      });
    } else if (paymentOption === "" || cartCtx.items.length === 0) {
      if (paymentOption === "") setAlertForPayment(true);
      if (cartCtx.items.length === 0) setAlertForItems(true);
    }
  }

  return (
    <Fragment>
      {showOrderPage ? (
        <Fragment>
          <RestaurantHeader restaurantInfo={props.restaurantInfo} />
          <div className="lg:grid grid-flow-col grid-cols-3 pt-12">
            <div>
              <RestaurantSideInfo restaurantInfo={props.restaurantInfo} />
            </div>

            <div className="pt-8 lg:pt-0">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-gray-600	pt-4 pl-4 mt-4">
                  <Link
                    href={{
                      pathname: "/[restaurantName]/[tableNr]",
                      query: {restaurantName: restaurantName, tableNr: tableNr},
                    }}
                  >
                    <button className="p-1 pt-2">
                      <ArrowBackIcon />
                      <span className="">{t("back_button")}</span>
                    </button>
                  </Link>
                </div>

                <div className="pt-8 pr-2 pb-2 lg:text-xl text-base">
                  {t("checkout_info")} {""}
                  <span className="font-bold">Table-{tableNr}</span> at
                  <div className="font-bold inline">
                    {" "}
                    {props.restaurantInfo[0].restaurantName}
                  </div>
                </div>
              </div>
              {cartCtx.items.map((item) => (
                <OrderItem
                  key={item.idItem}
                  amount={item.amount}
                  name={item.itemTitle}
                  pic={item.itemPicture}
                  type={item.itemType}
                  price={item.itemPrice}
                  descr={item.itemDescription}
                />
              ))}
              <div className="border-t-2"></div>
              <OrderComment onAddComment={setCommentHandler} />

              <div className="border-t-2"></div>
              {alertForPayment ? (
                <div className="p-4 m-4 border-2 border-red-300 rounded-xl	">
                  <PaymentDetails
                    onAddTip={setTipHandler}
                    onSetPayment={setPaymentOptionHandler}
                  />
                  <div className="text-center	font-bold	text-red-400">
                    You need to select one payment option!
                  </div>
                </div>
              ) : (
                <div className="p-4 m-4 ">
                  <PaymentDetails
                    onAddTip={setTipHandler}
                    onSetPayment={setPaymentOptionHandler}
                  />
                </div>
              )}
            </div>

            <div className="pt-8 lg:pt-0 lg:pl-48">
              <OrderInTotal
                tip={tip}
                comment={comment}
                paymentOptionIs={paymentOption}
                orderToggle={orderTogglePage}
              />
            </div>
          </div>
        </Fragment>
      ) : (
        <Bill paymentOptionIs={paymentOption} comment={comment} tip={tip} />
      )}

      {alertForItems && <AlertPopUp onClick={closeAlertHandler} />}
    </Fragment>
  );
}
export default OrderPage;
