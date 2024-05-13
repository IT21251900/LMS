import React, { useState } from "react";
import { Dialog, Card } from "@material-tailwind/react";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CloseIcon } from "../../../utils/icons";
import { message } from "antd";
import axios from "axios";
import NewUserForm from "./NewUserForm";

export const NewUserModal = ({ handleOpen, open }) => {
  const handleClose = () => {
    handleOpen();
  };

  return (
    <>
      <Dialog
        size="md"
        open={open}
        handler={handleClose}
        className="bg-transparent shadow-none rounded-sm font-inter h-[80%]"
      >
        <Card className="mx-auto w-full p-5 rounded-sm">
          <div className="flex justify-between align-center border-b-2">
            <div className="font-inter text-lg font-bold border-grey pb-5">
              New User
            </div>
            <div
              className="font-bold text-[20px] cursor-pointer"
              onClick={handleClose}
            >
              <CloseIcon />
            </div>
          </div>
          <div className="p-4 md:p-5 space-y-4">
            <NewUserForm />
          </div>
        </Card>
      </Dialog>
      <ToastContainer />
    </>
  );
};
