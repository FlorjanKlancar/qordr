import {useState} from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import SingleRow from "./SingleRow";
import {ToastContainer, toast} from "react-toastify";

const columns = [
  {
    id: "order",
    label: <div className="text-lg font-semibold">Order</div>,
    minWidth: 103,
    maxWidth: 100,
  },
  {
    id: "items",
    label: <div className="text-lg font-semibold">Items on order</div>,
    minWidth: 500,
  },
  {
    id: "amount",
    label: <div className="text-lg font-semibold">Total amount</div>,
    minWidth: 200,
  },
  {
    id: "completed",
    label: <div className="text-lg font-semibold">Complete order</div>,
    minWidth: 200,
    maxWidth: 100,
  },
];

function alertMessageSuccess() {
  toast.success("Order marked as completed!", {
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

export default function OrdersTable(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="pt-2">
      <div id="dashboard_title" className="text-2xl	p-4">
        Current orders:
      </div>
      <div className="pl-4 pr-4 pb-4">
        <Paper sx={{width: "100%", overflow: "hidden"}}>
          <TableContainer sx={{maxHeight: 740}}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{minWidth: column.minWidth}}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {props.uniqueOrders.map((order) => (
                  <SingleRow
                    key={order.idOrder}
                    idOrder={order.idOrder}
                    restaurantTableNr={order.restaurantTableNr}
                    totalAmount={order.totalAmount}
                    paymentType={order.paymentType}
                    itemsOnOrder={props.orders}
                    createdAt={order.created_at}
                    customerTip={order.customerTip}
                    customerComment={order.customerComment}
                    fetchNewData={props.fetchNewData}
                    alertMessageSuccess={alertMessageSuccess}
                    alertMessageFail={alertMessageFail}
                  />
                ))}
                {props.uniqueOrders.length === 0 && (
                  <TableRow hover role="checkbox" tabIndex={-1}>
                    <TableCell colSpan="5">
                      <div className="lg:text-center">
                        Currently no orders...
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={props.orders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}