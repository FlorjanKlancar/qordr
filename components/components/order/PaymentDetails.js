import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {CreditCardIcon} from "@heroicons/react/solid";
import {CheckIcon} from "@heroicons/react/solid";
import {CashIcon} from "@heroicons/react/solid";
import {ThumbUpIcon} from "@heroicons/react/solid";

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

  const selectedPaymentStyle = "bg-green-100 border-green-500 text-green-500";
  const notSelectedPaymentStyle = "border-gray-200 text-gray-500";

  //if (cardOption === false && cashOption === false) props.onSetPayment("");

  return (
    <div className="flex flex-col">
      <div className="font-bold text-xl">{t("payment_header")}</div>

      <div className="mt-4 space-y-2">
        <div
          className={`flex justify-between border-2 rounded-lg p-3 ${
            cardOption ? selectedPaymentStyle : notSelectedPaymentStyle
          }`}
          onClick={cardOptionHandler}
        >
          <CreditCardIcon className="w-6 h-6 mr-2" />
          {t("payment_card")}
          {cardOption && <CheckIcon className="w-6 h-6 mr-2 " />}
        </div>
        <div
          className={`flex justify-between border-2 rounded-lg p-3 ${
            cashOption ? selectedPaymentStyle : notSelectedPaymentStyle
          }`}
          onClick={cashOptionHandler}
        >
          <CashIcon className="w-6 h-6 mr-2" />
          {t("payment_cash")}
          {cashOption && <CheckIcon className="w-6 h-6 mr-2 " />}
        </div>
      </div>

      <div className="pt-6 flex justify-between text-gray-500">
        <ThumbUpIcon className="w-6 h-6 mr-2" />
        <div className="inline-block text-sm">{t("payment_tip")}</div>

        <div className="relative rounded-md shadow-sm">
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
