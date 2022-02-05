import {Fragment} from "react";
import React, {useState} from "react";
import Image from "next/image";
import {CSSTransition} from "react-transition-group";
import {HeartIcon} from "@heroicons/react/solid";
import {XIcon} from "@heroicons/react/solid";
import redBackground from "../../../public/Screenshot_1.png";
import SingleCardAddRemove from "./SingleCardAddRemove";

function SingleCard(props) {
  const [open, setOpen] = useState(false);

  const currentItem = props.ctxItems.filter(
    (item) => item.id == props.id && <div key={item.id}>{item.amount}</div>
  );

  return (
    <Fragment>
      {!open && (
        <div
          className={`w-11/12 mx-auto rounded-xl border shadow-lg mt-4`}
          key={props.id}
          onClick={() => setOpen(!open)}
        >
          <div className="w-full h-24 relative flex justify-between p-2">
            <Image
              className="opacity-80"
              src={redBackground}
              layout="fill"
              objectFit="cover"
            />
            <div className="w-36 h-20 relative border-2 border-black border-opacity-10 rounded">
              <Image
                alt={props.title}
                src={props.img}
                layout="fill"
                objectFit="fill"
                className="rounded"
              />
            </div>
            <div className="relative flex flex-col ">
              <div className="bg-white rounded border-2 border-black border-opacity-10 w-20 text-center self-end	">
                <span className="font-medium text-lg">
                  € {props.price.toFixed(2)}
                </span>
              </div>

              {props.restaurantRecommends && (
                <div className="flex text-xs sm:text-sm p-1 font-semibold text-red-500 rounded border-2 border-red-700 border-opacity-10 bg-red-200 mt-1">
                  <span>
                    {<HeartIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1 " />}
                  </span>{" "}
                  Popular item
                </div>
              )}
            </div>
          </div>

          <hr className="solid" />

          <div className="p-2">
            <div className="text-xl font-medium ">{props.title}</div>

            <p className="text-sm text-gray-500">
              {props.description
                ? props.description.length < 100
                  ? props.description
                  : props.description.substring(0, 97) + "..."
                : ""}
            </p>
          </div>
        </div>
      )}

      <CSSTransition
        in={open}
        timeout={300}
        classNames="alert"
        unmountOnExit
        onEnter={() => setOpen(true)}
        onExited={() => setOpen(false)}
      >
        <div
          className="w-11/12 mx-auto rounded-xl border shadow-lg mt-4"
          key={props.id}
          onClick={() => setOpen(!open)}
        >
          <div className="">
            <div className="h-56 mb-1 relative ">
              <Image
                alt="Picture"
                src={props.img}
                layout="fill"
                objectFit="fill"
                className="rounded-lg"
              />
              <div className="absolute right-4 top-4 z-10 border-2 border-gray-300 rounded-full p-2 text-gray-300 hover:cursor-pointer">
                <XIcon className="w-5 h-5 text-gray-500" />
              </div>
            </div>

            <hr />

            <div className="p-2">
              <div className="text-xl font-medium text-black">
                {props.title}
              </div>
              <p className="text-sm text-gray-500">{props.description}</p>
              <div className="text-gray-600 font-medium mt-2">
                {props.price.toFixed(2)}€
              </div>
            </div>

            <hr />
            <div className="p-4">
              <SingleCardAddRemove
                currentItem={currentItem}
                onAdd={props.onAdd}
                onRemove={props.onRemove}
              />
            </div>
          </div>
        </div>
      </CSSTransition>
    </Fragment>
  );
}
export default SingleCard;
