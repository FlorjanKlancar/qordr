import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/router";

function EditProductsPage({ item: itemFromDb }) {
  const router = useRouter();
  const restaurantName = router.query.restaurantName;

  const [item, setItem] = useState(itemFromDb);

  function handleChange(evt) {
    const value = evt.target.value;
    setItem({
      ...item,
      [evt.target.name]: value,
    });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("item", item);
  };

  return (
    <form onChange={handleChange} onSubmit={submitHandler}>
      <div className="p-5 w-full sm:w-4/6 md:w-5/12 m-auto">
        <div className="p-0.5  bg-gradient-to-br from-sky-200 via-gray-200 to-red-300 dark:from-sky-600 dark:via-gray-200 dark:to-red-700 rounded-lg">
          <div className="w-full h-44 lg:h-56 xl:h-72 relative ">
            <Image
              src={item.picture}
              alt={item.title}
              layout={"fill"}
              className="rounded-lg"
              priority
            />
          </div>
        </div>

        <div className="mt-4 mb-3 flex flex-col">
          <label className="font-bold text-sky-700 mb-1">Title</label>
          <input
            name="title"
            type="text"
            placeholder="Title"
            className="px-3 py-3 placeholder-slate-300 text-slate-600 rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
            value={item.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3 pt-0 flex flex-col">
          <label className="font-bold text-sky-700 mb-1">Description</label>
          <textarea
            name="description"
            type="text"
            placeholder="Description"
            className="px-3 py-3 placeholder-slate-300 text-slate-600 rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
            value={item.description}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3 pt-0 flex flex-col">
          <label className="font-bold text-sky-700 mb-1">Price</label>
          <input
            name="price"
            type="number"
            placeholder="Price"
            className="px-3 py-3 placeholder-slate-300 text-slate-600 rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
            value={item.price}
            onChange={handleChange}
          />
        </div>

        <div className="mb-1 pt-0 ">
          <div className="flex flex-col">
            <label className="font-bold text-sky-700 mb-1">Type</label>
            <input
              name="type"
              type="text"
              placeholder="Type"
              className="px-3 py-3 placeholder-slate-300 text-slate-600 rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
              value={item.type}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-3 pt-0 ">
          <div className="flex justify-between">
            <label className="font-bold text-sky-700 mt-2">
              Recommendation
            </label>
            <label className="relative flex justify-between items-center group p-2 text-xl">
              <input
                name="recommendation"
                type="checkbox"
                className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
                checked={item.recommendation}
                onChange={handleChange}
              />
              <span className="w-12 h-7 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-5 after:h-5 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-4 group-hover:after:translate-x-1"></span>
            </label>
          </div>
        </div>

        <div className="flex space-x-4 w-full justify-between mt-8">
          <button
            className="w-1/2 bg-gray-300 rounded-full px-2 py-3 font-semibold border-gray-400 border-2 text-gray-600"
            onClick={() => router.push(`/${restaurantName}/dashboard/edit/`)}
          >
            Back
          </button>
          <button className="w-1/2 bg-sky-300 rounded-full px-2 py-3 font-semibold border-sky-400 border-2 text-sky-600">
            Save
          </button>
        </div>
      </div>
    </form>
  );
}

export default EditProductsPage;
