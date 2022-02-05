import {Fragment, useContext} from "react";
import TopPicksCard from "./TopPicksCard";
import CartContext from "../store/cart-context";

const TopPicks = (props) => {
  const cartCtx = useContext(CartContext);

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item, amount: 1});
  };

  return (
    <Fragment>
      <div
        className="ml-4 mr-4 text-2xl border-b-2 border-gray-400 text-center "
        id="toppicks_header"
      >
        Top picks
      </div>
      <div className="relative w-full flex gap-6 snap-x snap-mandatory overflow-x-auto p-4">
        {props &&
          props.favItems?.map((item) => (
            <TopPicksCard
              pic={item.item.picture}
              price={item.item.price}
              title={item.item.title}
              desc={item.item.description}
              key={item.item.id}
              id={item.item.id}
              onRemove={cartItemRemoveHandler.bind(null, item.item.id)}
              onAdd={cartItemAddHandler.bind(null, item.item)}
              ctxItems={cartCtx.items}
            />
          ))}
      </div>
    </Fragment>
  );
};

export default TopPicks;
