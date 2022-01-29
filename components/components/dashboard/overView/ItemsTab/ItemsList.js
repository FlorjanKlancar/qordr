import MaterialTable from "material-table";

export default function ItemsList(props) {
  const array = [];

  {
    props.items.map(
      (item, index) =>
        (array[index] = {
          id: item.idItem,
          imageUrl: item.itemPicture,
          itemTitle: (
            <div className="font-semibold text-lg text-center">
              {item.itemTitle}
            </div>
          ),
          itemsSold: <div className="font-semibold text-xl">{item.count}</div>,
          itemPrice: item.itemPrice + "€",
          itemCategory: <div className="text-center">{item.category}</div>,
        })
    );
  }

  console.log(array);

  const columns = [
    {
      title: "Item picture",
      field: "imageUrl",
      render: function myRender(rowData) {
        return <img src={rowData.imageUrl} style={{width: 200}} />;
      },
    },

    {title: "Item title", field: "itemTitle"},
    {title: "Item price", field: "itemPrice", type: "numeric"},
    {title: "Item category", field: "itemCategory"},
    {title: "Sold items", field: "itemsSold", type: "numeric"},
  ];

  return (
    <MaterialTable
      columns={columns}
      data={array}
      title="Items"
      options={{
        sorting: true,
        rowStyle: {
          text: "#EEE",
        },
        pageSize: 10,
      }}
    />
  );
}
