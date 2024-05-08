import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { connectDB } from "../configs/DBConnect.js";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getCoursesByInstructorId
} from "./controllers/courseController.js";
import {
addLessonForCourse,getLessonsForCourse
} from "./controllers/lessonController.js";

config();

export const courseService = express();

courseService.use(cookieParser());
courseService.use(cors());

courseService.use(express.json());

courseService.post("/", createCourse);
courseService.post("/lessons/:courseId", addLessonForCourse);
courseService.get("/", getAllCourses);
courseService.get("/:id", getCourseById);
courseService.get("/instructor/:id", getCoursesByInstructorId);
courseService.get("/lessons/:courseId", getLessonsForCourse);
courseService.put("/:id", updateCourse);
courseService.delete("/:id", deleteCourse);

const port = process.env.COURSE_PORT;

// Start the server after connecting to the database
connectDB()
  .then(() => {
    courseService.listen(port, () => {
      console.log(`Course server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

courseService.get("/", (req, res) => {
  console.log(`Received request to course server from gateway`);
  res.status(200).send("Response from course server");
});
