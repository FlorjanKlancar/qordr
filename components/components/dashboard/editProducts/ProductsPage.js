import {Fragment} from "react";
import ProductsTable from "./ProductsTable";

function ProductsPage(props) {
  return (
    <Fragment>
      <ProductsTable
        restaurantItems={props.restaurantItems}
        updateItemHandler={props.updateItemHandler}
        restaurantCategories={props.restaurantCategories}
      />
    </Fragment>
  );
}
export default ProductsPage;
