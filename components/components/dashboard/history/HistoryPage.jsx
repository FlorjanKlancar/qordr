import React from "react";
import ReactDataTable from "../ReactDataTable";
import moment from "moment";
import { CheckIcon, MinusIcon, XIcon } from "@heroicons/react/solid";
import { toast } from "react-toastify";
import { db } from "../../../../firebase";
import { doc, updateDoc } from "firebase/firestore";

function HistoryPage({ orders }) {
  function alertMessageSuccess(status) {
    toast.success(`Order marked as ${status}!`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  function alertMessageFail() {
    toast.error("Something went wrong", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const columns = [
    {
      name: "Date & Time",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Restaurant Table Number",
      selector: (row) => row.restaurantTableNr,
      sortable: true,
    },

    {
      name: "Payment",
      selector: (row) => row.payment,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Edit status",
      selector: (row) => row.edit,
      minWidth: 200,
    },
  ];

  const submitStatusHandler = async (status, id) => {
    try {
      alertMessageSuccess(status);

      const ordersRef = doc(db, "orders", id);

      await updateDoc(ordersRef, {
        status: status,
      });
    } catch (error) {
      alertMessageFail();
    }
  };

  const mainData = orders?.map((order, i) => {
    return {
      id: i,
      date: moment(order.data().timestamp.toDate()).format(
        "MMMM Do YYYY, h:mm"
      ),
      payment: order.data().paymentType,
      restaurantTableNr: order.data().restaurantTableNr,
      status: order.data().status,
      totalAmount: order.data().totalAmount,
      items: order.data().items.map((item, i) => {
        return {
          picture: item.picture,
          title: item.title,
          price: item.price,
          amount: item.amount,
        };
      }),
      edit: (
        <div className="flex space-x-3">
          <div
            className="bg-green-300 dark:bg-green-700 rounded p-2 hover:bg-green-400 dark:hover:bg-green-600 cursor-pointer"
            title="Set order as completed"
            onClick={() => submitStatusHandler("completed", order.id)}
          >
            <CheckIcon className="w-6 h-6 text-green-800 dark:text-green-200" />
          </div>

          <div
            className="bg-orange-300 dark:bg-orange-500 rounded p-2 hover:bg-orange-400 dark:hover:bg-orange-600 cursor-pointer"
            tooltip="Minus"
            title="Set order as pending"
            onClick={() => submitStatusHandler("pending", order.id)}
          >
            <MinusIcon className="w-6 h-6 text-orange-800 dark:text-orange-200" />
          </div>

          <div
            className="bg-red-300 dark:bg-red-600 rounded p-2 hover:bg-red-400 dark:hover:bg-red-500 cursor-pointer"
            title="Set order as canceled"
            onClick={() => submitStatusHandler("cancel", order.id)}
          >
            <XIcon className="w-6 h-6 text-red-800 dark:text-red-200" />
          </div>
        </div>
      ),
    };
  });

  return (
    <div>
      <ReactDataTable
        title={"History of orders"}
        columns={columns}
        data={mainData}
        expandableRowsBoolean={true}
      />
    </div>
  );
}

export default HistoryPage;
