import { Fragment } from "react";
import React, { useState } from "react";
import Image from "next/image";
import { CSSTransition } from "react-transition-group";
//import FavoriteIcon from "@mui/icons-material/Favorite";
import redBackground from "../../../public/Screenshot_1.png";
import { useTranslation } from "react-i18next";

function SingleCard(props) {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [item, setItem] = useState(0);
  const [plus, setPlus] = useState(false);

  function itemsHandler(e) {
    e.stopPropagation();
    setItem(item + 1);
    setPlus(true);
    props.onAdd();
  }

  return (
    <Fragment>
      {!open ? (
        <div
          className={
            props.description.length > 0
              ? "w-11/12 md:w-8/12 lg:w-full h-48 mx-auto rounded-xl border shadow-lg grid grid-cols-3 items-center mt-4 "
              : "w-11/12 md:w-8/12 lg:w-full h-42 mx-auto rounded-xl border shadow-lg grid grid-cols-3 items-center mt-4 "
          }
          key={props.id}
          onClick={() => setOpen(!open)}
        >
          <div className="relative w-full h-24 col-span-3 ">
            <Image
              className="opacity-80 mx-auto rounded-xl"
              src={redBackground}
              layout="fill"
            />

            <div className="w-36 h-20 lg:w-52 lg:h-28 relative left-2 top-2 float-left border-2 border-black border-opacity-10 rounded -mt-1">
              <Image
                alt={props.title}
                src={props.img}
                layout="fill"
                objectFit="fill"
                className="rounded"
              />
            </div>

            <div className="float-right w-1/3 relative mr-2 mt-2">
              <div className="float-right w-20  font-light text-center  bg-white rounded border-2 border-black border-opacity-10	">
                <span className="font-medium text-lg	">
                  € {props.price.toFixed(2)}
                </span>
              </div>
              {props.restaurantRecommends && (
                <div className="mt-1 p-1 float-right font-semibold text-right lg:p-2 text-xs lg:text-sm text-red-500 rounded border-2 border-red-700 border-opacity-10 bg-red-200">
                  <span>
                    {/*<FavoriteIcon
                      className="text-sm text-red-600"
                      fontSize="small"
                    />*/}
                  </span>{" "}
                  Popular item
                </div>
              )}
            </div>
          </div>

          <hr className="col-span-3 solid w-full m-auto " />

          <div className="col-span-3 pb-4">
            <div className="text-left text-black">
              <div className="pl-2 text-xl font-medium ">{props.title}</div>
            </div>
            <div></div>
            <p className="pl-2 text-left text-sm text-gray-500">
              {props.description.length < 100
                ? props.description
                : props.description.substring(0, 97) + "..."}
            </p>
          </div>
        </div>
      ) : null}

      <CSSTransition
        in={open}
        timeout={300}
        classNames="alert"
        unmountOnExit
        onEnter={() => setOpen(true)}
        onExited={() => setOpen(false)}
      >
        <div
          className="w-11/12 md:w-6/12 lg:w-full mx-auto bg-white rounded-xl shadow-md mt-2  border-2	border-gray-200	relative"
          key={props.id}
          onClick={() => setOpen(!open)}
        >
          <div className="grid grid-auto-rows p-1">
            <div className="absolute right-4 top-4 z-10">
              <button className="border-2 border-gray-300 rounded-full h-12 w-12 flex items-center justify-center">
                <i className="fas fa-times text-gray-300"></i>
              </button>
            </div>
            <div className="h-56 lg:h-80 mb-2 relative">
              <Image
                alt="Picture"
                src={props.img}
                layout="fill"
                objectFit="fill"
                className="rounded-lg"
              />
            </div>

            <hr className="solid w-full m-auto" />

            <div className="p-4">
              <div className="text-xl font-medium text-black">
                {props.title}
              </div>
              <p className="text-sm text-gray-500">{props.description}</p>
              <span className="text-grey-600 font-medium">
                {props.price.toFixed(2)}€
              </span>
            </div>

            <hr className="solid w-full m-auto" />

            <div className="p-4">
              <div className="grid grid-cols-1 items-center text-center w-full ">
                {!plus ? (
                  <button
                    className="bg-default text-white font-bold py-2 px-4 rounded "
                    onClick={itemsHandler}
                  >
                    {t("restaurant_cart_button")}
                  </button>
                ) : null}

                {plus ? (
                  <div className="grid grid-cols-3 items-center text-center w-full h-full">
                    <div
                      className="hover:bg-gray-100 text-grey-900 font-semibold  py-2 px-4 border text-grey-300 rounded"
                      onClick={(e) => {
                        e.stopPropagation();

                        if (item > 1) {
                          setItem(item - 1);
                          props.onRemove();
                        } else {
                          setItem(item - 1);
                          props.onRemove();
                          setPlus(false);
                        }
                      }}
                    >
                      -
                    </div>
                    <div
                      className="hover:bg-gray-100 text-grey-900 font-semibold  py-2 px-4 border text-grey-300 rounded "
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      {props.cartCtx.items.map(
                        (item) =>
                          item.idItem == props.id && (
                            <div key={item.idItem}>{item.amount}</div>
                          )
                      )}
                    </div>
                    <div
                      className="hover:bg-gray-100 text-grey-900 font-semibold  py-2 px-4 border text-grey-300 rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        setItem(item + 1);
                        props.onAdd();
                      }}
                    >
                      +
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>
    </Fragment>
  );
}
export default SingleCard;
