import React from "react";
import Image from "next/dist/client/image";

function OrderItem(props) {
  const totalAmountPerProduct = (props.price * props.amount).toFixed(2);

  return (
    <div className="border-t-2 w-11/12 m-auto p-2">
      <div className="grid grid-cols-2 gap-2">
        <div className="h-28 w-44 lg:h-24 lg:w-36 relative">
          <Image alt="Picture" src={props.pic} layout="fill" />
        </div>
        <div className="pl-4">
          <div className="text-md font-medium	">{props.name}</div>
          <div>
            <div className="p-2 text-sm">
              {props.price.toFixed(2)}€
              <span className="text-default"> x {props.amount}</span>
              <div className="">{totalAmountPerProduct}€</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default OrderItem;
