import {Fragment, useState} from "react";
import Modal from "../../layout/Modal";
import TopPicksCard from "./TopPicksCard";

const TopPicks = (props) => {
  const [openModal, setOpenModal] = useState(false);

  function openModalHandler() {
    setOpenModal(true);
  }

  function closeModalHandler() {
    setOpenModal(false);
  }

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
              pic={item.itemPicture}
              price={item.itemPrice}
              title={item.itemTitle}
              desc={item.itemDescription}
              key={item.idItem}
            />
          ))}
      </div>
    </Fragment>
  );
};

export default TopPicks;
