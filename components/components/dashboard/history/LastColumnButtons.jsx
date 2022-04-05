import React from "react";
import { CheckIcon, MinusIcon, XIcon } from "@heroicons/react/solid";

function LastColumnButtons({ submitStatusHandler, id }) {
  return (
    <div className="flex space-x-3 justify-center ">
      <div
        className="bg-green-300 dark:bg-green-700 rounded p-2 hover:bg-green-400 dark:hover:bg-green-600 cursor-pointer"
        title="Set order as completed"
        onClick={() => submitStatusHandler("completed", id)}
      >
        <CheckIcon className="w-6 h-6 text-green-800 dark:text-green-200" />
      </div>

      <div
        className="bg-orange-300 dark:bg-orange-500 rounded p-2 hover:bg-orange-400 dark:hover:bg-orange-600 cursor-pointer"
        tooltip="Minus"
        title="Set order as pending"
        onClick={() => submitStatusHandler("pending", id)}
      >
        <MinusIcon className="w-6 h-6 text-orange-800 dark:text-orange-200" />
      </div>

      <div
        className="bg-red-300 dark:bg-red-600 rounded p-2 hover:bg-red-400 dark:hover:bg-red-500 cursor-pointer"
        title="Set order as canceled"
        onClick={() => submitStatusHandler("cancel", id)}
      >
        <XIcon className="w-6 h-6 text-red-800 dark:text-red-200" />
      </div>
    </div>
  );
}

export default LastColumnButtons;
