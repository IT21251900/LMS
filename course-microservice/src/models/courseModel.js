import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  instructorId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  lessons: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  credits: {
    type: Number,
    required: true,
  },
  status: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
  isApproved: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
