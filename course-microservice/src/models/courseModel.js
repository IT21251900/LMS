import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image:{
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
  enroll_users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
