import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }]
});

const Lesson = mongoose.model("Lesson", lessonSchema);

export default Lesson;
