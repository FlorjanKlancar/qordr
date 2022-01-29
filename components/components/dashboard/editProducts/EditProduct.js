import Modal from "../../../layout/Modal";
import Image from "next/image";
import {Fragment, useState} from "react";
import axios from "axios";

function EditProduct(props) {
  const [itemTitle, setItemTitle] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemType, setItemType] = useState("");
  const [itemRestaurantRec, setitemRestaurantRec] = useState("");

  async function submitHandler(event) {
    event.preventDefault();

    const data = [
      {
        idItem: props.idItem,
        itemTitle: itemTitle,
        itemDescription: itemDescription,
        itemPrice: itemPrice,
        itemType: itemType,
        itemRestaurantRec: itemRestaurantRec,
      },
    ];

    if (
      data[0].itemTitle > "" ||
      data[0].itemDescription > "" ||
      data[0].itemPrice > "" ||
      data[0].itemType > "" ||
      data[0].itemRestaurantRec > ""
    ) {
      const response = await axios.post(`/api/dashboard/items/`, data);

      if (response.status === 200) props.alertMessageSuccess();
      else props.alertMessageFail();
      props.updateItemHandler(true);
    }
  }

  return (
    <Fragment>
      <Modal onClose={props.closeModalHandler}>
        <div className=" ">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center m-auto font-bold text-2xl	">
              Edit product
            </div>
            <div className="divide-y ">
              <button
                className="float-right border-2 border-gray-500	 hover:bg-gray-300 text-gray-900 font-bold py-2 px-4 rounded-full"
                onClick={props.closeModalHandler}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="w-36 h-20 lg:w-52 lg:h-28 relative top-2 left-2">
              <Image
                alt="Picture"
                src={props.itemPicture}
                layout="fill"
                objectFit="fill"
                className="rounded-lg"
              />
            </div>
            <div className="w-full pr-8">
              <label className="block text-sm font-medium text-gray-700">
                Product photo
              </label>
              <div className="flex justify-center border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-2 w-full">
              <label
                htmlFor="itemTitle"
                className="block text-sm font-medium text-gray-700 "
              >
                Item Title
              </label>
              <div className="mt-1 ">
                <input
                  id="itemTitle"
                  name="itemTitle"
                  className="shadow-sm h-8 focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                  placeholder="Displayed item title"
                  defaultValue={props.itemTitle}
                  onChange={(event) => setItemTitle(event.target.value)}
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="col-span-2 w-full">
              <label
                htmlFor="itemDescription"
                className="block text-sm font-medium text-gray-700 "
              >
                Item description
              </label>
              <div className="mt-1 ">
                <textarea
                  id="itemDescription"
                  name="itemDescription"
                  rows={2}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                  placeholder="Displayed item description"
                  defaultValue={props.itemDescription}
                  onChange={(event) => setItemDescription(event.target.value)}
                />
              </div>
            </div>

            <div className="col-span-2 w-full">
              <label
                htmlFor="itemPrice"
                className="block text-sm font-medium text-gray-700 "
              >
                Item Price
              </label>
              <div className="mt-1 ">
                <input
                  id="itemPrice"
                  type="number"
                  name="itemPrice"
                  className="shadow-sm h-8 focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                  placeholder="Displayed item price"
                  defaultValue={props.itemPrice}
                  onChange={(event) => setItemPrice(event.target.value)}
                />
              </div>
            </div>

            <div className="col-span-2 w-full">
              <label
                htmlFor="itemType"
                className="block text-sm font-medium text-gray-700 "
              >
                Item Type
              </label>
              <div className="mt-1 ">
                <select
                  id="itemType"
                  name="itemType"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(event) => setItemType(event.target.value)}
                  defaultValue={props.idType}
                >
                  {props.restaurantCategories.map((item) => (
                    <option key={item.idType} value={item.idType}>
                      {item.category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-span-2 w-full">
              <label
                htmlFor="restaurantRecommends"
                className="block text-sm font-medium text-gray-700 "
              >
                Restaurant recommendation
              </label>
              <div className="mt-1 ">
                <select
                  id="restaurantRecommends"
                  name="restaurantRecommends"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(event) => setitemRestaurantRec(event.target.value)}
                  defaultValue={props.restaurantRec == 1 ? true : false}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
            <div className="col-span-2 w-full">
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={(event) => {
                  submitHandler(event);
                  props.closeModalHandler();
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
}
export default EditProduct;
