import Head from "next/head";
import {Fragment} from "react";
import React from "react";
import qOrderWhite from "../public/Q-Order-White.png";
import FirstPage from "../public/First-Page.png";
import Image from "next/image";
import Link from "next/link";

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

      <div className="h-screen sm:h-full md:h-screen bg-gradient-to-br from-sky-700 via-sky-600 to-sky-400 text-gray-200">
        <div className="flex p-5 sm:justify-between justify-center">
          <div>
            <Image src={qOrderWhite} alt="qOrder" width={180} height={36} />
          </div>
          <div className="sm:flex mt-2 hidden">
            <div>Landing page</div>
          </div>
        </div>

        <div className="px-8 md:px-20 lg:px-40 xl:px-60 mt-20 sm:mt-40 flex flex-col md:flex-row justify-center items-center md:justify-between space-y-8 ">
          <div>
            <div className="text-3xl sm:text-5xl">
              Welcome to{" "}
              <span className="underline underline-offset-4 decoration-lime-300 text-lime-300">
                qOrder
              </span>
              <br /> ordering app
            </div>
            <div className="relative mt-10">
              <h4 className="before:absolute before:left-0 before:bottom-2 before:rounded-sm before:h-1 before:bg-gradient-to-r before:from-lime-400 before:to-lime-500 before:mt-1 before:w-12 xl:text-xl md:text-lg ml-16 text-white text-sm">
                Scan, order and pay with qOrder
              </h4>
            </div>
            <div className="text-xs sm:text-sm before:absolute before:left-0 before:bottom-2 before:rounded-sm before:h-1 before:bg-gradient-to-r before:from-lime-400 before:to-lime-500 before:mt-1 before:w-12  ml-16 text-white">
              This app is demo application for food ordering in some restaurant.
              <br />
              Feel free to try it out!
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-x-12 mt-20 sm:space-y-0">
              <button className="px-8 py-3 bg-defaultDark border-default border-2 rounded-xl hover:bg-defaultDark/50">
                <Link href="/pops/1">Ordering app</Link>
              </button>
              <button className="px-8 py-3 bg-default border-defaultDark border-2 rounded-xl hover:bg-defaultDark/50">
                <Link href="/pops/dashboard">Dashboard</Link>
              </button>
            </div>
          </div>

          <div className="relative w-full md:w-1/2 lg:w-1/3 h-[300px] sm:h-[500px]">
            <Image src={FirstPage} alt="qOrder" layout="fill" />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
