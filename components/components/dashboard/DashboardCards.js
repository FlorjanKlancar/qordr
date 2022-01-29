import {Fragment} from "react";
import {useRouter} from "next/router";
import Link from "next/link";

function DashboardCards(props) {
  const router = useRouter();
  const restaurantName = router.query.restaurantName;

  const cards = [
    {
      title: "Total orders",
      amount: props.dashboard[0].orders_SUM,
      subTitle: "11% better than last month",
      icon: (
        <div className="m-auto bg-blue-200 rounded-full h-20 w-20 flex items-center justify-center">
          <i className="far fa-list-alt text-5xl text-blue-600"></i>
        </div>
      ),
    },
    {
      title: "Total income",
      amount: props.dashboard[0].amount_SUM.toFixed(2),
      subTitle: "22% better than last month",
      icon: (
        <div className="m-auto bg-green-200 rounded-full h-20 w-20 flex items-center justify-center">
          <i className="far fa-money-bill-alt text-5xl text-green-700 "></i>
        </div>
      ),
    },
    {
      title: "Most popular table last month",
      amount: "Table 15",
      subTitle: "Last month Table 1",
      icon: (
        <div className="m-auto bg-yellow-200 rounded-full h-20 w-20 flex items-center justify-center ">
          <i className="fas fa-table text-5xl text-yellow-700"></i>
        </div>
      ),
    },
  ];

  return (
    <Fragment>
      <div className="w-full h-36 grid lg:grid-cols-3 gap-8 items-center m-auto">
        {cards.map((card, index) => (
          <div
            key={index}
            className="xl:p-4 w-10/12 m-auto rounded border shadow-lg p-4"
          >
            <div className="grid grid-cols-2 w-full">
              <div>
                <div className="font-bold xl:text-base text-gray-500">
                  {card.title}
                </div>
                <div className="font-semibold text-xl xl:text-2xl text-blue-500">
                  {card.amount}
                </div>
                <div className="text-sm text-gray-500">{card.subTitle}</div>
              </div>

              {card.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-8 p-16 pt-96 md:pt-80 lg:pt-16">
        <Link
          href={{
            pathname: "/restaurant/[restaurantName]/dashboard/orders",
            query: {restaurantName: restaurantName},
          }}
        >
          <div className="rounded-xl shadow-lg items-center p-8 border-4 border-gray-100 h-52 hover:bg-gray-100">
            <div className="text-center text-2xl font-bold text-green-500">
              Orders
            </div>
            <div className="text-6xl items-center text-center p-4 text-green-500">
              <i className="fas fa-utensils "></i>
            </div>
          </div>
        </Link>
        <Link
          href={{
            pathname: "/restaurant/[restaurantName]/dashboard/editProducts",
            query: {restaurantName: restaurantName},
          }}
        >
          <div className="rounded-xl shadow-lg items-center p-8 border-4 border-gray-100 h-52 hover:bg-gray-100">
            <div className="text-center text-2xl font-bold text-indigo-500	">
              Edit your products
            </div>
            <div className="text-6xl items-center text-center p-4 text-indigo-500	">
              <i className="far fa-edit"></i>
            </div>
          </div>
        </Link>

        <Link
          href={{
            pathname: "/restaurant/[restaurantName]/dashboard/overView",
            query: {restaurantName: restaurantName},
          }}
        >
          <div className="rounded-xl shadow-lg items-center p-8 border-4 border-gray-100 h-52 hover:bg-gray-100">
            <div className="text-center text-2xl font-bold text-yellow-800	">
              Overview
            </div>
            <div className="text-6xl items-center text-center p-4 text-yellow-800	">
              <i className="fas fa-history"></i>
            </div>
          </div>
        </Link>

        <div className="rounded-xl  shadow-lg grid grid-cols-3 items-center p-4 border-4 border-gray-100 h-52 hover:bg-gray-100">
          Something else...
        </div>
      </div>
    </Fragment>
  );
}
export default DashboardCards;
