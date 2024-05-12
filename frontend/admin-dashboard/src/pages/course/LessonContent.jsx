import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
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
      const newNoteDetails = await axios.get(
        `http://localhost:4200/course/lessons/notes/${id}`
      );
      setNoteDetails(newNoteDetails.data);
    } catch (error) {
      setError(error.response?.data.error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="error">{error}</div>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          placeholder="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
        <input
          type="text"
          placeholder="Note URL"
          name="note_url"
          value={formData.note_url}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Note</button>
      </form>

      {noteDetails?.data?.map((note) => (
        <div key={note._id} className="note mb-6">


        
          
          <div className="flex justify-left">

          <a href={note.note_url} target="_blank" rel="noopener noreferrer"><img src={rec} alt="video" className="w-10"/></a>
          <a href={note.note_url} target="_blank" rel="noopener noreferrer"><span className="flex items-center justify-center ml-5 text-blue-500 text-sm">{note.title}</span></a>
          
          

</div>
          
          

            <p className="text-sm mt-3">{note.description}</p>
        </div>
      ))}
    </div>
  );
};
