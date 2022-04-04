import Image from "next/image";
import DataTable, { createTheme } from "react-data-table-component";
import { useSelector } from "react-redux";
// createTheme creates a new theme named solarized that overrides the build in dark theme
createTheme(
  "solarized",
  {
    text: {
      primary: "white",
      secondary: "#2590EB",
    },
    background: {
      default: "#1F2937",
    },

    divider: {
      default: "#e5e7eb",
    },
    action: {
      button: "rgba(0,0,0,.54)",
      hover: "rgba(0,0,0,.08)",
      disabled: "rgba(0,0,0,.12)",
    },
  },
  "dark"
);

export default function ReactDataTable({
  title,
  data,
  columns,
  expandableRowsBoolean,
  trClick,
}) {
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);

  if (expandableRowsBoolean) {
    const ExpandedComponent = (data) => {
      return (
        <>
          <div className="my-4 mx-2 grid sm:grid-cols-2 md:grid-cols-3">
            {data.data.items.map((item, i) => {
              return (
                <div
                  className="flex space-x-4 p-2 even:bg-sky-100 odd:bg-blue-100 dark:even:bg-sky-900 dark:odd:bg-blue-900 rounded-lg mx-1 my-1 "
                  key={i}
                >
                  <div className="w-28 h-16  relative ">
                    <Image
                      alt="Picture"
                      src={item.picture}
                      layout="fill"
                      objectFit="fill"
                      className="rounded-lg"
                    />
                  </div>

                  <div className="w-1/2 truncate font-semibold dark:text-white">
                    <span className="text-blue-500 text-lg">
                      {item.amount}x
                    </span>{" "}
                    {item.title}
                    <br />
                    <span className="">
                      {(item.price * item.amount).toFixed(2)}€
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mb-5 flex justify-start ml-5 sm:ml-0 sm:justify-center ">
            <div className="w-1/2 xl:w-1/5 rounded-full bg-green-200 dark:bg-green-700 dark:text-gray-100  px-2 py-3 text-center">
              <span className="font-bold text-base">
                Table {data.data.restaurantTableNr}:
              </span>{" "}
              <span className="text-lg underline decoration-green-500 dark:decoration-black underline-offset-1">
                {data.data.totalAmount.toFixed(2)}€ in total
              </span>
            </div>
          </div>
        </>
      );
    };
  }

  return (
    <div className="p-3 ">
      <DataTable
        title={title}
        columns={columns}
        data={data}
        pagination
        expandableRows={expandableRowsBoolean && true}
        expandableRowsComponent={ExpandedComponent}
        theme={isDarkTheme ? "solarized" : ""}
        id="react_data_table"
        onRowClicked={(e) => {
          trClick(e.id);
        }}
      />
    </div>
  );
}
