import { IdentificationIcon } from "@heroicons/react/outline";
import { ClockIcon } from "@heroicons/react/outline";

function RestaurantSideInfo({ restaurantInfo }) {
  return (
    <div className="bg-white sticky top-8 space-y-2 rounded-lg shadow-2xl p-4 border-2 border-gray-200 ml-8">
      <div className="text-sm text-gray-500">
        <p className="flex p-1">
          <IdentificationIcon className="h-5 w-5 mr-1" />
          {restaurantInfo[0].address}
        </p>
        <p className="flex p-1">
          <ClockIcon className="h-5 w-5 mr-1" />
          {restaurantInfo[0].working_hours}
        </p>
      </div>
      <p className="text-gray-500 p-2">{restaurantInfo[0].description}</p>
    </div>
  );
}
export default RestaurantSideInfo;
