import HorizontalBar from "./HorizontalBar";
import TableList from "./TableList";

function TableTab(props) {
  console.log(props);
  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      <div className="w-full flex flex-wrap lg:flex-nowrap">
        <div className="w-full lg:w-9/12 bg-white shadow-sm border rounded-xl border-gray-100 p-4">
          <p className="font-semibold text-lg border-b-2 h-8">
            Orders per table graph
          </p>
          <HorizontalBar data={props.tables} />
        </div>
        <div className=" bg-white shadow-sm w-full lg:w-3/12 border rounded-xl border-gray-100 mt-4 lg:ml-4 lg:mt-0">
          <div className="p-3">
            <p className="font-semibold text-lg border-b-2 h-8">
              Best performing tables
            </p>
            <TableList data={props.tables[0].tableHistory} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default TableTab;
