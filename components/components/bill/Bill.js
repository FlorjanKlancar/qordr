import React, {Fragment, useContext} from "react";
import CartContext from "../store/cart-context";
import ListItems from "./ListItems";
import Lottie from "react-lottie";
import animationData from "../../../public/lottie/waiter.json";
import Confetti from "react-confetti";

function Bill(props) {
  const cartCtx = useContext(CartContext);
  const comment = props.comment;
  const tip = props.tip * 1;
  const totalAmount = (cartCtx.totalAmount + tip).toFixed(2);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Fragment>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Confetti recycle={false} />
      </div>

      <div className="p-4 items-center text-center	 text-xl font-medium">
        Thank you for your order we will deliver it to you shortly!
      </div>

      <div className="w-10/12 m-auto">
        <Lottie
          options={defaultOptions}
          height={400}
          width={300}
          isClickToPauseDisabled={true}
        />
      </div>

      <div className="mt-8 w-10/12 lg:w-1/3 bg-white rounded-lg shadow m-auto">
        <ul className="divide-y-2 divide-gray-100">
          {cartCtx.items.map((item) => (
            <ListItems
              item={item.title}
              price={item.price}
              amount={item.amount}
              key={item.id}
            />
          ))}
          {tip > 0 && (
            <li key={props.key} className="p-3 text-sm">
              Tip for waiter
              <span className="float-right">{tip}€</span>
            </li>
          )}
        </ul>
      </div>
      <div className="pt-4 font-bold items-center text-center float-right pr-8 lg:float-none lg:pr-0">
        In total: {(totalAmount - tip).toFixed(2)}€
      </div>
      <div className="mt-8 pt-8 items-center text-center	text-xl font-medium">
        Paid by {props.paymentOptionIs}
      </div>
      {comment && (
        <div className="pt-8 items-center text-center	text-xl font-medium">
          Your comment was:
          <div className="items-center text-center text-base font-normal">
            {comment}
          </div>
        </div>
      )}
    </Fragment>
  );
}
export default Bill;
