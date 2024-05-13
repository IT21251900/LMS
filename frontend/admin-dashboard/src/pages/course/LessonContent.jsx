import React, { useState, useEffect } from "react";
import axios from "axios";
import rec from "../../assets/images/rec.png";
import { message } from "antd";
import { AddNote } from "./AddNote";

export const LessonContent = ({ id }) => {
  const [newOpen, setNewOpen] = useState(false);
  const newHandleOpen = () => setNewOpen((cur) => !cur);

  const [noteDetails, setNoteDetails] = useState([]);

  const [tableLoading, setTableLoading] = useState(false);
  const handleLoading = () => setTableLoading((pre) => !pre);

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
  }, [id, tableLoading]);

  const handleDelete = async (noteId) => {
    try {
      await axios.delete(
        `http://localhost:4200/course/lessons/notes/${noteId}`
      );
      console.log("success");
      message.error("Note deleted successfully");
      handleLoading();
    } catch (error) {
      message.error("Error deleting note");
    }
  };

  return (
    <>
      <div>
        <button
          type="button"
          className="hidden md:flex w-fit gap-1 rounded-md items-center p-1 px-1 mb-6 font-inter font-medium bg-primary border-primary hover:bg-white text-white hover:text-black border-[1px] hover:border-black text-[14px] transition-colors duration-500"
          onClick={newHandleOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          Add Lesson Content
        </button>

        {noteDetails?.data?.map((note) => (
          <div key={note._id} className="note mb-6">
            <div className="flex justify-left">
              <a href={note.note_url} target="_blank" rel="noopener noreferrer">
                <img src={rec} alt="video" className="w-8" />
              </a>
              <a href={note.note_url} target="_blank" rel="noopener noreferrer">
                <span className="flex items-center justify-center ml-5 text-blue-500 text-sm">
                  {note.title}
                </span>
              </a>
            </div>
            <p className="text-sm mt-3">{note.description}</p>
            <button
              onClick={() => handleDelete(note._id)}
              className="text-red-400 text-[13px]"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <AddNote
        handleOpen={newHandleOpen}
        open={newOpen}
        handleLoading={handleLoading}
        lessonId={id}
      />
    </>
  );
};
