/* import MaterialTable from "material-table";
import React from "react";
import Image from "next/image";
import CheckIcon from "@material-ui/icons/Check";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function History(props) {
  console.log(props);
  function getUniqueListBy(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }

  const uniqueOrder = getUniqueListBy(props.orders, "idOrder");
  const orders = props.orders;

  console.log(uniqueOrder);

  const array = [];

  function formatDate(input) {
    var datePart = input.match(/\d+/g),
      year = datePart[0].substring(0), // get only two digits
      month = datePart[1],
      day = datePart[2];

    return day + "-" + month + "-" + year;
  }

  {
    uniqueOrder.map(
      (item, index) =>
        (array[index] = {
          idOrder: item.idOrder,
          dateTime:
            formatDate(item.date) +
            " " +
            item.date.substr(item.date.length - 8),
          tableNr: "Table " + item.restaurantTableNr,
          items: orders.map(
            (order) =>
              item.idOrder == order.idOrder && (
                <div>{order.itemAmount + "x " + order.itemTitle}</div>
              )
          ),
          totalAmount: (
            <div>
              <div>{item.totalAmount.toFixed(2)}€</div>
              <div>{item.paymentType}</div>
            </div>
          ),
          status:
            item.completed == 1 ? (
              <div>
                <span className="px-4 inline-flex text-sm leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  Closed
                </span>
              </div>
            ) : (
              <div>
                <span className="px-4 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Open
                </span>
              </div>
            ),
        })
    );
  }

  console.log(array);

  const columns = [
    { title: "Order number", field: "idOrder" },
    { title: "Date/Time", field: "dateTime" },
    { title: "Table number", field: "tableNr" },
    { title: "Items", field: "items" },
    { title: "Total amount", field: "totalAmount" },

    { title: "Status", field: "status" },
  ];

  async function submitCompleteHandler(id) {
    const response = await fetch(
      `https://qorder.link/api/completeOrder/` + id,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    /*if (data.success === "success") props.alertMessageSuccess();
    else props.alertMessageFail();
    props.fetchNewData();
  }

  async function submitIncompleteHandler(id) {
    const response = await fetch(
      `https://qorder.link/api/incompleteOrder/` + id,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    /*if (data.success === "success") props.alertMessageSuccess();
    else props.alertMessageFail();
    props.fetchNewData();
  }

  return (
    <MaterialTable
      columns={columns}
      data={array}
      title="Orders"
      options={{
        sorting: true,
        rowStyle: {
          text: "#EEE",
        },
        pageSize: 10,
      }}
      detailPanel={(rowData) => {
        return (
          <div className="flex p-2">
            <div className="w-1/2 grid grid-cols-4 gap-4 mr-2 relative">
              {props.orders.map(
                (order, index) =>
                  rowData.idOrder == order.idOrder && (
                    <div className="p-4 inline-flex space-x-4" key={index}>
                      <div>
                        {order.itemAmount}x {order.itemTitle}
                        <div className="flex-1 w-36 h-20 relative ">
                          <Image
                            alt="Picture"
                            src={order.itemPicture}
                            layout="fill"
                            objectFit="fill"
                            className="rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
            <div className="w-1/2 grid grid-cols-3 gap-4 ml-2">
              <div>
                {uniqueOrder.map(
                  (order) =>
                    rowData.idOrder == order.idOrder &&
                    order.customerTip > 0 && (
                      <div className="p-4">
                        Customer tip: {order.customerTip}
                      </div>
                    )
                )}
              </div>
              <div>
                {uniqueOrder.map(
                  (order) =>
                    rowData.idOrder == order.idOrder &&
                    order.customerComment.length > 0 && (
                      <div className="p-4">
                        Customer comment: {order.customerComment}
                      </div>
                    )
                )}
              </div>
              <div>
                {uniqueOrder.map(
                  (order) =>
                    rowData.idOrder == order.idOrder &&
                    (order.completed > 0 ? (
                      <div className="p-2">
                        <div className="p-2">
                          Mark this order as incomplete!
                        </div>
                        <button
                          className="bg-transparent hover:bg-yellow-500 text-yellow-400 font-semibold hover:text-white py-2 px-4 border border-yellow-400 hover:border-transparent rounded m-auto"
                          onClick={() => submitIncompleteHandler(order.idOrder)}
                        >
                          <ErrorOutlineIcon />
                        </button>
                      </div>
                    ) : (
                      <div className="p-2">
                        <div className="p-2">Mark this order as completed!</div>
                        <button
                          className="bg-transparent hover:bg-green-500 text-green-400 font-semibold hover:text-white py-2 px-4 border border-green-400 hover:border-transparent rounded m-auto"
                          onClick={() => submitCompleteHandler(order.idOrder)}
                        >
                          <CheckIcon />
                        </button>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        );
      }}
      onRowClick={(event, rowData, togglePanel) => togglePanel()}
    />
  );
}
 */
