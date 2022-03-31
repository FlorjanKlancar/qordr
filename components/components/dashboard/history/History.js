import MUIDataTable from "mui-datatables";

const columns = [
  "Order",
  "Items on order",
  "Total amount",
  "Order status",
  "Edit order",
];

const data = [
  [
    "Joe James",
    <img src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" />,
    "Yonkers",
    "NY",
  ],
  ["John Walsh", "Test Corp", "Hartford", "CT"],
  ["Bob Herm", "Test Corp", "Tampa", "FL"],
  ["James Houston", "Test Corp", "Dallas", "TX"],
];

const options = {
  filterType: "checkbox",
  download: "false",
  print: "false",
};

export default function History() {
  return (
    <div className="p-4 dark:bg-darkThemeBackground   overflow-y-auto">
      <MUIDataTable
        title={"All orders history"}
        data={data}
        columns={columns}
        options={options}
        id="miuiTableNew"
      />
    </div>
  );
}
