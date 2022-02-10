import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardTopbar from "../components/dashboard/DashboardTopbar";

function LayoutDashboard(props) {
  console.log(props);
  return (
    <div>
      <DashboardTopbar restaurantData={props.restaurantData} />
      <DashboardSidebar />
      <main id="container_dashboard">{props.children}</main>
    </div>
  );
}

export default LayoutDashboard;
