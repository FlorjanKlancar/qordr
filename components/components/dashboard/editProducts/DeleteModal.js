import Modal from "../../../layout/Modal";

function DeleteModal(props) {
  async function deleteHandler() {
    const idItem = props.idItem;
    const response = await fetch(
      `https://qorder.link/api/deleteDashboardItem`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({idItem}),
      }
    );
    const data = await response.json();

    if (data.success === "success") props.alertMessageInfo();
    else props.alertMessageFail();
    props.updateItemHandler(true);
    props.closeDeleteModalHandler();
  }

  return (
    <Modal onClose={props.closeDeleteModalHandler}>
      <div className="mt-3 text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
          <i className="fa-3x fas fa-minus-circle text-red-500"></i>
        </div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Delete item {props.itemTitle}?
        </h3>
        <div className="mt-2 px-7 py-3">
          <p className="text-sm text-gray-500">
            Are you sure you want to delete this item?
          </p>
        </div>
        <div className="items-center px-4 py-3">
          <button
            className="w-4/12 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={props.closeDeleteModalHandler}
          >
            Cancel
          </button>
          <button
            id="ok-btn"
            className="ml-4 px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-4/12 shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
            onClick={deleteHandler}
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}
export default DeleteModal;
