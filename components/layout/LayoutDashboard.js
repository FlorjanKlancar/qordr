import {OmitProps} from "antd/lib/transfer/ListBody";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardTopbar from "../components/dashboard/DashboardTopbar";

function LayoutDashboard(props) {
  return (
    <div>
      <DashboardTopbar restaurantData={props.restaurantData} />
      <DashboardSidebar />
      <main id="container_dashboard" className="">
        {props.children}
      </main>
    </div>
  );
}

export default LayoutDashboard;
