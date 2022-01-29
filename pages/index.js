import Head from "next/head";
import {Fragment} from "react";
import React from "react";

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Ordering app</title>
        <link rel="icon" href="/favicon.ico" />

        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;600;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
    </Fragment>
  );
}
