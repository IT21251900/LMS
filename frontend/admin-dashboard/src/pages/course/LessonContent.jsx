import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

export const LessonContent = ({ id }) => {

  const [noteDetails, setNoteDetails] = useState([]);


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

  return (
    <div>
      {noteDetails?.data?.map((note) => (
        <div key={note._id} className="note">

<>
ddvsvsvsdv
      
      
      
    </>
          {/* <h3>{note.title}</h3>
          <p>Description: {note.description}</p>
          {note.note_file ? (
            <a href={note.note_file_path} target="_blank" rel="noopener noreferrer">
              Download Note
            </a>
          ) : (
            <a href={note.note_url} target="_blank" rel="noopener noreferrer">
              View Note
            </a>
          )} */}
        </div>
      ))}
    </div>
    
  );
};
