import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {CreditCardIcon} from "@heroicons/react/solid";
import {CheckIcon} from "@heroicons/react/solid";
import {CashIcon} from "@heroicons/react/solid";
import {ThumbUpIcon} from "@heroicons/react/solid";

function PaymentDetails(props) {
  const {t} = useTranslation();

  function paymentSelector(arg) {
    if (arg === props.paymentOption) props.setPaymentOption("");
    else props.setPaymentOption(arg);
  }

  const selectedPaymentStyle = "bg-green-100 border-green-500 text-green-500";
  const notSelectedPaymentStyle = "border-gray-200 text-gray-500";

  return (
    <div className="flex flex-col">
      <div className="font-bold text-xl">{t("payment_header")}</div>
      <div className="mt-4 space-y-2">
        <div
          className={`flex justify-between border-2 rounded-lg p-3 ${
            props.paymentOption === "card"
              ? selectedPaymentStyle
              : notSelectedPaymentStyle
          }`}
          onClick={() => paymentSelector("card")}
        >
          <CreditCardIcon className="w-6 h-6 mr-2" />
          {t("payment_card")}
          {props.paymentOption === "card" && (
            <CheckIcon className="w-6 h-6 mr-2 " />
          )}
        </div>
        <div
          className={`flex justify-between border-2 rounded-lg p-3 ${
            props.paymentOption === "cash"
              ? selectedPaymentStyle
              : notSelectedPaymentStyle
          }`}
          onClick={() => paymentSelector("cash")}
        >
          <CashIcon className="w-6 h-6 mr-2" />
          {t("payment_cash")}
          {props.paymentOption === "cash" && (
            <CheckIcon className="w-6 h-6 mr-2 " />
          )}
        </div>
      </div>

      <div className="pt-6 px-4 flex justify-between text-gray-500 ">
        <ThumbUpIcon className="w-6 h-6 mr-2" />
        <div className="text-sm mt-1">{t("payment_tip")}</div>

        <div className="flex w-1/3 border-2 border-gray-300 rounded-lg">
          <span className="inline-flex items-center px-3 text-sm text-gray-500">
            €
          </span>
          <input
            type="number"
            className="w-full rounded-lg outline-none pl-2"
            placeholder="Tip"
            onChange={(e) => props.onAddTip(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
export default PaymentDetails;
