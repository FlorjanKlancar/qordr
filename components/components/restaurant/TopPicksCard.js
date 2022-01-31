import Image from "next/image";
import { HeartIcon } from "@heroicons/react/solid";
import { Fragment, useState } from "react";
import TopPicksOpenCard from "./TopPicksOpenCard";

const TopPicksCard = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <div
        className="snap-center snap-always shrink-0 rounded-xl border shadow-lg border-default border-opacity-30 items-center mt-4 "
        onClick={() => setOpen(true)}
      >
        <div className="relative w-56 h-32 m-2 ">
          <Image
            alt={props.pic}
            src={props.pic}
            layout="fill"
            objectFit="fill"
            className="rounded"
          />
        </div>

        {
          <div
            className={
              "text-center font-medium " +
              (props.title.length > 25 ? "text-sm" : "text-lg")
            }
          >
            {props.title}
          </div>
        }

        <div className="flex p-2 h-12 ">
          <div className="w-1/3 font-light text-center bg-white rounded border-2 border-black border-opacity-10 ">
            <span className="font-medium text-lg">€ {props.price}</span>
          </div>

          <div className="ml-1 flex w-2/3 place-content-center text-base font-semibold text-red-500 rounded border-2 border-red-700 border-opacity-10 bg-red-200 ">
            <span>
              <HeartIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1 mt-1" />
            </span>{" "}
            Popular item
          </div>
        </div>

        <div className="p-2">
          <button className="bg-default text-white font-bold py-2 px-4 rounded w-full ">
            Add to cart
          </button>
        </div>
      </div>

      <TopPicksOpenCard open={open} setOpen={setOpen} item={props} />
    </Fragment>
  );
};

export default TopPicksCard;
