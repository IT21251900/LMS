import mongoose, { Schema } from "mongoose";

const progressSchema = new mongoose.Schema({
  lessonId: { 
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Lesson' 
  },
  lessonName: { 
    type: String,
    required: true
  },
  progress: {
    type: Number,
    default: 0
  }
});

const courseProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  lessons: [progressSchema]
});

const CourseProgress = mongoose.model('CourseProgress', courseProgressSchema);

export default CourseProgress;
