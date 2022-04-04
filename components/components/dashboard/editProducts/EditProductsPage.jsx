import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { TrashIcon } from "@heroicons/react/solid";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { CheckIcon } from "@heroicons/react/solid";
import DeleteModal from "./DeleteModal";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase";

function EditProductsPage({ item: itemFromDb }) {
  const router = useRouter();
  const restaurantName = router.query.restaurantName;

  const [item, setItem] = useState(itemFromDb.item);
  const [openModal, setOpenModal] = useState(false);

  function handleChange(evt) {
    console.log(evt.target.value, evt.target.name);
    const value = evt.target.value;
    setItem({
      ...item,
      [evt.target.name]: value,
    });
  }

  const submitHandler = async (e) => {
    console.log("item", item);
    e.preventDefault();

    const itemRef = doc(db, "items", itemFromDb.id);

    await updateDoc(itemRef, {
      title: item.title,
      description: item.description,
      price: parseInt(item.price),
      recommendation: item.recommendation,
      type: item.type,
    });
  };

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "items", id));

    router.push(`/${restaurantName}/dashboard/edit`);
  };

  return (
    <form
      onChange={handleChange}
      onSubmit={submitHandler}
      className="bg-gray-100 dark:bg-darkThemeBackground"
    >
      <div className="p-5 w-full sm:w-4/6 md:w-5/12 m-auto">
        <div className="p-0.5  bg-gradient-to-br from-sky-200 via-gray-200 to-red-300 dark:from-sky-600 dark:via-gray-200 dark:to-red-700 rounded-lg">
          <div className="w-full h-44 lg:h-52 xl:h-72 relative ">
            {item.picture && (
              <Image
                src={item.picture}
                alt={item.title}
                layout={"fill"}
                className="rounded-lg"
                priority
              />
            )}
          </div>
        </div>

        <div className="mt-4 mb-3 flex flex-col">
          <label className="font-bold text-sky-700 dark:text-sky-300 mb-1">
            Title
          </label>
          <input
            name="title"
            type="text"
            placeholder="Title"
            className="px-3 py-3 placeholder-slate-300 text-slate-600 rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full dark:bg-gray-800 dark:text-white"
            value={item.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3 pt-0 flex flex-col">
          <label className="font-bold text-sky-700 mb-1 dark:text-sky-300">
            Description
          </label>
          <textarea
            name="description"
            type="text"
            placeholder="Description"
            className="px-3 py-3 placeholder-slate-300 text-slate-600 rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full dark:bg-gray-800 dark:text-white"
            value={item.description}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3 pt-0 flex flex-col">
          <label className="font-bold text-sky-700 mb-1 dark:text-sky-300">
            Price
          </label>
          <input
            name="price"
            type="number"
            placeholder="Price"
            className="px-3 py-3 placeholder-slate-300 text-slate-600 rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full dark:bg-gray-800 dark:text-white"
            value={item.price}
            onChange={handleChange}
          />
        </div>

        <div className="mb-1 pt-0 ">
          <div className="flex flex-col">
            <label className="font-bold text-sky-700 mb-1 dark:text-sky-300">
              Type
            </label>
            <input
              name="type"
              type="text"
              placeholder="Type"
              className="px-3 py-3 placeholder-slate-300 text-slate-600 rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full dark:bg-gray-800 dark:text-white"
              value={item.type}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-3 pt-0 ">
          <div className="flex justify-between">
            <label className="font-bold text-sky-700 mt-2 dark:text-sky-300">
              Recommendation
            </label>
            <label className="relative flex justify-between items-center group p-2 text-xl">
              <input
                name="recommendation"
                type="checkbox"
                className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
                value={item.recommendation}
                defaultChecked={item.recommendation}
                onChange={handleChange}
              />
              <span className="w-12 h-7 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 dark:bg-gray-800 dark:text-white rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-5 after:h-5 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-4 group-hover:after:translate-x-1"></span>
            </label>
          </div>
        </div>

        <div>
          <button
            className="w-full bg-red-300 rounded-full px-2 py-3 font-semibold border-red-400 border-2 text-red-600 dark:bg-red-700 dark:border-red-800 dark:text-red-200 transition ease-in-out delay-150  hover:scale-105 hover:bg-red-400 hover:text-white dark:hover:bg-red-800 dark:hover:text-black duration-200"
            onClick={() => setOpenModal(true)}
            type="button"
          >
            <div className="flex justify-center">
              <TrashIcon className="w-4 h-4 mt-1" />
              <p className="">Delete item</p>
            </div>
          </button>
        </div>

        <div className="flex space-x-4 w-full justify-between mt-8">
          <button
            className="w-1/2 bg-gray-300 rounded-full px-2 py-3 font-semibold border-gray-400 border-2 text-gray-600 dark:bg-gray-700 dark:border-gray-800 dark:text-gray-200 transition ease-in-out delay-150  hover:scale-105 hover:bg-gray-400 hover:text-white dark:hover:bg-gray-800 dark:hover:text-black duration-200"
            onClick={() => router.push(`/${restaurantName}/dashboard/edit/`)}
            type="button"
          >
            <div className="flex justify-center">
              <ArrowLeftIcon className="w-4 h-4 mt-1" />
              <p className="">Back</p>
            </div>
          </button>
          <button
            className="w-1/2 bg-sky-300 rounded-full px-2 py-3 font-semibold border-sky-400 border-2 text-sky-600 dark:bg-sky-800 dark:text-gray-200 dark:border-sky-700 transition ease-in-out delay-150  hover:scale-105 hover:bg-sky-400 hover:text-white dark:hover:bg-sky-900 dark:hover:text-black duration-200"
            type="submit"
          >
            <div className="flex justify-center">
              <CheckIcon className="w-4 h-4 mt-1" />
              <p className="">Save</p>
            </div>
          </button>
        </div>
      </div>
      {openModal && (
        <DeleteModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          item={itemFromDb}
          deleteItem={deleteItem}
        />
      )}
    </form>
  );
}

export default EditProductsPage;
