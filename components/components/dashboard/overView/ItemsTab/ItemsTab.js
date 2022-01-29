import ItemsList from "./ItemsList";

function ItemsTab(props) {
  return (
    <div className="w-11/12 shadow-sm border rounded-xl border-gray-100 m-auto mt-4">
      <ItemsList items={props.items} />
    </div>
  );
}
export default ItemsTab;
