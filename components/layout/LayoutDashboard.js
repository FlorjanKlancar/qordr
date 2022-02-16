import DashboardTop from "../components/dashboard/DashboardTop";

function LayoutDashboard(props) {
  console.log(props);
  return (
    <div>
      <DashboardTop restaurantData={props.restaurantData} />

      <main id="container_dashboard">{props.children}</main>
    </div>
  );
}

export default LayoutDashboard;
