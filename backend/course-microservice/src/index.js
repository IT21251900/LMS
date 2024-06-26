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
  getCoursesByInstructorId,
  getPendingCourses,
  getApprovedCourses,
  enrollUserToCourse,
  approveCourse,
  unenrollUserFromCourse
} from "./controllers/courseController.js";
import upload from "./middlewares/uploadMiddleware.js";
import lesson_notes from "./middlewares/uploadLessonNoteMiddleware.js";
import {
  addLessonForCourse,
  getLessonsForCourse,
  updateLesson,
} from "./controllers/lessonController.js";
import { createNote, getAllNotes ,deleteNote } from "./controllers/noteController.js";

config();

export const courseService = express();

courseService.use(cookieParser());
courseService.use(
  cors({
    origin: [
      "http://localhost:5100",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:5173",
    ],
    credentials: true,
  })
);

courseService.use(express.json());

courseService.post("/", createCourse);
courseService.get("/", getAllCourses);
courseService.get("/pending", getPendingCourses);
courseService.get("/approved", getApprovedCourses);
courseService.get("/:id", getCourseById);
courseService.post("/:courseId/enroll/:userId", enrollUserToCourse);
courseService.delete("/:courseId/unenroll/:userId", unenrollUserFromCourse);
courseService.get("/instructor/:id", getCoursesByInstructorId);
courseService.put("/:id", updateCourse);
courseService.put("/approve/:id", approveCourse);
courseService.delete("/:id", deleteCourse);

courseService.post("/lessons/:courseId", addLessonForCourse);
courseService.get("/lessons/:courseId", getLessonsForCourse);
courseService.put("/lessons/:id", updateLesson);

courseService.post(
  "/lessons/notes/:lessonId",
  lesson_notes.single("note_file"),
  createNote
);
courseService.get("/lessons/notes/:lessonId", getAllNotes);
courseService.delete("/lessons/notes/:noteId", deleteNote);

courseService.use("/uploads", express.static("src/uploads"));
courseService.use(
  "/lesson_note_files",
  express.static("src/lesson_note_files")
);
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
