/* This example requires Tailwind CSS v2.0+ */
import {Fragment} from "react";
import {Disclosure, Menu, Transition} from "@headlessui/react";
import {BellIcon, MenuIcon, XIcon} from "@heroicons/react/outline";
import qOrder from "../../../public/Q-Order.png";
import Image from "next/image";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  {name: "Dashboard", href: "#", current: true},
  {name: "Team", href: "#", current: false},
  {name: "Projects", href: "#", current: false},
  {name: "Calendar", href: "#", current: false},
  {name: "Reports", href: "#", current: false},
];
const userNavigation = [
  {name: "Your Profile", href: "#"},
  {name: "Settings", href: "#"},
  {name: "Sign out", href: "#"},
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  return (
    <>
      <div className="min-h-full ">
        <Disclosure as="nav">
          {({open}) => (
            <>
              <div className="mx-auto px-4 sm:px-6 lg:px-16 border-b-2 border-opacity-25">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
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

                  <div className="flex xl:w-2/4 2xl:w-3/4">
                    <p className="text-gray-400 ">Restaurant: </p>
                    <p className="font-semibold">{"pops"}</p>
                  </div>

                  <div className="hidden sm:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <div>Welcome blabla!</div>

                      {/* Profile dropdown */}
                      <Menu as="div" className="ml-3 relative z-50">
                        <div>
                          <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={user.imageUrl}
                              alt=""
                            />
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
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({active}) => (
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
}
