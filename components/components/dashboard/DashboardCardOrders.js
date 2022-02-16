import DashboardOrderRow from "./DashboardOrderRow";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import CreditScoreIcon from "@mui/icons-material/CreditScore";

export default function DashboardCardOrders({orders}) {
  return (
    <div>
      <div className="border-b p-3 border-gray-100">
        <p className="font-semibold text-lg">Restaurant recent orders</p>
      </div>

      <div className="flex flex-col w-full">
        <div>
          <div className="align-middle inline-block w-full ">
            <div className="overflow-y-auto p-3" id="dashboard_scroll">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0 z-50">
                  <tr>
                    <th
                      scope="col"
                      className="h-full px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Table
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <CreditScoreIcon />
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <AccessTimeIcon />
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200 overflow-x-auto">
                  {orders.length ? (
                    orders.map((order, index) => (
                      <DashboardOrderRow key={index} order={order} />
                    ))
                  ) : (
                    <tr className="text-center h-full ">
                      <td
                        colSpan="5"
                        className="font-semibold h-12 text-gray-400"
                      >
                        Currently no orders!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
