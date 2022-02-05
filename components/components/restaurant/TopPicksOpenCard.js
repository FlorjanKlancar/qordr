import {Fragment} from "react";
import {Dialog, Transition} from "@headlessui/react";
import Image from "next/image";
import {XIcon} from "@heroicons/react/solid";

export default function TopPicksOpenCard(props) {
  return (
    <Fragment>
      <Transition.Root show={props.open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-50 inset-0 overflow-y-auto "
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
                  <div className="absolute right-4 top-4 z-10 border-2 border-gray-300 rounded-full p-2 text-gray-300 hover:cursor-pointer">
                    <XIcon
                      className="w-5 h-5 text-gray-500"
                      onClick={() => props.setOpen(false)}
                    />
                  </div>
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
                <div className="bg-gray-50 px-4 py-3 w-full flex">
                  {props.addRemove}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </Fragment>
  );
}
