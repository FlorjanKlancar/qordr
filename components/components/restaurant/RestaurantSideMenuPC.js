import {Fragment} from "react";
import {Link} from "react-scroll";

function RestaurantSideMenuPC(props) {
  return (
    <Fragment>
      <div className="w-8/12 pl-16 sticky top-0  ">
        {props.sideMenu.map((item, index) => (
          <div
            className="border-2 rounded-lg font-medium  h-12 p-2 m-2 text-sm xl:text-base"
            key={index}
          >
            <Link
              activeClass="text-blue-500"
              to={item.Category}
              spy={true}
              smooth={true}
              offset={-65}
            >
              {item.Category}
            </Link>
          </div>
        ))}
      </div>
    </Fragment>
  );
}
export default RestaurantSideMenuPC;
