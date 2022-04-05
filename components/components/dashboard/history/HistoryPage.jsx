import React from "react";
import ReactDataTable from "../ReactDataTable";
import moment from "moment";
import { CheckIcon, MinusIcon, XIcon } from "@heroicons/react/solid";
import { toast } from "react-toastify";
import { db } from "../../../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import LastColumnButtons from "./LastColumnButtons";

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
    console.log("status", status);
    console.log("id", id);
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
      id: order.id,
      date: moment(order.data().timestamp.toDate()).format(
        "DD. MM. yyyy, h:mm"
      ),
      payment: order.data().paymentType,
      restaurantTableNr: (
        <div className="font-bold text-base">
          Table {order.data().restaurantTableNr}
        </div>
      ),
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
        <div className="hidden sm:flex">
          <LastColumnButtons
            submitStatusHandler={submitStatusHandler}
            id={order.id}
          />
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
        submitStatusHandler={submitStatusHandler}
      />
    </div>
  );
}

export default HistoryPage;
