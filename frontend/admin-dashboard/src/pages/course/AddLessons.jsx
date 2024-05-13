import React, { useState } from "react";
import {
  Dialog,
  Card,
  Typography,
  Input,
  Textarea,
  Button,
} from "@material-tailwind/react";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CloseIcon } from "../../utils/icons";
import { message } from "antd";
import axios from "axios";

export const AddLessons = ({
  handleOpen,
  open,
  lessonTitle,
  setLessonTitle,
  handleLessonSubmit,
}) => {
  const handleClose = () => {
    handleOpen();
  };

  return (
    <>
      <Dialog
        size="xs"
        open={open}
        handler={handleClose}
        className="bg-transparent shadow-none rounded-sm font-inter h-[80%]"
      >
        <Card className="mx-auto w-full p-5 rounded-sm">
          <div className="flex justify-between align-center border-b-2">
            <div className="font-inter text-lg font-bold border-grey pb-5">
              Add Lesson
            </div>
            <div
              className="font-bold text-[20px] cursor-pointer"
              onClick={handleClose}
            >
              <CloseIcon />
            </div>
          </div>
          <form onSubmit={handleLessonSubmit}>
            <div className="w-full mt-5">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-semibold"
              >
                Title
              </Typography>
              <Input
                type="text"
                name="title"
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
              />
            </div>
            <div className="flex gap-5 w-auto justify-end mt-5">
              <Button type="submit" color="blue">
                Save Lesson
              </Button>
            </div>
          </form>
        </Card>
      </Dialog>
      <ToastContainer />
    </>
  );
};
