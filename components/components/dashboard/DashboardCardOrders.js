import DashboardOrderRow from "./DashboardOrderRow";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import CreditScoreIcon from "@mui/icons-material/CreditScore";

export default function DashboardCardOrders({ orders }) {
  return (
    <div>
      <div className="border-b p-3 border-gray-100 dark:border-gray-600 dark:bg-gray-800">
        <p className="font-semibold text-lg dark:text-gray-200 ">
          Restaurant recent orders
        </p>
      </div>

      <div className="flex flex-col w-full">
        <div>
          <div className="align-middle inline-block w-full">
            <div className="overflow-y-auto" id="dashboard_scroll">
              <table className="w-full divide-y divide-gray-200 dark:divide-gray-600">
                <thead className="bg-gray-50 sticky top-0 z-50 dark:bg-gray-800 ">
                  <tr>
                    <th
                      scope="col"
                      className="h-full px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white"
                    >
                      Table
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white"
                    >
                      <CreditScoreIcon />
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white"
                    >
                      <AccessTimeIcon />
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white"
                    >
                      Status
                    </th>
                    <th scope="col" className="relative px-6 py-3 ">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200 overflow-x-auto dark:bg-gray-800 dark:divide-gray-600">
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
