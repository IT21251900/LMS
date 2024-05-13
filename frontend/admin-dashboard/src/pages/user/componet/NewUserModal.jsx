import React, { useState } from "react";
import NewUserForm from "./NewUserForm";

function NewUserModal() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* <!-- Modal toggle --> */}
      <button
        onClick={toggleModal}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        New
      </button>

      {/* <!-- Main modal --> */}
      <div
        id="default-modal"
        style={{ display: isOpen ? "block" : "none" }}
        tabIndex="-1"
        aria-hidden="true"
        class="hidden overflow-y-auto overflow-x-hidden absolute top-0 left-0 inset-0 z-50 overflow-auto bg-black bg-opacity-50"
      >
        <div className="absolute top-10 left-1/4" style={{ width: "50%" }}>
          <div className="relative bg-white rounded-lg shadow-md ">
            {/* <!-- Modal content --> */}
            <div className="relative">
              {/* <!-- Modal header --> */}
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-xl font-semibold text-gray-900">
                  New User
                </h3>
                <button
                  onClick={toggleModal}
                  type="button"
                  className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 flex items-center justify-center"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <div className="p-4 md:p-5 space-y-4">
                <NewUserForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewUserModal;
