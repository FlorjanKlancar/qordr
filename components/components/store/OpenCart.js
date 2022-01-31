import {Fragment, useContext} from "react";
import CartContext from "./cart-context";
import CartSingleItem from "./CartSingleItem";
import Link from "next/link";
import {useRouter} from "next/router";
import {useTranslation} from "react-i18next";
import {XIcon} from "@heroicons/react/solid";

function OpenCart(props) {
  const {t} = useTranslation();
  const cartCtx = useContext(CartContext);
  const totalAmount = cartCtx.totalAmount.toFixed(2);
  const hasItems = cartCtx.items.length;

  const router = useRouter();
  const restaurantName = router.query.restaurantName;
  const tableNr = router.query.tableNr;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item, amount: 1});
  };

  return (
    <Fragment>
      <div className="max-h-96	overflow-scroll">
        <div className="flex justify-between">
          <div className="font-bold text-2xl p-2">{t("cart_header")}</div>
          <div className="divide-y ">
            <button
              className="border-2 border-gray-500	 hover:bg-gray-300 text-gray-900 font-bold rounded-full p-2"
              onClick={props.onClick}
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
        {cartCtx.items.map((item) => (
          <CartSingleItem
            key={item.idItem}
            img={item.itemPicture}
            title={item.itemTitle}
            amount={item.amount}
            price={item.itemPrice}
            onRemove={cartItemRemoveHandler.bind(null, item.idItem)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        ))}
      </div>
      {hasItems > 0 && (
        <Fragment>
          <div className="border-t-2 text-center mt-4 font-bold text-2xl pt-2">
            {t("cart_total")} {totalAmount} €
          </div>

          <div className="pt-6">
            <Link
              href={{
                pathname: "/[restaurantName]/[tableNr]/order",
                query: {restaurantName: restaurantName, tableNr: tableNr},
              }}
              items={cartCtx}
            >
              <button className="w-full bg-default text-white font-bold py-2 px-4 rounded ">
                {t("open_cart_button")}
              </button>
            </Link>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
export default OpenCart;