import DashboardTop from "../components/dashboard/DashboardTop";

function LayoutDashboard(props) {
  console.log(props);
  return (
    <div>
      <DashboardTop restaurantData={props.restaurantData} />

      <main
        id="container_dashboard"
        className="bg-gray-50 w-full h-full 2xl:h-screen"
      >
        {props.children}
      </main>
    </div>
  );
}

export default LayoutDashboard;
