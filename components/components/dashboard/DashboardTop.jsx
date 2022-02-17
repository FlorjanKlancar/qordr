import {Fragment} from "react";
import {Disclosure, Menu, Transition} from "@headlessui/react";
import {MenuIcon} from "@heroicons/react/outline";
import React, {useState} from "react";
import {useSession, signOut} from "next-auth/react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import qOrder from "../../../public/Q-Order.png";
import Image from "next/image";
import DashboardNavLinks from "./DashboardNavLinks";
import Link from "next/link";

export default function DashboardTop({restaurantData}) {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const {data: session} = useSession();
  console.log("session", session);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({...state, [anchor]: open});
  };

  const list = (anchor) => (
    <Box
      sx={{width: anchor === "top" || anchor === "bottom" ? "auto" : 250}}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <div className="xl:invisible">
          <DashboardNavLinks toggleDrawer={toggleDrawer(anchor, false)} />
        </div>
      </List>
      <Divider />
      <div className="ml-8">
        <Image src={qOrder} alt="qOrder" width={150} height={56} />
      </div>
    </Box>
  );

  return (
    <>
      <Disclosure as="nav">
        {({open}) => (
          <>
            <div className="mx-auto px-4 sm:px-6 lg:px-16 border-b-2 border-opacity-75">
              <div className="flex items-center justify-between h-16">
                <div className="xl:hidden ">
                  <Button onClick={toggleDrawer("left", true)}>
                    <MenuIcon className="h-7 w-7" />
                  </Button>
                  <Drawer
                    left={"left"}
                    open={state["left"]}
                    onClose={toggleDrawer("left", false)}
                  >
                    {list("left")}
                  </Drawer>
                </div>

                <div className="flex items-center hidden lg:block">
                  <div className="flex-shrink-0">
                    <div className="mt-2 ">
                      <Image
                        src={qOrder}
                        alt="qOrder"
                        width={150}
                        height={56}
                      />
                    </div>
                  </div>
                </div>

                {session && (
                  <div className="flex xl:w-2/4 2xl:w-3/4">
                    <p className="text-gray-400 ">Restaurant: </p>
                    <p className="font-semibold">{restaurantData}</p>
                  </div>
                )}

                {session && (
                  <div className="">
                    <div className="ml-4 flex items-center md:ml-6 tracking-wide">
                      <div className="hidden sm:block">
                        Welcome,{" "}
                        <span className="underline underline-offset-2  decoration-defaultDark">
                          {session?.user.name}
                        </span>
                        !
                      </div>

                      <Menu as="div" className="ml-3 relative z-50">
                        <div>
                          <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <div className="h-10 w-10 border-2 rounded-full border-gray-500 relative">
                              <img
                                className="rounded-full"
                                layout="fill"
                                src={session?.user?.image}
                                alt={session?.user?.name}
                              />
                            </div>
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              <Link href="#">
                                <button
                                  className={
                                    "block px-4 py-2 text-sm  w-full text-left hover:bg-gray-100"
                                  }
                                >
                                  Your profile
                                </button>
                              </Link>
                            </Menu.Item>
                            <Menu.Item>
                              <button
                                onClick={signOut}
                                className={
                                  "block px-4 py-2 text-sm  w-full text-left hover:bg-gray-100"
                                }
                              >
                                Sign Out
                              </button>
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </Disclosure>
      <div className="w-[260px] h-screen fixed bg-white invisible xl:visible border-r-2">
        <DashboardNavLinks />
      </div>
    </>
  );
}
