import { Fragment } from "react";
import TopPicksCard from "./TopPicksCard";

const TopPicks = (props) => {
  return (
    <Fragment>
      <div
        className="ml-4 mr-4 -mb-4 text-2xl border-b-2 border-gray-400 text-center "
        id="toppicks_header"
      >
        Top picks
      </div>
      <div className="relative w-full flex gap-6 snap-x snap-mandatory overflow-x-auto p-4">
        {props &&
          props.favItems?.map((item) => (
            <TopPicksCard
              pic={item.item.picture}
              price={item.item.price}
              title={item.item.title}
              desc={item.item.description}
              key={item.item.id}
            />
          ))}
      </div>
    </Fragment>
  );
};

export default TopPicks;
