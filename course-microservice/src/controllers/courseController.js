import Course from "../models/courseModel.js";
import Lesson from "../models/lessonModel.js";
import Note from "../models/noteModel.js";

export const createCourse = async (req, res) => {
  try {
    const { category, name, instructorId, price, description, credits,image } =
      req.body;

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
    const courses = await Course.find({ isApproved: 1 });

    const coursesWithLessonCount = await Promise.all(
      courses.map(async (course) => {
        const lessonsCount = await Lesson.countDocuments({
          courseId: course._id,
        });
        const enrollUserCount = course.enroll_users.length;
        return {
          ...course._doc,
          lessonCount: lessonsCount,
          enrollUserCount
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
      enrollUserCount: course.enroll_users.length,
      isApproved: course.isApproved,
      enroll_users: course.enroll_users,
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
    
    const coursesWithLessonCount = await Promise.all(
      courses.map(async (course) => {
        const lessonsCount = await Lesson.countDocuments({
          courseId: course._id,
        });
        const enrollUserCount = course.enroll_users.length;
        return {
          ...course._doc,
          lessonCount: lessonsCount,
          enrollUserCount
        };
      })
    );

    res.status(200).json({ success: true, data: coursesWithLessonCount });
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
        const enrollUserCount = course.enroll_users.length;
        return {
          ...course._doc,
          lessonCount: lessonsCount,
          enrollUserCount
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

export const enrollUserToCourse = async (req, res) => {
  try {
    const { courseId, userId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    if (course.enroll_users.includes(userId)) {
      return res
        .status(400)
        .json({
          success: false,
          message: "User already enrolled in the course",
        });
    }

    course.enroll_users.push(userId);
    await course.save();

    res
      .status(200)
      .json({
        success: true,
        message: "User enrolled in the course successfully",
      });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const approveCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    course.isApproved = 1;
    await course.save();

    res.status(200).json({ success: true, message: "Course approved successfully", data: course });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const unenrollUserFromCourse = async (req, res) => {
  try {
    const { courseId, userId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    if (!course.enroll_users.includes(userId)) {
      return res
        .status(400)
        .json({
          success: false,
          message: "User is not enrolled in the course",
        });
    }

    await Course.findByIdAndUpdate(courseId, { $pull: { enroll_users: userId } });

    res
      .status(200)
      .json({
        success: true,
        message: "User unenrolled from the course successfully",
      });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


