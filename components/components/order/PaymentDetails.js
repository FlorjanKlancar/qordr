import React, {useState} from "react";
import {useTranslation} from "react-i18next";

function PaymentDetails(props) {
  const {t} = useTranslation();

  const [cardOption, setCardOption] = useState(false);
  const [cashOption, setCashOption] = useState(false);

  function cardOptionHandler() {
    if (cashOption == true) setCashOption(false);
    setCardOption(!cardOption);
    props.onSetPayment("card");
  }

  function cashOptionHandler() {
    if (cardOption == true) setCardOption(false);
    setCashOption(!cashOption);
    props.onSetPayment("cash");
  }

  //if (cardOption === false && cashOption === false) props.onSetPayment("");

  return (
    <div className="grid grid-cols-2 gap-2 w-full">
      <div className="col-span-2 font-bold text-xl">{t("payment_header")}</div>
      {cardOption ? (
        <div
          className="col-span-2 p-2 bg-gray-200 border-gray-400	border-2 rounded-lg m-auto w-full"
          onClick={cardOptionHandler}
        >
          <i className="far fa-credit-card fa-2x"></i>
          <div className="pl-2 inline-block text-sm">{t("payment_card")}</div>
        </div>
      ) : (
        <div
          className="col-span-2 p-2 border-gray-200	border-2 rounded-lg block m-auto w-full"
          onClick={cardOptionHandler}
        >
          <i className="far fa-credit-card fa-2x"></i>
          <div className="pl-2 inline-block text-sm">{t("payment_card")}</div>
        </div>
      )}

      {cashOption ? (
        <div
          className="col-span-2 p-2 bg-gray-200 border-gray-400	border-2 rounded-lg m-auto w-full"
          onClick={cashOptionHandler}
        >
          <i className="far fa-money-bill-alt fa-2x"></i>
          <div className="pl-2 inline-block text-sm ">{t("payment_cash")}</div>
        </div>
      ) : (
        <div
          className="col-span-2 p-2 border-gray-200	border-2 rounded-lg m-auto w-full"
          onClick={cashOptionHandler}
        >
          <i className="far fa-money-bill-alt fa-2x"></i>
          <div className="pl-2 inline-block text-sm">{t("payment_cash")}</div>
        </div>
      )}

      <div className="pt-6  ">
        <i className="fas fa-hands fa-2x"></i>
        <div className="pl-2 inline-block text-sm">{t("payment_tip")}</div>
      </div>

      <div className="pt-8 ">
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">€</span>
          </div>
          <input
            type="number"
            name="price"
            id="price"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
            placeholder="0.00"
            autoComplete="off"
            onChange={(e) => props.onAddTip(e.target.value)}
          />
        </div>
      </div>
      <div></div>
    </div>
  );
}
export default PaymentDetails;
