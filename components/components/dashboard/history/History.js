import React from "react";
import ReactDataTable from "../ReactDataTable";
import moment from "moment";

function History({ orders }) {
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
  ];

  const mainData = orders?.map((order, i) => {
    //console.log("order", order.data());

    return {
      id: i,
      date: moment(order.data().timestamp.toDate()).format(
        "MMMM Do YYYY, h:mm"
      ),
      payment: order.data().paymentType,
      restaurantTableNr: order.data().restaurantTableNr,
      status: order.data().status,
      items: order.data().items.map((item, i) => {
        return (
          <div key={i}>
            <img src={item.picture} />
          </div>
        );
      }),
    };
  });

  return (
    <div>
      <ReactDataTable
        title={"History of orders"}
        columns={columns}
        data={mainData}
      />
    </div>
  );
}

export default History;
