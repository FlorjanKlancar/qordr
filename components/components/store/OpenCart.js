import {Fragment, useContext} from "react";
import CartContext from "./cart-context";
import CartSingleItem from "./CartSingleItem";
import Link from "next/link";
import {useRouter} from "next/router";
import {useTranslation} from "react-i18next";

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
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center m-auto font-bold text-2xl	">
            {t("cart_header")}
          </div>
          <div className="divide-y ">
            <button
              className="float-right border-2 border-gray-500	 hover:bg-gray-300 text-gray-900 font-bold py-2 px-4 rounded-full"
              onClick={props.onClick}
            >
              <i className="fas fa-times"></i>
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
