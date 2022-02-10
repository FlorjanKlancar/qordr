import DashboardOrderSingleRow from "./DashboardOrderSingleRow";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import CreditScoreIcon from "@mui/icons-material/CreditScore";

export default function DashboardCardOrders({orders}) {
  return (
    <div>
      <div className="border-b p-3 border-gray-100">
        <p className="font-semibold text-lg">Restaurant recent orders</p>
      </div>
      <div className="flex flex-row w-full text-center font-semibold text-gray-500  p-3">
        <div className="w-1/5">Table</div>

        <div className="w-1/5">
          <CreditScoreIcon />
        </div>
        <div className="w-1/5">
          <AccessTimeIcon />
        </div>

        <div className="w-1/5">Status</div>
      </div>
      <hr />
      {
        <div
          className="divide-y divide-gray-200 overflow-y-auto p-3"
          id="dashboard_scroll"
        >
          {orders.map((order, index) => (
            <DashboardOrderSingleRow key={index} order={order} />
          ))}
          {orders.length == 0 && (
            <div className="text-center text-gray-500 ">
              Currently no orders...
            </div>
          )}
        </div>
      }
    </div>
  );
}
