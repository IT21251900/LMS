import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true,
  },
  note_file: {
    type: String,
  },
  note_url: {
    type: String,
  },
  description: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
});

const Note = mongoose.model("Note", noteSchema);

export default Note;
