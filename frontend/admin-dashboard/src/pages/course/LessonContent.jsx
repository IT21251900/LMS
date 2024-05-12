import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Input,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import rec from '../../assets/images/rec.png'

export const LessonContent = ({ id }) => {

  const [noteDetails, setNoteDetails] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    note_url: "",
  });
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false); // State to manage form visibility

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4200/course/lessons/notes/${id}`
        );
        setNoteDetails(response.data);
      } catch (error) {
        console.error("Error fetching note details:", error);
      }
    };
    fetchNotes();
  }, [id]);

  console.log("noteDetails:", noteDetails);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:4200/course/lessons/notes/${id}`,
        formData
      );
      // Clear form fields and error message
      setFormData({
        title: "",
        description: "",
        noteUrl: "",
      });
      setError("");
      // Refresh notes after adding
    } catch (error) {
      setError(error.response?.data.error);
    }
  };

  const handleDelete = async (noteId) => {
    try {
      await axios.delete(
        `http://localhost:4200/course/lessons/notes/${noteId}`
      );
      console.log("success")
      // Refresh notes after deletion
    } catch (error) {
      setError("Error deleting note.");
    }
  };

  return (
    <div>
      <button
        type="button"
        className="hidden md:flex w-fit gap-1 rounded-md items-center p-1 px-3 my-10 font-inter font-medium bg-[#9165A0] border-[#9165A0] hover:bg-white text-white hover:text-black border-[1px] hover:border-black text-[14px] transition-colors duration-500"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Close" : "+"}
      </button>
      {showForm && (
        <div className="w-[25%]">
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
              className="mb-3 "
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
            <button
              type="submit"
              className="hidden md:flex w-fit gap-1 rounded-md items-center p-1 px-3 my-10 font-inter font-medium bg-[#9165A0] border-[#9165A0] hover:bg-white text-white hover:text-black border-[1px] hover:border-black text-[14px] transition-colors duration-500"
            >
              Add Note
            </button>
          </form>
        </div>
      )}

      {noteDetails?.data?.map((note) => (
        <div key={note._id} className="note mb-6">
          <div className="flex justify-left">
            <a
              href={note.note_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={rec} alt="video" className="w-10"/>
            </a>
            <a
              href={note.note_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="flex items-center justify-center ml-5 text-blue-500 text-sm">{note.title}</span>
            </a>
          </div>
          <p className="text-sm mt-3">{note.description}</p>
          <button onClick={() => handleDelete(note._id)} className="text-red-400 text-[13px]">Remove</button>
        </div>
      ))}
    </div>
  );
};
