import {Fragment, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import Image from "next/image";

export default function TopPicksOpenCard(props) {
  return (
    <Fragment>
      <Transition.Root show={props.open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto "
          onClose={props.setOpen}
        >
          <div className="flex items-end justify-center min-h-screen  pb-56 text-center  min-w-screen">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-10/12 p-2 ">
                <div className="w-full h-56 relative">
                  <Image
                    src={props.item.pic}
                    layout="fill"
                    objectFit="fill"
                    className="rounded-lg"
                  />
                </div>

                <hr className="col-span-3 solid w-full m-auto mt-2" />
                <div className="p-2">
                  <div className="pl-2 pr-2 text-xl font-medium text-black ">
                    {props.item.title}
                  </div>

                  <div className="pl-2 pr-2 overflow-y-auto text-sm text-gray-500">
                    <div>{props.item.desc}</div>
                  </div>

                  <div className="pl-2 pr-2 text-grey-600 font-medium">
                    € {props.item.price}
                  </div>
                </div>

                <hr className="col-span-3 solid w-full m-auto mt-2" />
                <div className="bg-gray-50 px-4 py-3 w-full">
                  <button
                    type="button"
                    className="w-1/2 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 "
                    onClick={() => props.setOpen(false)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="w-1/2 bg-default text-white font-bold py-2 px-4 rounded "
                  >
                    Add to cart!
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </Fragment>
  );
}
