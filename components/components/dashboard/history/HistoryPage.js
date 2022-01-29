import History from "./History";

function HistoryPage(props) {
  return (
    <div className="p-4">
      <History orders={props.orders} fetchNewData={props.fetchNewData} />
    </div>
  );
}
export default HistoryPage;
