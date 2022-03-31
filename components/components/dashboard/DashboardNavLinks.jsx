import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import EditIcon from "@material-ui/icons/Edit";
import ListIcon from "@material-ui/icons/List";
import HistoryIcon from "@material-ui/icons/History";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { XIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";

function DashboardNavLinks({ toggleDrawer, isDarkMode, themeHandler }) {
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);

  const router = useRouter();
  const restaurantName = router.query.restaurantName;
  return (
    <div className="px-4 mt-2 space-y-14 ">
      <div className="space-y-4">
        <div className="flex justify-between">
          <h1 className="text-gray-400">Menu</h1>
          <div className="xl:hidden">
            <XIcon
              className="w-5 h-5 hover:cursor-pointer text-defaultDark mt-1"
              onClick={toggleDrawer}
            />
          </div>
        </div>
        <Link
          href={{
            pathname: "/[restaurantName]/dashboard",
            query: { restaurantName: restaurantName },
          }}
        >
          <div
            className={
              router.pathname == "/[restaurantName]/dashboard"
                ? `text-blue-600 ${isDarkTheme ? "bg-gray-800" : "bg-gray-50"}`
                : "text-gray-700 "
            }
          >
            <div
              className={`flex p-3  space-x-4 0  hover:text-blue-600  cursor-pointer  ${
                isDarkTheme
                  ? "hover:bg-gray-900  border-gray-800"
                  : " hover:bg-gray-50 "
              }`}
            >
              <DonutLargeIcon className=" text-gray-300" />
              <p className="">Dashboard</p>
            </div>
          </div>
        </Link>
        <Link
          href={{
            pathname: "/[restaurantName]/dashboard/orders",
            query: { restaurantName: restaurantName },
          }}
        >
          <div
            className={
              router.pathname == "/[restaurantName]/dashboard/orders"
                ? `text-blue-600 ${isDarkTheme ? "bg-gray-800" : "bg-gray-50"}`
                : "text-gray-700 "
            }
          >
            <div
              className={`flex p-3  space-x-4 0  hover:text-blue-600  cursor-pointer  ${
                isDarkTheme
                  ? "hover:bg-gray-900  border-gray-800"
                  : " hover:bg-gray-50 "
              }`}
            >
              <ListIcon className="text-gray-300" />
              <p className="">Orders</p>
            </div>
          </div>
        </Link>
        <Link
          href={{
            pathname: "/[restaurantName]/dashboard/history",
            query: { restaurantName: restaurantName },
          }}
        >
          <div
            className={
              router.pathname == "/[restaurantName]/dashboard/history"
                ? `text-blue-600 ${isDarkTheme ? "bg-gray-800" : "bg-gray-50"}`
                : "text-gray-700 "
            }
          >
            <div
              className={`flex p-3  space-x-4 0  hover:text-blue-600  cursor-pointer  ${
                isDarkTheme
                  ? "hover:bg-gray-900  border-gray-800"
                  : " hover:bg-gray-50 "
              }`}
            >
              <HistoryIcon className="text-gray-300" />
              <p className="">Orders history</p>
            </div>
          </div>
        </Link>
        <Link
          href={{
            pathname: "/[restaurantName]/dashboard/editProducts",
            query: { restaurantName: restaurantName },
          }}
        >
          <div
            className={
              router.pathname == "/[restaurantName]/dashboard/editProducts"
                ? `text-blue-600 ${isDarkTheme ? "bg-gray-800" : "bg-gray-50"}`
                : "text-gray-700 "
            }
          >
            <div
              className={`flex p-3  space-x-4 0  hover:text-blue-600  cursor-pointer  ${
                isDarkTheme
                  ? "hover:bg-gray-900  border-gray-800"
                  : " hover:bg-gray-50 "
              }`}
            >
              <EditIcon className="text-gray-300" />
              <p className=" ">Items</p>
            </div>
          </div>
        </Link>
        <Link
          href={{
            pathname: "/[restaurantName]/dashboard/overview",
            query: { restaurantName: restaurantName },
          }}
        >
          <div
            className={
              router.pathname == "/[restaurantName]/dashboard/overview"
                ? `text-blue-600 ${isDarkTheme ? "bg-gray-800" : "bg-gray-50"}`
                : "text-gray-700 "
            }
          >
            <div
              className={`flex p-3  space-x-4 0  hover:text-blue-600  cursor-pointer  ${
                isDarkTheme
                  ? "hover:bg-gray-900  border-gray-800"
                  : " hover:bg-gray-50 "
              }`}
            >
              <QueryStatsIcon className="text-gray-300" />
              <p className="">Overview</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default DashboardNavLinks;
