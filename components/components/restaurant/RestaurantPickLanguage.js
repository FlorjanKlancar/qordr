import Image from "next/image";
import qOrder from "../../../public/qOrder.png";
import React, {useState} from "react";
import ReactFlagsSelect from "react-flags-select";
import i18n from "i18next";
import {useTranslation} from "react-i18next";

export default function RestaurantPickLanguage(props) {
  const {t} = useTranslation();

  const [selected, setSelected] = useState();
  const [alert, setAlert] = useState(false);

  function submitHandler() {
    setAlert(false);
    props.pickLang("SI");
  }
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <div className="w-full p-7 lg:w-1/3 lg:m-auto ">
      <div className="w-9/12 h-20 relative m-auto mt-36 md:w-6/12">
        <Image src={qOrder} alt="Logo" layout="fill" />
      </div>

      <div className="m-auto text-gray-400 text-center font-bold -mt-1">
        Value Your Time!
      </div>

      <div className="m-auto text-gray-400 text-center  mt-12 p-6">
        {t("welcome_text")}
      </div>

      <div>
        <ReactFlagsSelect
          countries={["GB", "SI"]}
          customLabels={{GB: "English", SI: "Slovenščina"}}
          selected={i18n.language}
          onSelect={(code) => changeLanguage(code)}
          placeholder="Select your language"
        />
      </div>

      {alert ? (
        <div className="text-red-500">You need to select your language!</div>
      ) : null}
      <div className="w-11/12 m-auto  mt-12 ">
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
