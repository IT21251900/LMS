import Lesson from "../models/lessonModel.js";

export const addLessonForCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, status } = req.body;

    const lesson = await Lesson.create({ courseId, title, status });
    await lesson.save();

    res.status(201).json({ success: true, data: lesson });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getLessonsForCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const lessons = await Lesson.find({ courseId: courseId });
    res.status(200).json({ success: true, data: lessons });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const { title, status } = req.body;

    const lesson = await Lesson.findOneAndUpdate(
      lessonId,
      { title, status },
      { new: true, runValidators: true }
    );

    if (!lesson) {
      return res
        .status(404)
        .json({ success: false, error: "Lesson not found" });
    }

    res.status(200).json({ success: true, data: lesson });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
