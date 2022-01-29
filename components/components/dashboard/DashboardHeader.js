import {Fragment} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

function DashboardHeader(props) {
  const router = useRouter();
  const restaurantName = router.query.restaurantName;
  return (
    <Fragment>
      <header className="bg-white shadow">
        <div className="grid grid-cols-2 max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 mb-8 ">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 ">
              Dashboard for
              <span className="text-blue-400 pl-4">
                {props.restaurantData.restaurantName}
              </span>
            </h1>
          </div>
          <div>
            <div className="text-blue-600	p-4 text-right text-base	">
              <Link
                href={{
                  pathname: "/restaurant/[restaurantName]/dashboard",
                  query: {restaurantName: restaurantName},
                }}
              >
                <button>
                  <span> Go back</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  );
}
export default DashboardHeader;
