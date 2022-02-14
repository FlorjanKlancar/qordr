import {Fragment} from "react";
import {Dialog, Transition} from "@headlessui/react";
import Image from "next/image";
import {XIcon} from "@heroicons/react/solid";

export default function TopPicksOpenCard(props) {
  return (
    <>
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
      <div className="bg-gray-50 px-4 py-3 w-full flex">{props.addRemove}</div>
    </>
  );
}
