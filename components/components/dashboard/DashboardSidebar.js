import React from "react";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import EditIcon from "@material-ui/icons/Edit";
import ListIcon from "@material-ui/icons/List";
import PersonIcon from "@material-ui/icons/Person";
import HistoryIcon from "@material-ui/icons/History";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import {useRouter} from "next/router";
import Link from "next/link";
import Image from "next/image";
import qOrder from "../../../public/Q-Order.png";

const DashboardSidebar = () => {
  const router = useRouter();
  const restaurantName = router.query.restaurantName;

  return (
    <div className="w-72 h-screen shadow-2xl fixed bg-white invisible xl:visible">
      <div className=" border-b flex justify-around ">
        <Image
          src={qOrder}
          alt="Picture of the author"
          width={150}
          height={56}
        />
      </div>
      <div className="p-4 space-y-14">
        <div className="space-y-4">
          <h1 className="text-gray-400">Menu</h1>

          <Link
            href={{
              pathname: "/[restaurantName]/dashboard",
              query: {restaurantName: restaurantName},
            }}
          >
            <div
              className={
                router.pathname == "/[restaurantName]/dashboard"
                  ? "text-blue-600 bg-gray-50"
                  : "text-gray-700 "
              }
            >
              <div className="flex p-3  space-x-4 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer">
                <DonutLargeIcon className=" text-gray-300" />
                <p className="">Dashboard</p>
              </div>
            </div>
          </Link>

          <Link
            href={{
              pathname: "/[restaurantName]/dashboard/orders",
              query: {restaurantName: restaurantName},
            }}
          >
            <div
              className={
                router.pathname == "/[restaurantName]/dashboard/orders"
                  ? "text-blue-600 bg-gray-50"
                  : "text-gray-700 "
              }
            >
              <div className="flex p-3  space-x-4 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  ">
                <ListIcon className="text-gray-300" />
                <p className="">Orders</p>
              </div>
            </div>
          </Link>

          <Link
            href={{
              pathname: "/[restaurantName]/dashboard/history",
              query: {restaurantName: restaurantName},
            }}
          >
            <div
              className={
                router.pathname == "/[restaurantName]/dashboard/history"
                  ? "text-blue-600 bg-gray-50"
                  : "text-gray-700 "
              }
            >
              <div className="flex p-3  space-x-4 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  ">
                <HistoryIcon className="text-gray-300" />
                <p className="">Orders history</p>
              </div>
            </div>
          </Link>

          <Link
            href={{
              pathname: "/[restaurantName]/dashboard/editProducts",
              query: {restaurantName: restaurantName},
            }}
          >
            <div
              className={
                router.pathname == "/[restaurantName]/dashboard/editProducts"
                  ? "text-blue-600 bg-gray-50"
                  : "text-gray-700 "
              }
            >
              <div className="flex p-3  space-x-4 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  ">
                <EditIcon className="text-gray-300" />
                <p className=" ">Items</p>
              </div>
            </div>
          </Link>

          <Link
            href={{
              pathname: "/[restaurantName]/dashboard/overview",
              query: {restaurantName: restaurantName},
            }}
          >
            <div
              className={
                router.pathname == "/[restaurantName]/dashboard/overview"
                  ? "text-blue-600 bg-gray-50"
                  : "text-gray-700 "
              }
            >
              <div className="flex p-3  space-x-4 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  ">
                <QueryStatsIcon className="text-gray-300" />
                <p className="">Overview</p>
              </div>
            </div>
          </Link>

          <div className="">
            <div className="flex p-3  space-x-4 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  ">
              <PersonIcon className="text-gray-300" />
              <p className="text-gray-600  ">Account</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
