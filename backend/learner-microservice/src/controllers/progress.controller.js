import CourseProgress from "../schemas/lessons.schema.js";
import User from "../schemas/user.schema.js";

async function updateLessonProgress(req, res) {
  try {
    const { userId, courseId, lessonId, progress } = req.body;

    const courseProgress = await CourseProgress.findOne({ userId, courseId });

    if (!courseProgress) {
      return res.status(404).json({ message: "Course progress not found" });
    }
    const lessonIndex = courseProgress.lessons.findIndex(
      (lesson) => lesson.lessonId.toString() === lessonId
    );

    if (lessonIndex === -1) {
      return res
        .status(404)
        .json({ message: "Lesson not found in course progress" });
    }

    courseProgress.lessons[lessonIndex].progress = progress;

    await courseProgress.save();

    res.status(200).json({ message: "Lesson progress updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

async function getLessonProgressByLessonId(req, res) {
  try {
    const { userId, courseId, lessonId } = req.params; 

    console.log("userId:", userId);
    console.log("courseId:", courseId);
    console.log("lessonId:", lessonId);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const courseProgress = await CourseProgress.findOne({ userId, courseId });
    if (!courseProgress) {
      return res.status(404).json({ message: "Course progress not found" });
    }

    const lessonProgress = courseProgress.lessons.find(
      (lesson) => lesson.lessonId.toString() === lessonId
    );

    if (!lessonProgress) {
      return res.status(404).json({ message: "Lesson progress not found" });
    }

    res.status(200).json({ lessonProgress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}




export { updateLessonProgress, getLessonProgressByLessonId };
