/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";

export default function DeleteModal({
  openModal,
  setOpenModal,
  item,
  deleteItem,
}) {
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);

  return (
    <Transition.Root show={openModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-[999] inset-0 overflow-y-auto"
        onClose={setOpenModal}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-80 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={`relative inline-block align-bottom ${
                isDarkTheme ? "bg-darkThemeBackground" : "bg-white"
              } rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full`}
            >
              <div
                className={`${
                  isDarkTheme ? "bg-darkThemeBackground" : "bg-white"
                } px-4 pt-5 pb-4 sm:p-6 sm:pb-4`}
              >
                <div className="sm:flex sm:items-start">
                  <div
                    className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${
                      isDarkTheme ? "bg-red-400" : "bg-red-100"
                    }  sm:mx-0 sm:h-10 sm:w-10`}
                  >
                    <ExclamationIcon
                      className={`h-6 w-6 ${
                        isDarkTheme ? "text-red-700" : "text-red-600"
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className={`text-lg leading-6 font-medium ${
                        isDarkTheme ? "text-gray-400" : "text-gray-900"
                      }`}
                    >
                      Delete item{" "}
                      <span
                        className={`${
                          isDarkTheme
                            ? "text-red-600 underline underline-offset-2"
                            : "text-default underline underline-offset-2"
                        }`}
                      >
                        {item.title}
                      </span>
                    </Dialog.Title>
                    <div className="mt-2">
                      <p
                        className={`text-sm  ${
                          isDarkTheme ? "text-gray-300" : "text-gray-500"
                        }`}
                      >
                        Are you sure you want to delete {item.title}? All of
                        your data will be permanently removed. This action
                        cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`${
                  isDarkTheme ? "bg-darkThemeBackground" : "bg-gray-50"
                } px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse`}
              >
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setOpenModal(false);
                    deleteItem(item.id);
                  }}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className={`mt-3 w-full inline-flex justify-center rounded-md border  shadow-sm px-4 py-2  ${
                    isDarkTheme
                      ? "bg-slate-900 text-white border-slate-800 hover:bg-slate-800 hover:text-gray-300"
                      : "bg-white text-gray-700 border-gray-300"
                  } text-base font-medium  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm`}
                  onClick={() => setOpenModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
