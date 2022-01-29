import {Fragment} from "react";

function RestaurantSideInfo(props) {
  return (
    <Fragment>
      <div className="w-10/12 h-42 -mt-40 left-8 p-6 absolute z-10 bg-white lg:w-6/12 lg:relative lg:mt-0 overflow-hidden rounded-md border shadow-md text-center lg:text-left  ">
        <h2
          className="font-sans text-2xl subpixel-antialiased font-semibold tracking-wide lg:hidden"
          key={props.restaurantInfo[0].idRestaurant}
        >
          {props.restaurantInfo[0].restaurantName}
        </h2>
        <div className="text-left p-2 text-sm">
          <div>
            <i className="fas fa-star-half-alt"></i>
            <div className="pl-2 inline">
              {props.restaurantInfo[0].restaurantRate}/10
            </div>
          </div>
          <div>
            <i className="far fa-address-card"></i>
            <div className="pl-2 inline ">
              {props.restaurantInfo[0].restaurantAddress}
            </div>
          </div>
          <i className="far fa-clock"></i>
          <div className="pl-2 inline">
            {props.restaurantInfo[0].restaurantWorkingHours}
          </div>
          <br />
          <div className="pt-2 text-center">
            {props.restaurantInfo[0].restaurantDescription}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default RestaurantSideInfo;
