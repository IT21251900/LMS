import Course from "../models/courseModel.js";
import Lesson from "../models/lessonModel.js";

export const createCourse = async (req, res) => {
  try {
    const { category, name, instructorId, price, description, credits } = req.body;
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
        const lessonsCount = await Lesson.countDocuments({ courseId: course._id });
        return {
          ...course._doc,
          lessonCount: lessonsCount
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
          return res.status(404).json({ success: false, message: "Course not found" });
      }

      const lessons = await Lesson.find({ courseId: id });

      const lessonsCount = await Lesson.countDocuments({ courseId: id });

      res.status(200).json({ success: true, data: { course, lessonCount: lessonsCount,lessons: lessons } });
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
}

export const getCoursesByInstructorId = async (req,res) =>{
    try{
        const {id} = req.params;
        const courses = await Course.find({instructorId:id })
        res.status(200).json({success:true,data:courses})
    } catch(error){
        res.status(500).json({success:false,error:error.message})
    }
}

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
