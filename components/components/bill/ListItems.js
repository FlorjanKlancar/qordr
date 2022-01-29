import {Fragment} from "react";

function ListItems(props) {
  const price = props.amount * props.price;
  return (
    <Fragment>
      <li className="p-3 text-sm">
        <span className="font-semibold">
          {props.amount}x {props.item}
        </span>
        <br />
        {price.toFixed(2)}€
      </li>
    </Fragment>
  );
}
export default ListItems;
