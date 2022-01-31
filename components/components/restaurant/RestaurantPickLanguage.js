import Image from "next/image";
import qOrder from "../../../public/qOrder.png";
import React, { useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import i18n from "i18next";
import { useTranslation } from "react-i18next";

export default function RestaurantPickLanguage(props) {
  const { t } = useTranslation();

  const [alert, setAlert] = useState(false);

  function submitHandler() {
    setAlert(false);
    props.pickLang("SI");
  }
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <div className="mt-52 sm:w-2/3 md:w-1/2 lg:w-1/3 m-auto">
      <div className="max-w-sm h-28 relative m-auto">
        <Image src={qOrder} alt="Logo" layout="fill" />
      </div>

      <div className="text-gray-400 text-center font-bold -mt-1">
        Value Your Time!
      </div>

      <div className="text-gray-400 text-center  mt-6 p-6">
        {t("welcome_text")}
      </div>

      <div className="w-3/4 m-auto">
        <ReactFlagsSelect
          countries={["GB", "SI"]}
          customLabels={{ GB: "English", SI: "Slovenščina" }}
          selected={i18n.language}
          onSelect={(code) => changeLanguage(code)}
          placeholder="Select your language"
        />
      </div>

      <div className="w-3/4 m-auto mt-8 ">
        <button
          className="w-full bg-default text-white rounded font-bold h-8"
          onClick={submitHandler}
        >
          {t("welcome_button")}
        </button>
      </div>
    </div>
  );
}
