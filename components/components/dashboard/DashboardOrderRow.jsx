import React, {useState} from "react";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import {CheckCircleIcon} from "@heroicons/react/solid";
import {XCircleIcon} from "@heroicons/react/solid";
import {MinusCircleIcon} from "@heroicons/react/solid";
import {EyeIcon} from "@heroicons/react/solid";
import Moment from "react-moment";
import moment from "moment";
import Modal from "../modal/Modal";

function DashboardOrderRow({order}) {
  const [open, setOpen] = useState(false);
  const [orderPage, setOrderPage] = useState();

  function openModalHandler(order) {
    setOpen(true);
    setOrderPage(order);
  }

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div className="relative">
              <TableRestaurantIcon className="text-gray-400" />
              <div className="absolute -top-2 right-0 bg-gray-200 rounded-full w-6 h-6 text-center text-gray-400">
                {order.restaurantTableNr}
              </div>
            </div>
          </div>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex flex-col ">
          <div className="text-black font-bold">
            {order.totalAmount.toFixed(2)}€
          </div>
          <div className="text-xs text-gray-400 capitalize">
            {order.paymentType}
          </div>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="">
          <div className="text-gray-700">
            <div>
              {order.day}
              {" - "}
              {moment(order.timestamp.toDate()).format("HH:mm")}
            </div>
          </div>
          <div className="text-xs text-gray-400 ">
            <Moment fromNow ago>
              {moment(order.timestamp.toDate())}
            </Moment>{" "}
            ago
          </div>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div
          className={`flex flex-row space-x-1 rounded-full items-center justify-center	px-2 py-2 border-2 text-sm capitalize w-24 ${
            order.status === "closed"
              ? "border-green-500 text-green-600 bg-green-100"
              : order.status === "canceled"
              ? "border-red-500 text-red-600 bg-red-100"
              : "border-orange-500 text-orange-600 bg-orange-100"
          } `}
        >
          {order.status === "closed" ? (
            <CheckCircleIcon className="w-5 h-5 mt-0.5" />
          ) : order.status === "canceled" ? (
            <XCircleIcon className="w-5 h-5 mt-0.5" />
          ) : (
            <MinusCircleIcon className="w-5 h-5 mt-0.5" />
          )}

          <div>{order.status}</div>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="hover:cursor-pointer">
          <EyeIcon
            className="w-6 h-6 text-indigo-600 hover:text-indigo-900"
            onClick={() => openModalHandler(order)}
          />
        </div>
      </td>

      <Modal open={open} setOpen={setOpen}>
        {12}
      </Modal>
    </tr>
  );
}

export default DashboardOrderRow;
