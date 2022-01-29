import React, {useState} from "react";
import SearchField from "../../restaurant/SearchField";
import AddProduct from "./AddProduct";
import SingleProduct from "./SingleProduct";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import {ToastContainer, toast} from "react-toastify";

const columns = [
  {
    id: "picture",
    label: <div className="text-lg font-semibold">Picture</div>,
    minWidth: 103,
    maxWidth: 100,
  },
  {
    id: "descr",
    label: <div className="text-lg font-semibold">Description</div>,
    minWidth: 600,
  },
  {
    id: "price",
    label: <div className="text-lg font-semibold">Price</div>,
    minWidth: 50,
    maxWidth: 50,
  },
  {
    id: "status",
    label: <div className="text-lg font-semibold">Status</div>,
    minWidth: 50,
    maxWidth: 50,
  },
  {
    id: "category",
    label: <div className="text-lg font-semibold">Category</div>,
    minWidth: 150,
    maxWidth: 150,
  },
  {
    id: "top",
    label: (
      <div className="text-lg font-semibold">
        <FavoriteBorderIcon />
      </div>
    ),
    minWidth: 50,
    maxWidth: 50,
  },
  {
    id: "edit",
    label: <div className="text-lg font-semibold">Edit</div>,
    minWidth: 200,
    maxWidth: 200,
  },
];

function ProductsTable(props) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  function alertMessageSuccess() {
    toast.success("Item updated!", {
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

  function alertMessageInfo() {
    toast.info("Item deleted!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <div className="pt-2">
      <div id="dashboard_title" className="text-2xl	p-4">
        Edit items
      </div>
      <div className="inline-flex pl-4 pb-4">
        <AddProduct
          restaurantCategories={props.restaurantCategories}
          updateItemHandler={props.updateItemHandler}
        />
        <SearchField setSearch={setSearch} />
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
                {props.restaurantItems
                  .filter((val) => {
                    if (search === "") return val;
                    else if (
                      val.itemTitle
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      val.itemDescription
                        .toLowerCase()
                        .includes(search.toLowerCase())
                    )
                      return val;
                  })
                  .map((item, index) => (
                    <SingleProduct
                      key={index}
                      idItem={item.idItem}
                      itemPicture={item.itemPicture}
                      itemTitle={item.itemTitle}
                      itemDescription={item.itemDescription}
                      itemPrice={item.itemPrice}
                      idType={item.idType}
                      updateItemHandler={props.updateItemHandler}
                      restaurantRec={item.restaurantRec}
                      restaurantCategories={props.restaurantCategories}
                      alertMessageSuccess={alertMessageSuccess}
                      alertMessageFail={alertMessageFail}
                      alertMessageInfo={alertMessageInfo}
                    />
                  ))}
                {props.restaurantItems.length === 0 && (
                  <TableRow hover role="checkbox" tabIndex={-1}>
                    <TableCell colSpan="5">
                      <div className="lg:text-center">
                        Currently no items...
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
            count={props.restaurantItems.length}
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
export default ProductsTable;
