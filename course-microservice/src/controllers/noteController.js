import Note from "../models/noteModel.js";

export const createNote = async (req, res) => {
  try {
    const { title, description, note_url } = req.body;
    const { lessonId } = req.params;

    const note = await Note.create({
      lessonId,
      description,
      title,
      note_url,
    });

    res.status(201).json({ success: true, data: note });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getAllNotes = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const baseUrl = `${req.protocol}://${req.get("host")}/lesson_note_files`;
    const notes = await Note.find({ lessonId: lessonId });

    let notes_list = [];
    notes.forEach((note) => {
      let note_data = {};
      if (note.note_file !== "") {
        let note_file_path = `${baseUrl}/${note.note_file}`;
        note_data = {
          ...note.toObject(),
          note_file_path,
        };
      } else {
        note_data = note.toObject();
      }
      notes_list.push(note_data);
    });

    res.status(200).json({ success: true, data: notes_list });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

