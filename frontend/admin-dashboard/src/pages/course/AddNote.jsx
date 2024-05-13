import React, { useState } from "react";
import {
  Dialog,
  Card,
  Typography,
  Input,
  Textarea,
} from "@material-tailwind/react";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CloseIcon } from "../../utils/icons";
import { message } from "antd";
import axios from "axios";

export const AddNote = ({ handleOpen, open, handleLoading, lessonId }) => {
  const handleClose = () => {
    handleOpen();
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    note_url: "",
  });

  const [titleError, setTitleError] = useState(false); // State to manage title error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "title") {
      setTitleError(value.trim() === ""); // Set titleError to true if title is empty
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.title.trim() === "") {
      setTitleError(true); // Set titleError to true if title is empty
      return; // Stop form submission if title is empty
    }

    try {
      const response = await axios.post(
        `http://localhost:4200/course/lessons/notes/${lessonId}`,
        formData
      );
      setFormData({
        title: "",
        description: "",
        note_url: "",
      });
      handleClose();
      message.success("Note added successfully");
      handleLoading();
    } catch (error) {
      message.error("Error adding note");
    }
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
              Add Lesson Content
            </div>
            <div
              className="font-bold text-[20px] cursor-pointer"
              onClick={handleClose}
            >
              <CloseIcon />
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-semibold"
            >
              Title
            </Typography>
            <Input
              type="text"
              placeholder="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mb-3"
            />
            {titleError && (
              <Typography variant="small" color="red" className="mt-1">
                Title is required
              </Typography>
            )}
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 mt-2 font-semibold"
            >
              Description
            </Typography>

            <Textarea
              placeholder="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mb-2 "
            ></Textarea>

            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-semibold"
            >
              Video Link
            </Typography>

            <Input
              type="text"
              placeholder="Note URL"
              name="note_url"
              value={formData.note_url}
              onChange={handleChange}
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="hidden md:flex w-fit gap-1 rounded-md items-center p-1 px-3 my-5 font-inter font-medium bg-primary border-primary hover:bg-white text-white hover:text-black border-[1px] hover:border-black text-[14px] transition-colors duration-500"
              >
                Add Content
              </button>
            </div>
          </form>
        </Card>
      </Dialog>
      <ToastContainer />
    </>
  );
};
