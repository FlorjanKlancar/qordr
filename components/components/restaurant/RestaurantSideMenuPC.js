import {Link} from "react-scroll";

function RestaurantSideMenuPC(props) {
  return (
    <div className="sticky top-8 space-y-2 pr-8">
      {props.sideMenu.map((item, index) => (
        <div className="border-2 rounded-lg font-medium h-12 p-3 " key={index}>
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
  );
}
export default RestaurantSideMenuPC;
