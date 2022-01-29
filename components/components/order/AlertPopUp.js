import Modal from "../../layout/Modal";
import React from "react";

function AlertPopUp(props) {
  return (
    <Modal>
      <div className=" max-h-96	overflow-scroll">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-left font-bold text-2xl	">Alert</div>
          <div className="divide-y ">
            <button
              className="float-right border-2 border-gray-500	 hover:bg-gray-300 text-gray-900 font-bold py-2 px-4 rounded-full"
              onClick={props.onClick}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="col-span-2">
            You need to select some items first before ordering...
          </div>
        </div>
      </div>
    </Modal>
  );
}
export default AlertPopUp;
