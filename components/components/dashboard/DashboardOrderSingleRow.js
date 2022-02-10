import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import {CheckCircleIcon} from "@heroicons/react/solid";
import {XCircleIcon} from "@heroicons/react/solid";
import {MinusCircleIcon} from "@heroicons/react/solid";
import {EyeIcon} from "@heroicons/react/solid";
import Moment from "react-moment";
import moment from "moment";
import Modal from "../modal/Modal";
import {useState} from "react";

export default function DashboarOrdersSingleRow({order}) {
  console.log(order);

  const [open, setOpen] = useState(false);
  const [orderPage, setOrderPage] = useState();

  function openModalHandler(order) {
    setOpen(true);
    setOrderPage(order);
  }

  console.log("orderPage", orderPage);
  return (
    <div className="flex flex-row w-full text-center font-semibold text-gray-500 justify-evenly  space-x-16 px-8 py-2">
      <div className="relative h-8 ">
        <TableRestaurantIcon className="text-gray-400" />

        {order.restaurantTableNr}
      </div>

      <div className="flex flex-col ">
        <div className="text-black font-bold">
          {order.totalAmount.toFixed(2)}€
        </div>
        <div className="text-xs text-gray-400 capitalize">
          {order.paymentType}
        </div>
      </div>

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
            {moment(order.timestamp.toDate()).format("YYYY-MM-DD")}
          </Moment>{" "}
          ago
        </div>
      </div>

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

      <div className="hover:cursor-pointer">
        <EyeIcon
          className="w-6 h-6 hover:text-gray-400"
          onClick={() => openModalHandler(order)}
        />
      </div>

      <Modal open={open} setOpen={setOpen}>
        {12}
      </Modal>
    </div>
  );
}
