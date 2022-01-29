import DashboardOrderSingleRow from "./DashboardOrderSingleRow";
import Link from "next/link";
import {useRouter} from "next/router";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CreditScoreIcon from "@mui/icons-material/CreditScore";

export default function DashboardCardOrders(props) {
  const router = useRouter();
  const restaurantName = router.query.restaurantName;

  function getUniqueListBy(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }

  const uniqueOrder = getUniqueListBy(props.orders, "idOrder");

  return (
    <Link
      href={{
        pathname: "/[restaurantName]/dashboard/orders",
        query: {restaurantName: restaurantName},
      }}
    >
      <div className="mt-6 xl:mt-0 bg-white shadow-sm w-full xl:w-4/12 border rounded-xl border-gray-100 xl:ml-4">
        <div className="border-b p-3 border-gray-100">
          <p className="font-semibold text-lg">Restaurant recent orders</p>
        </div>
        <div className="flex flex-row gap-4 w-full text-center h-8 font-semibold text-gray-500 p-1">
          <div className="w-1/4">Table</div>
          <div className="w-1/4">
            <CreditScoreIcon />
          </div>
          <div className="w-1/2">
            <AccessTimeIcon />
          </div>
        </div>
        <hr />
        <div
          className="divide-y divide-gray-200 p-2 overflow-y-auto"
          id="dashboard_scroll"
        >
          {uniqueOrder.map((order, index) => (
            <DashboardOrderSingleRow
              key={index}
              table={order.restaurantTableNr}
              amount={order.totalAmount}
              dateTime={order.created_at}
            />
          ))}
          {uniqueOrder.length == 0 && (
            <div className="text-center text-gray-500 ">
              Currently no orders...
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
