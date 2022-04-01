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

const columns = [
  {
    name: "Title",
    selector: (row) => row.title,
    sortable: true,
  },
  {
    name: "Year",
    selector: (row) => row.year,
    sortable: true,
  },
];

const data = [
  {
    id: 1,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
  },
];

export default function ReactDataTable({ title, data, columns }) {
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);

  const ExpandedComponent = (data) => {
    console.log("data", data);
    data &&
      data.items?.map((item) => {
        console.log("item", item);
      });
  };
  return (
    <div className="p-3 ">
      <DataTable
        title={title}
        columns={columns}
        data={data}
        pagination
        expandableRows
        expandableRowsComponent={ExpandedComponent}
        theme={isDarkTheme ? "solarized" : ""}
        id="react_data_table"
      />
    </div>
  );
}
