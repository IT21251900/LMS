import Course from "../models/courseModel.js";
import Lesson from "../models/lessonModel.js";
import Note from "../models/noteModel.js";

export const createCourse = async (req, res) => {
  try {
    const { category, name, instructorId, price, description, credits } =
      req.body;
    const image = req.file.filename;

    const course = await Course.create({
      category,
      name,
      image,
      instructorId,
      price,
      description,
      credits,
    });

    res.status(201).json({ success: true, data: course });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();

    const coursesWithLessonCount = await Promise.all(
      courses.map(async (course) => {
        const lessonsCount = await Lesson.countDocuments({
          courseId: course._id,
        });
        return {
          ...course._doc,
          lessonCount: lessonsCount,
        };
      })
    );

    res.status(200).json({ success: true, data: coursesWithLessonCount });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    const lessons = await Lesson.find({ courseId: id });
    const lessonIds = lessons.map((lesson) => lesson._id);

    const notes = await Note.find({ lessonId: { $in: lessonIds } });

    const notesByLesson = {};
    notes.forEach((note) => {
      if (!notesByLesson[note.lessonId]) {
        notesByLesson[note.lessonId] = [note];
      } else {
        notesByLesson[note.lessonId].push(note);
      }
    });

    const lessonCount = lessons.length;

    const courseDetails = {
      _id: course._id,
      category: course.category,
      name: course.name,
      image: course.image,
      instructorId: course.instructorId,
      price: course.price,
      description: course.description,
      createdDate: course.createdDate,
      credits: course.credits,
      status: course.status,
      lessonCount: lessonCount,
      isApproved: course.isApproved,
      lessons: lessons.map((lesson) => ({
        _id: lesson._id,
        title: lesson.title,
        status: lesson.status,
        notes: notesByLesson[lesson._id] || [],
      })),
    };

    res.status(200).json({ success: true, data: courseDetails });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getCoursesByInstructorId = async (req, res) => {
  try {
    const { id } = req.params;
    const courses = await Course.find({ instructorId: id });
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getPendingCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isApproved: 0 });

    const coursesWithLessonCount = await Promise.all(
      courses.map(async (course) => {
        const lessonsCount = await Lesson.countDocuments({
          courseId: course._id,
        });
        return {
          ...course._doc,
          lessonCount: lessonsCount,
        };
      })
    );

    res.status(200).json({ success: true, data: coursesWithLessonCount });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getApprovedCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isApproved: 1 });

    const coursesWithLessonCount = await Promise.all(
      courses.map(async (course) => {
        const lessonsCount = await Lesson.countDocuments({
          courseId: course._id,
        });
        return {
          ...course._doc,
          lessonCount: lessonsCount,
        };
      })
    );

    res.status(200).json({ success: true, data: coursesWithLessonCount });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndUpdate(id, req.body, { new: true });
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


