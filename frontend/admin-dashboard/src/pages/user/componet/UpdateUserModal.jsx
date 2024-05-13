import React, { useState } from "react";
import { Dialog, Card, Button } from "@material-tailwind/react";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CloseIcon } from "../../../utils/icons";
import axios from "axios";
import NewUserForm from "./NewUserForm";
import UpdateUserForm from "./UpdateUserForm";

export const UpdateUserModal = ({ user }) => {
  const [open, setOpen] = useState(false);
  const handleButton = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className="me-3">
        <Button size="sm" onClick={handleButton} color="blue">
          Update
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
              Update User
            </div>
            <div
              className="font-bold text-[20px] cursor-pointer"
              onClick={handleButton}
            >
              <CloseIcon />
            </div>
          </div>
          <div className="p-4 md:p-5 space-y-4">
            <UpdateUserForm user={user} />
          </div>
        </Card>
      </Dialog>
      <ToastContainer />
    </>
  );
};
