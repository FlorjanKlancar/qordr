import {Fragment, useState} from "react";
import Image from "next/dist/client/image";

export default function CartSingleItem(props) {
  const price = (props.price * props.amount).toFixed(2);
  const [showCountButtons, setShowCountButtons] = useState(false);
  return (
    <Fragment>
      <div
        className="grid grid-cols-3 gap-2 pt-2"
        onClick={() => setShowCountButtons(!showCountButtons)}
      >
        <div className="border-t-2 col-span-3"></div>
        <div className="row-span-2 h-16 lg:h-24 lg:w-36 relative">
          <Image alt="Picture" src={props.img} layout="fill" />
        </div>
        <div className="pl-2 text-sm font-normal col-span-2 w-full ">
          <div className="font-semibold w-8/12 float-left">
            {props.title}
            <span className="text-blue-500"> x{props.amount}</span>
          </div>
          <div className="inline float-right pr-2">{price}€</div>
        </div>
        <div className="pl-2 text-sm font-normal col-span-2">
          <span>Count: {props.amount}</span>
          <div className="inline float-right pr-2">
            <div
              className="inline-block text-grey-900 font-semibold px-4 py-1 border text-grey-300 rounded"
              onClick={props.onRemove}
            >
              -
            </div>
            <div
              className="inline-block text-grey-900 font-semibold px-4 py-1 border text-grey-300 rounded"
              onClick={props.onAdd}
            >
              +
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
