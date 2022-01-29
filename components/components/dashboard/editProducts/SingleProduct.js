import Image from "next/image";
import React, { Fragment, useState } from "react";
import DeleteModal from "./DeleteModal";
import EditProduct from "./EditProduct";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
//import FavoriteIcon from "@mui/icons-material/FavoriteBorder";

function SingleProduct(props) {
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  function openModalHandler() {
    setOpenModal(true);
  }

  function closeModalHandler() {
    setOpenModal(false);
  }

  function openDeleteModalHandler() {
    setDeleteModal(true);
  }

  function closeDeleteModalHandler() {
    setDeleteModal(false);
  }

  return (
    <Fragment>
      <TableRow hover role="checkbox" tabIndex={-1} className="h-36">
        <TableCell onClick={openModalHandler}>
          <div className="w-44 h-32 lg:w-52 lg:h-28 relative top-2 left-2">
            <Image
              alt="Picture"
              src={props.itemPicture}
              layout="fill"
              objectFit="fill"
              className="rounded-lg"
            />
          </div>
        </TableCell>
        <TableCell onClick={openModalHandler}>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {props.itemTitle}
            </div>
            <div className="text-sm text-gray-500">{props.itemDescription}</div>
          </div>
        </TableCell>
        <TableCell onClick={openModalHandler}>
          <div className="text-sm text-gray-900">{props.itemPrice}€</div>
        </TableCell>
        <TableCell onClick={openModalHandler}>
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            Active
          </span>
        </TableCell>
        <TableCell onClick={openModalHandler}>
          {props.restaurantCategories.map(
            (item) =>
              props.idType == item.idType && (
                <div key={item.idType}>{item.category}</div>
              )
          )}
        </TableCell>

        <TableCell onClick={openModalHandler}>
          {/*props.restaurantRec === 1 && (
           // <FavoriteIcon className="text-red-500" />
          )*/}
        </TableCell>

        <TableCell onClick={openModalHandler}>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={openModalHandler}
            >
              Edit
            </button>
            <button
              className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={openDeleteModalHandler}
            >
              Delete
            </button>
          </div>
        </TableCell>
      </TableRow>
      {deleteModal && (
        <DeleteModal
          idItem={props.idItem}
          itemTitle={props.itemTitle}
          closeDeleteModalHandler={closeDeleteModalHandler}
          updateItemHandler={props.updateItemHandler}
          alertMessageInfo={props.alertMessageInfo}
          alertMessageFail={props.alertMessageFail}
        />
      )}
      {openModal && (
        <EditProduct
          idItem={props.idItem}
          itemPicture={props.itemPicture}
          itemTitle={props.itemTitle}
          itemDescription={props.itemDescription}
          itemPrice={props.itemPrice}
          idType={props.idType}
          restaurantRec={props.restaurantRec}
          closeModalHandler={closeModalHandler}
          updateItemHandler={props.updateItemHandler}
          restaurantCategories={props.restaurantCategories}
          alertMessageSuccess={props.alertMessageSuccess}
          alertMessageFail={props.alertMessageFail}
        />
      )}
    </Fragment>
  );
}
export default SingleProduct;
