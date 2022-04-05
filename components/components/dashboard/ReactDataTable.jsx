import Image from "next/image";
import DataTable, { createTheme } from "react-data-table-component";
import { useSelector } from "react-redux";
import LastColumnButtons from "./history/LastColumnButtons";
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
  submitStatusHandler,
}) {
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);

  if (expandableRowsBoolean) {
    const ExpandedComponent = (data) => {
      console.log(data);
      return (
        <>
          <div className="my-4 mx-2 grid sm:grid-cols-2 md:grid-cols-3 w-1/3 sm:w-full">
            <div className="flex flex-col text-center justify-center my-2 sm:hidden">
              <div className="font-semibold text-gray-600 dark:text-gray-300">
                Change order status
              </div>
              <LastColumnButtons
                submitStatusHandler={submitStatusHandler}
                id={data.data.id}
              />
            </div>
            {data.data.items.map((item, i) => {
              return (
                <div
                  className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 p-2 even:bg-sky-100 odd:bg-blue-100 dark:even:bg-sky-900 dark:odd:bg-blue-900 rounded-lg mx-1 my-1 "
                  key={i}
                >
                  <div></div>
                  <div className="m-auto w-2/4 h-20 sm:w-28 sm:h-16  relative ">
                    <Image
                      alt="Picture"
                      src={item.picture}
                      layout="fill"
                      objectFit="fill"
                      className="rounded-lg"
                    />
                  </div>

                  <div className="w-full sm:w-1/2 truncate font-semibold dark:text-white text-center sm:text-left">
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
          <div className="flex mx-2 my-4 sm:ml-0 sm:justify-center ">
            <div className="flex w-1/2 xl:w-1/5 rounded-full bg-green-200 dark:bg-green-700 dark:text-gray-100  px-2 py-3 justify-center space-x-2">
              {data.data.restaurantTableNr}:
              <div className="text-base font-semibold underline decoration-green-500 dark:decoration-black underline-offset-1">
                {data.data.totalAmount.toFixed(2)}€ in total
              </div>
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
        onRowClicked={
          trClick &&
          ((e) => {
            trClick(e.id);
          })
        }
      />
    </div>
  );
}
