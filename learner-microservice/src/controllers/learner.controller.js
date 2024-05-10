import User from "../schemas/user.schema.js";
import axios from "axios";

async function getUsers(req, res) {
  console.log("Fetching all users");
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

async function getUserById(req, res) {
  console.log("Fetching user by ID");
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

async function updateUser(req, res) {
  console.log("Updating user");
  try {
    const userId = req.params.id;
    const updates = req.body;
    const options = { new: true };
    const updatedUser = await User.findByIdAndUpdate(userId, updates, options);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

async function getCourseById(courseId) {
  try {
    const response = await axios.get(
      `http://localhost:4200/api/course/${courseId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching course:", error);
    throw error;
  }
}

async function enrollUserInCourses(req, res) {
  console.log("Enrolling user in courses");
  try {
    const userId = req.params.id;
    const courseIds = req.body.courseIds;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    for (const courseId of courseIds) {
      const course = await getCourseById(courseId);
      if (!course) {
        return res
          .status(404)
          .json({ message: `Course with ID ${courseId} not found` });
      }
      if (user.courses.includes(courseId)) {
        return res
          .status(400)
          .json({
            message: `User is already enrolled in course with ID ${courseId}`,
          });
      }
      user.courses.push(courseId);
    }

    await user.save();
    res.status(200).json({ message: "User enrolled in courses successfully" });
  } catch (error) {
    console.error(error);
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    res.status(500).json({ message: error.message });
  }
}


async function unenrollUserFromCourses(req, res) {
  console.log("Unenrolling user from courses");
  try {
    const userId = req.params.id;
    const courseIds = req.body.courseIds;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    for (const courseId of courseIds) {
      if (!user.courses.includes(courseId)) {
        return res
          .status(400)
          .json({
            message: `User is not enrolled in course with ID ${courseId}`,
          });
      }
      const index = user.courses.indexOf(courseId);
      if (index !== -1) {
        user.courses.splice(index, 1);
      }
    }

    await user.save();
    res.status(200).json({ message: "User unenrolled from courses successfully" });
  } catch (error) {
    console.error(error);
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    res.status(500).json({ message: error.message });
  }
}


export { getUsers, getUserById, updateUser, enrollUserInCourses, unenrollUserFromCourses };
