import React, { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSession } from "next-auth/react";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import EditIcon from "@material-ui/icons/Edit";
import ListIcon from "@material-ui/icons/List";
import PersonIcon from "@material-ui/icons/Person";
import HistoryIcon from "@material-ui/icons/History";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import qOrder from "../../../public/Q-Order.png";
import Image from "next/image";

const DashboardTopbar = (props) => {
  const router = useRouter();
  const restaurantName = router.query.restaurantName;

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const { data: session } = useSession();
  console.log("session", session);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {
          <div className="xl:invisible">
            <div className="">
              <div
                className={`transform xl:w-3/12 w-full p-2 py-4 border rounded-xl bg-gradient-to-r from-blue-500 to-blue-600`}
              >
                <div className="flex justify-between">
                  <div className=" w-8  h-8 flex items-center justify-center">
                    <CloseIcon
                      className=" text-gray-300"
                      onClick={() => setState(false)}
                    />
                  </div>
                  {/*  <div className="rounded-full h-12 w-12 flex items-center justify-center bg-gray-300 bg-opacity-30">
                    <Avatar alt={user.name} src={user.picture} />
                  </div> */}
                </div>
                <p className="text-gray-200 text-base font-bold  ">Profile</p>
                {/*  <p className="text-gray-50 text-lg">{user.name}</p> */}
                <p className="text-gray-300 text-sm">Administrator</p>
              </div>

              <h1 className="text-gray-400 p-2 font-semibold text-lg">Menu</h1>

              <Link
                href={{
                  pathname: "/[restaurantName]/dashboard/",
                  query: { restaurantName: restaurantName },
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
                    <p className="">Dashbord</p>
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
                  query: { restaurantName: restaurantName },
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
                  query: { restaurantName: restaurantName },
                }}
              >
                <div
                  className={
                    router.pathname ==
                    "/[restaurantName]/dashboard/editProducts"
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
                  query: { restaurantName: restaurantName },
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
        }
      </List>
      <Divider />
      <div className="ml-8">
        <Image src={qOrder} alt="qOrder" width={150} height={56} />
      </div>
    </Box>
  );

  return (
    <div
      className="flex shadow-sm bg-white  xl:p-4 justify-between h-14"
      id="header_dashboard"
    >
      <div className="w-1/12 xl:hidden pt-4  ">
        <div>
          <Button onClick={toggleDrawer("left", true)}>
            <MenuIcon />
          </Button>
          <Drawer
            left={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
        </div>
      </div>
      <div className="flex flex-wrap mt-5 ml-5 space-x-1 xl:p-0 w-6/12 xl:w-1/3 xl:mt-0 xl:ml-0">
        <p className="text-gray-400 ">Restaurant: </p>
        <p className="font-semibold">{props.restaurantData}</p>
      </div>
      <div className="p-2 flex xl:space-x-2 text-gray-400 mr-3 xl:mr-0  w-3/12 xl:w-5/12 xl:justify-end	">
        <div className="flex-1 mt-4  ml-4 xl:invisible">Logout</div>
        <div className="flex-1 xl:invisible mt-4 xl:pl-0 ml-2">
          <Link href="/api/auth/logout">
            <LogoutIcon />
          </Link>
        </div>
        <div className="-mt-4 rounded-full h-12 w-12 flex items-center justify-center bg-gray-300 bg-opacity-30 invisible xl:visible">
          <Avatar alt={session?.user.name} src={session?.user.image} />
        </div>
        <div className="invisible xl:visible">
          Welcome {session?.user.name}!
        </div>

        <div className="invisible xl:visible">
          <Link
            className="xl:p-2 text-gray-600 font-semibold"
            href="/api/auth/logout"
          >
            Logout
          </Link>

          <LogoutIcon />
        </div>
      </div>
    </div>
  );
};

export default DashboardTopbar;
