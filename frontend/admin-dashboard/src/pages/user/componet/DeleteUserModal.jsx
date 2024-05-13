import React, { useState } from "react";
import { Dialog, Card, Button } from "@material-tailwind/react";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CloseIcon } from "../../../utils/icons";
import axios from "axios";
import NewUserForm from "./NewUserForm";
import UpdateUserForm from "./UpdateUserForm";
import { DeleteUser } from "../service/UserService";

export const DeleteUserModal = ({ user }) => {
  const [open, setOpen] = useState(false);
  const handleButton = () => {
    setOpen(!open);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await DeleteUser(user._id);

      if (res.data.success) {
        alert(res.data.message);
        window.location.reload();
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="me-3">
        <Button size="sm" onClick={handleButton} color="red">
          Delete
        </Button>
      </div>
      <Dialog
        size="md"
        open={open}
        handler={handleButton}
        className="bg-transparent shadow-none rounded-sm font-inter h-[80%]"
      >
        <Card className="mx-auto w-full p-5 rounded-sm">
          <div className="flex justify-between align-center border-b-2">
            <div className="font-inter text-lg font-bold border-grey pb-5">
              Delete User
            </div>
            <div
              className="font-bold text-[20px] cursor-pointer"
              onClick={handleButton}
            >
              <CloseIcon />
            </div>
          </div>
          <div class="p-4 md:p-5 text-center">
            <svg
              class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this user?
            </h3>
            <h5 className="mb-5 text-red-500"> {user.name} </h5>
            <button
              data-modal-hide="popup-modal"
              type="button"
              onClick={handleSubmit}
              class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
            >
              Yes, I'm sure
            </button>
            <button
              data-modal-hide="popup-modal"
              type="button"
              class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              No, cancel
            </button>
          </div>
        </Card>
      </Dialog>
      <ToastContainer />
    </>
  );
};
