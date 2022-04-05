import Head from "next/head";
import React, {Fragment} from "react";
import EditProductsPage from "../../../../../components/components/dashboard/editProducts/EditProductsPage";
import LayoutDashboard from "../../../../../components/layout/LayoutDashboard";

function createItem() {
  return (
    <Fragment>
      <Head>
        <title>Edit product - </title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;600;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <LayoutDashboard>
        <div id="container">
          <EditProductsPage />
        </div>
      </LayoutDashboard>
    </Fragment>
  );
}

export default createItem;
