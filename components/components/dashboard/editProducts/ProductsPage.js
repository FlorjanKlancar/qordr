import Image from "next/image";
import ReactDataTable from "../ReactDataTable";
import { HeartIcon } from "@heroicons/react/solid";
import { XIcon } from "@heroicons/react/solid";
import { SearchIcon } from "@heroicons/react/solid";
import { useMemo, useState } from "react";
import { useRouter } from "next/router";

function ProductsPage({ items }) {
  const router = useRouter();
  const restaurantName = router.query.restaurantName;

  const [search, setSearch] = useState("");
  const columns = [
    {
      name: "Picture",
      selector: (row) => row.picture,
      minWidth: "230px",
      maxWidth: "230px",
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      maxWidth: "280px",
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
      maxWidth: "600px",
    },

    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
      maxWidth: "100px",
    },
    {
      name: "Recommendation",
      selector: (row) => row.recommended,
      sortable: true,
      maxWidth: "150px",
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
      maxWidth: "180px",
    },
    {
      name: "Edit",
      selector: (row) => row.edit,
    },
  ];

  const mainData = items
    .filter((item) => {
      if (search === "") return item;
      else if (
        item.data().title.toLowerCase().includes(search.toLowerCase()) ||
        item.data().description?.toLowerCase().includes(search.toLowerCase())
      )
        return item;
    })
    .map((item) => {
      return {
        picture: (
          <div className="p-2">
            <div className="p-0.5  bg-gradient-to-br from-sky-200 via-gray-200 to-red-300 dark:from-sky-600 dark:via-gray-200 dark:to-red-700 rounded-lg">
              <div className="relative w-40 h-20 hover:opacity-80">
                <Image
                  src={item.data().picture}
                  alt={item.data().title}
                  layout="fill"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        ),
        title: <div className="font-bold text-base">{item.data().title}</div>,
        description: (
          <div className="text-gray-600 dark:text-gray-300">
            {item.data().description?.length
              ? item.data().description
              : "No description"}
          </div>
        ),
        price: <div className="text-base">{item.data().price.toFixed(2)}€</div>,
        recommended: (
          <div>
            {item.data().recommendation === true ? (
              <HeartIcon className="w-7 h-7 text-rose-500" />
            ) : (
              <XIcon className="w-7 h-7 text-gray-400" />
            )}
          </div>
        ),
        type: <div className="text-base font-semibold">{item.data().type}</div>,
        edit: (
          <div className="flex space-x-2 w-full text-white">
            <button
              className="bg-sky-500 px-2 py-3 rounded-lg w-20 hover:bg-cyan-500"
              onClick={() => editElement(item.id)}
            >
              Edit
            </button>
            <button className="bg-red-500 px-2 py-3 rounded-lg w-20 hover:bg-red-700">
              Delete
            </button>
          </div>
        ),
      };
    });

  const editElement = (id) => {
    console.log(
      "`${restaurantName}/dashboard/edit/${id}`",
      `/${restaurantName}/dashboard/edit/${id}`
    );
    router.push(`/${restaurantName}/dashboard/edit/${id}`);
  };

  const subHeaderComponent = useMemo((search) => {
    return (
      <form className="flex w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 justify-start  opacity-75  rounded-full border-2 border-indigo-400 mb-5 mr-5 py-2">
        <input
          type="text"
          className="flex-grow bg-transparent outline-none placeholder-gray-500 text-black dark:text-white pr-5"
          placeholder={`Search`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="font-bold text-indigo-500" type="submit">
          <SearchIcon className="w-5 h-5" />
        </button>
      </form>
    );
  }, []);

  return (
    <div>
      <ReactDataTable
        title={"Edit products"}
        subHeaderComponent={subHeaderComponent}
        columns={columns}
        data={mainData}
        expandableRowsBoolean={false}
      />
    </div>
  );
}
export default ProductsPage;
