import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardTopbar from "../components/dashboard/DashboardTopbar";
import DashboardTop from "../components/dashboard/DashboardTop";

function LayoutDashboard(props) {
  console.log(props);
  return (
    <div>
      <DashboardTop />
      <DashboardTopbar restaurantData={props.restaurantData} />
      <DashboardSidebar />
      <main id="container_dashboard">{props.children}</main>
    </div>
  );
}

export default LayoutDashboard;
