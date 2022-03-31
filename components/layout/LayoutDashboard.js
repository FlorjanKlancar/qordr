import DashboardTop from "../components/dashboard/DashboardTop";

function LayoutDashboard(props) {
  console.log(props);
  return (
    <div>
      <DashboardTop restaurantData={props.restaurantData} />

      <main
        id="container_dashboard"
        className="bg-gray-100 w-full dark:bg-[#202225] "
      >
        {props.children}
      </main>
    </div>
  );
}

export default LayoutDashboard;
