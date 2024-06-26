import User from "../schemas/user.schema.js";
import axios from "axios";
import CourseProgress from "../schemas/lessons.schema.js";
import sendEmailNotification from "../services/notification.service.js";

import { Vonage } from "@vonage/server-sdk";

const vonage = new Vonage({
  apiKey: "916262b0",
  apiSecret: "Ip7NjWquRoa5gezA",
});

const from = "CourseraX";
const text = `You have successfully enrolled to the course`;

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
      `http://LMS_APIGateway:4200/course/${courseId}`
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error("Course not found");
    }
    console.error("Error fetching course:", error);
    throw error;
  }
}

async function getLessonsById(courseId) {
  try {
    const response = await axios.get(
      `http://LMS_APIGateway:4200/course/lessons/${courseId}`
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error("Course not found");
    }
    console.error("Error fetching course:", error);
    throw error;
  }
}


async function enrollUserInCourse(courseId,userId){
   try {
    const response = await axios.post(
      `http://LMS_APIGateway:4200/course/${courseId}/enroll/${userId}`
    );
    console.log("Added user to course successfully!");
  } catch (error) {
    console.error("Error adding user to course:", error);
  }

}

async function sendSMS(to) {
  await vonage.sms
    .send({ to, from, text })
    .then((resp) => {
      console.log("Message sent successfully");
      console.log(resp);
    })
    .catch((err) => {
      console.log("There was an error sending the messages.");
      console.error(err);
    });
}

async function enrollUserInCourses(req, res) {
  console.log("Enrolling user in courses");
  try {
    const userId = req.params.id;
    const { courseIds, selectedDate, selectedTimeSlots } = req.body;
    console.log(selectedDate);
    console.log(selectedTimeSlots);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!Array.isArray(selectedTimeSlots) || selectedTimeSlots.length === 0) {
      return res.status(400).json({ message: "Invalid selected time slots" });
    }

    // Validate course IDs
    try {
      const courses = await Promise.all(courseIds.map(getCourseById));
      if (courses.some((course) => !course)) {
        return res
          .status(404)
          .json({ message: "One or more provided course IDs are invalid" });
      }
    } catch (error) {
      console.error("Error fetching course:", error);
      throw error;
    }

    const timetableEntry = user.TimeTableSessions.find(
      (entry) => entry.day === selectedDate
    );
    if (!timetableEntry) {
      return res.status(400).json({ message: "Invalid selected date" });
    }
    console.log("Timetable Entry:", timetableEntry);

    let allSlotsAvailable = true;

    // Validate and update time slots
    for (const selectedSlot of selectedTimeSlots) {
      const { startTime, endTime, courseId } = selectedSlot;

      const existingSlot = timetableEntry.timeSlots.find(
        (slot) =>
          slot.startTime === startTime &&
          slot.endTime === endTime &&
          slot.isAvailable
      );

      if (!existingSlot) {
        allSlotsAvailable = false;
        break;
      }

      // Check if the time slot already has a courseId assigned
      if (existingSlot.courseId) {
        return res.status(400).json({
          message: `Time slot ${startTime}-${endTime} is already booked for a course`,
        });
      }

      existingSlot.isAvailable = false;
      existingSlot.courseId = courseId; // Add course ID to the time slot
    }

    if (!allSlotsAvailable) {
      return res
        .status(400)
        .json({ message: "One or more selected time slots are not available" });
    }

    // Enroll the user in courses
    for (const courseId of courseIds) {
      if (user.courses.includes(courseId)) {
        return res.status(400).json({
          message: `User is already enrolled in course with ID ${courseId}`,
        });
      }
      user.courses.push(courseId);
    }

    for (const courseId of courseIds) {
      const lessonsResponse = await getLessonsById(courseId);
      const lessons = lessonsResponse.data;
      console.log("Lessons for course", courseId, ":", lessons);

      const courseProgress = lessons.map((lesson) => ({
        lessonId: lesson._id,
        lessonName: lesson.title,
        progress: 0,
      }));

      await CourseProgress.create({
        userId: user._id,
        courseId,
        lessons: courseProgress,
      });
    }

    for(const courseId of courseIds){
      await enrollUserInCourse(courseId,userId)
    }

    await user.save();
    await sendEmailNotification(userId, 'You have been enrolled in courses successfully');
    //sendSMS(user.phone);

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
    const courseId = req.body.courseId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.courses.includes(courseId)) {
      return res.status(400).json({
        message: `User is not enrolled in course with ID ${courseId}`,
      });
    }

    // Find the user's time slots associated with the course to be unenrolled
    user.TimeTableSessions.forEach((session) => {
      session.timeSlots.forEach((slot) => {
        if (slot.courseId && slot.courseId.toString() === courseId) {
          slot.courseId = undefined; // Remove the course ID from the time slot
          slot.isAvailable = true; // Set availability to true
        }
      });
    });

    const index = user.courses.indexOf(courseId);
    if (index !== -1) {
      user.courses.splice(index, 1); // Remove the course ID from the user's enrolled courses
    }

    await user.save();
    res
      .status(200)
      .json({ message: "User unenrolled from course successfully" });
  } catch (error) {
    console.error(error);
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    res.status(500).json({ message: error.message });
  }
}

const getUserTimeSlots = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { TimeTableSessions } = user;

    const availableTimeSlots = TimeTableSessions.map((session) => {
      const { day, timeSlots } = session;
      const availableSlots = timeSlots.filter((slot) => slot.isAvailable);
      return { day, availableSlots };
    });

    res.json(availableTimeSlots);
  } catch (error) {
    console.error("Error fetching user time slots:", error.message);
    next(error);
  }
};

const getUserDayTimeSlots = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { day } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { TimeTableSessions } = user;

    const dayTimeSlots = TimeTableSessions.find(
      (session) => session.day === day
    );

    if (!dayTimeSlots) {
      return res
        .status(404)
        .json({ error: `No time slots available for ${day}` });
    }

    const { timeSlots } = dayTimeSlots;
    const availableTimeSlots = timeSlots.filter((slot) => slot.isAvailable);

    res.json({ day, availableTimeSlots });
  } catch (error) {
    console.error("Error fetching user day time slots:", error.message);
    next(error);
  }
};

export {
  getUsers,
  getUserById,
  updateUser,
  enrollUserInCourses,
  unenrollUserFromCourses,
  getUserTimeSlots,
  getUserDayTimeSlots,
};
