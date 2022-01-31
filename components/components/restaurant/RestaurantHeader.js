import React from "react";
import Image from "next/image";
import { IdentificationIcon } from "@heroicons/react/outline";
import { ClockIcon } from "@heroicons/react/outline";

function RestaurantHeader({ restaurantInfo }) {
  return (
    <header className="relative flex justify-center	">
      <div className="h-56">
        <Image
          src={restaurantInfo[0].backgroundPic}
          layout="fill"
          objectFit="cover"
          className="brightness-50"
        />
      </div>
      <div className="absolute inset-y-32 bg-white w-5/6 sm:w-4/6 md:w-2/3 z-10 h-48  rounded-lg shadow-2xl p-4 border-2 border-gray-200 xl:hidden">
        <div>
          <h1 className="text-center text-2xl semi-bold">
            {restaurantInfo[0].restaurantName}
          </h1>
          <div className="pt-2 text-sm text-gray-500">
            <p className="flex p-1">
              <IdentificationIcon className="h-5 w-5 mr-1" />
              {restaurantInfo[0].restaurantAddress}
            </p>
            <p className="flex p-1">
              <ClockIcon className="h-5 w-5 mr-1" />
              {restaurantInfo[0].restaurantWorkingHours}
            </p>
          </div>
          <p className="text-gray-500 p-2">
            {restaurantInfo[0].restaurantDescription}
          </p>
        </div>
      </div>
      <div className="hidden xl:block z-10 absolute bottom-8 left-52 text-6xl text-white">
        {restaurantInfo[0].restaurantName}
      </div>
    </header>
  );
}

export default RestaurantHeader;
