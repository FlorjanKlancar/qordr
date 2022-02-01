import { Link } from "react-scroll";

function RestaurantSideMenuPC({ sideMenu }) {
  return (
    <div className="sticky top-8 space-y-2 pr-8">
      {Object.keys(sideMenu).map(function (key, index) {
        return (
          <div
            className="border-2 rounded-lg font-medium h-12 p-3 "
            key={index}
          >
            <Link
              activeClass="text-blue-500"
              to={key}
              spy={true}
              smooth={true}
              offset={-65}
            >
              {key}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
export default RestaurantSideMenuPC;
