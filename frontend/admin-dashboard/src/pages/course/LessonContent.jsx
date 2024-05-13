import React, { useState, useEffect } from "react";
import axios from "axios";
import rec from "../../assets/images/rec.png";
import {
  Button,
} from "@material-tailwind/react";
import { message } from "antd";
import { AddNote } from "./AddNote";

export const LessonContent = ({ id ,showUpdateButton}) => {
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
      {showUpdateButton && (
              <Button
              type="button"
              color="blue"
              className="mb-8"
              onClick={newHandleOpen}
            >
              Add Lesson Content
            </Button>
            )}
        

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

            {showUpdateButton && (
                          <button
                          onClick={() => handleDelete(note._id)}
                          className="text-red-400 text-[13px]"
                        >
                          Remove
                        </button>
            )}
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
