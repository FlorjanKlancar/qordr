import { Fragment, useState, useEffect } from "react";
import { Link } from "react-scroll";

function RestaurantSideMenu({ sideMenu }) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    window.onscroll = () => {
      setOffset(window.pageYOffset);
    };
  }, []);

  return (
    <Fragment>
      {offset > 827 && (
        <div className="sticky top-0 flex overflow-x-auto w-full z-20 bg-white lg:hidden items-center border-2 uppercase">
          {Object.keys(sideMenu).map(function (key, index) {
            return (
              <div
                className=" min-w-max p-2 h-12 rounded-lg mr-1 text-base font-semibold "
                key={index}
              >
                <Link
                  activeClass="text-default underline decoration-default underline-offset-4 decoration-2	"
                  to={key}
                  spy={true}
                  smooth={true}
                  offset={-120}
                >
                  {key}
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </Fragment>
  );
}
export default RestaurantSideMenu;
