import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { CreditCardIcon } from "@heroicons/react/solid";
import { CheckIcon } from "@heroicons/react/solid";
import { CashIcon } from "@heroicons/react/solid";
import { ThumbUpIcon } from "@heroicons/react/solid";

function PaymentDetails(props) {
  const { t } = useTranslation();

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

      <div className="pt-6 px-4 flex justify-between text-gray-500 ">
        <ThumbUpIcon className="w-6 h-6 mr-2" />
        <div className="text-sm mt-1">{t("payment_tip")}</div>

        <div class="flex w-1/3 border-2 border-gray-300 rounded-lg">
          <span class="inline-flex items-center px-3 text-sm text-gray-500">
            €
          </span>
          <input
            type="number"
            class="w-full rounded-lg outline-none pl-2"
            placeholder="Tip"
          />
        </div>
      </div>

      <div></div>
    </div>
  );
}
export default PaymentDetails;
