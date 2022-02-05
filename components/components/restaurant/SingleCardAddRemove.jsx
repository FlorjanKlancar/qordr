import React from "react";
import {useTranslation} from "react-i18next";

function SingleCardAddRemove({currentItem, onRemove, onAdd}) {
  const {t} = useTranslation();

  function itemsHandler(e) {
    e.stopPropagation();

    onAdd();
  }

  return (
    <div className="grid grid-cols-1 items-center text-center w-full ">
      {!currentItem?.length ? (
        <button
          className="bg-default text-white font-bold py-2 px-4 rounded "
          onClick={itemsHandler}
        >
          {t("restaurant_cart_button")}
        </button>
      ) : (
        <div className="grid grid-cols-3 items-center text-center w-full h-full">
          <div
            className="hover:bg-gray-100 text-grey-900 font-semibold  py-2 px-4 border text-grey-300 rounded"
            onClick={(e) => {
              e.stopPropagation();

              onRemove();
            }}
          >
            -
          </div>
          <div
            className="hover:bg-gray-100 text-grey-900 font-semibold  py-2 px-4 border text-grey-300 rounded "
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {currentItem[0].amount}
          </div>
          <div
            className="hover:bg-gray-100 text-grey-900 font-semibold  py-2 px-4 border text-grey-300 rounded"
            onClick={(e) => {
              e.stopPropagation();

              onAdd();
            }}
          >
            +
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleCardAddRemove;
