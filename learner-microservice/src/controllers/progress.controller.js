import CourseProgress from '../schemas/lessons.schema.js';

async function updateLessonProgress(req, res) {
  try {
    const { userId, courseId, lessonId, progress } = req.body;

    const courseProgress = await CourseProgress.findOne({ userId, courseId });

    if (!courseProgress) {
      return res.status(404).json({ message: 'Course progress not found' });
    }
    const lessonIndex = courseProgress.lessons.findIndex(
      lesson => lesson.lessonId.toString() === lessonId
    );

    if (lessonIndex === -1) {
      return res.status(404).json({ message: 'Lesson not found in course progress' });
    }

    courseProgress.lessons[lessonIndex].progress = progress;
    
    await courseProgress.save();

    res.status(200).json({ message: 'Lesson progress updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

export { updateLessonProgress };
