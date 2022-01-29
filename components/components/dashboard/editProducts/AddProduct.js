import React, {Fragment, useState} from "react";

import AddProductModal from "./AddProductModal";

function AddProduct(props) {
  const [openModal, setOpenModal] = useState(false);

  function openModalHandler() {
    setOpenModal(true);
  }

  function closeModalHandler() {
    setOpenModal(false);
  }

  return (
    <div className="">
      <button
        className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
        onClick={openModalHandler}
      >
        Add item!
      </button>
      {openModal && (
        <AddProductModal
          updateItemHandler={props.updateItemHandler}
          restaurantCategories={props.restaurantCategories}
          closeModalHandler={closeModalHandler}
        />
      )}
      <button className="ml-4 bg-transparent  text-blue-500 font-semibold hover:text-blue-800 hover:bg-gray-100 py-2 px-4  hover:border-transparent rounded">
        Import items
      </button>
    </div>
  );
}
export default AddProduct;
