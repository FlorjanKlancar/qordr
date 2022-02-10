import React from "react";

const DashboardCard = (props) => {
  return (
    <div
      className={`mt-2 xl:mt-0 transform hover:scale-105 cursor-pointer transition delay-100 w-full p-2 py-4 shadow-xl border rounded-xl bg-gradient-to-b ${props.color} `}
    >
      <div className="flex justify-between">
        <div></div>
        <div className=" w-10  h-10 flex items-center justify-center  bg-gray-300 rounded-xl m-1  bg-opacity-30">
          {props.icon}
        </div>
      </div>
      <p className="text-gray-200 text-base font-bold  ">{props.title}</p>
      <p className="text-gray-50 text-2xl">
        {props.number}
        {props.currency == "yes" && <span>€</span>}
      </p>
      {props.bottomText}
    </div>
  );
};

export default DashboardCard;
