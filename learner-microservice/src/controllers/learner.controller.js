import User from "../schemas/user.schema.js";
import axios from "axios";
import timetable from "../utils/timetable.js";

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
    if (error.response && error.response.status === 404) {
      throw new Error("Course not found");
    }
    console.error("Error fetching course:", error);
    throw error;
  }
}

// async function enrollUserInCourses(req, res) {
//   console.log("Enrolling user in courses");
//   try {
//     const userId = req.params.id;
//     const { courseIds, selectedDate, selectedTimeSlots } = req.body;
//     console.log(selectedDate);
//     console.log(selectedTimeSlots);

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (!Array.isArray(selectedTimeSlots) || selectedTimeSlots.length === 0) {
//       return res.status(400).json({ message: "Invalid selected time slots" });
//     }

//     const timetableEntry = user.TimeTableSessions.find(entry => entry.day === selectedDate);
//     if (!timetableEntry) {
//       return res.status(400).json({ message: "Invalid selected date" });
//     }
//     console.log("Timetable Entry:", timetableEntry);

//     let allSlotsAvailable = true;

//     for (const selectedSlot of selectedTimeSlots) {
//       const { startTime, endTime } = selectedSlot;

//       const existingSlot = timetableEntry.timeSlots.find(slot =>
//         slot.startTime === startTime && slot.endTime === endTime && slot.isAvailable
//       );

//       console.log("exist slots:", existingSlot);

//       if (!existingSlot) {
//         allSlotsAvailable = false;
//         break; 
//       }
//     }

//     if (!allSlotsAvailable) {
//       return res.status(400).json({ message: "One or more selected time slots are not available" });
//     }

//     // Fetch course details for each provided course ID
//     const courses = await Promise.all(courseIds.map(getCourseById));

//     // Check if any of the provided course IDs are invalid
//     const invalidCourses = courses.filter(course => !course);
//     if (invalidCourses.length > 0) {
//       return res.status(404).json({ message: "One or more provided course IDs are invalid" });
//     }

//     // If all checks pass, mark time slots as unavailable and enroll the user in courses
//     for (const selectedSlot of selectedTimeSlots) {
//       const { startTime, endTime } = selectedSlot;
//       const existingSlot = timetableEntry.timeSlots.find(slot =>
//         slot.startTime === startTime && slot.endTime === endTime && slot.isAvailable
//       );
//       existingSlot.isAvailable = false;
//     }

//     // Enroll the user in courses
//     for (const courseId of courseIds) {
//       if (user.courses.includes(courseId)) {
//         return res.status(400).json({ message: `User is already enrolled in course with ID ${courseId}` });
//       }
//       user.courses.push(courseId);
//     }

//     await user.save();
//     res.status(200).json({ message: "User enrolled in courses successfully" });
//   } catch (error) {
//     console.error(error);
//     if (error.name === "CastError") {
//       return res.status(400).json({ message: "Invalid ID format" });
//     }
//     res.status(500).json({ message: error.message });
//   }
// }


// async function enrollUserInCourses(req, res) {
//   console.log("Enrolling user in courses");
//   try {
//     const userId = req.params.id;
//     const { courseIds, selectedDate, selectedTimeSlots } = req.body;
//     console.log(selectedDate);
//     console.log(selectedTimeSlots);

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (!Array.isArray(selectedTimeSlots) || selectedTimeSlots.length === 0) {
//       return res.status(400).json({ message: "Invalid selected time slots" });
//     }

//     const timetableEntry = user.TimeTableSessions.find(entry => entry.day === selectedDate);
//     if (!timetableEntry) {
//       return res.status(400).json({ message: "Invalid selected date" });
//     }
//     console.log("Timetable Entry:", timetableEntry);

//     let allSlotsAvailable = true;

//     for (const selectedSlot of selectedTimeSlots) {
//       const { startTime, endTime } = selectedSlot;

//       const existingSlot = timetableEntry.timeSlots.find(slot =>
//         slot.startTime === startTime && slot.endTime === endTime && slot.isAvailable
//       );

//       console.log("exist slots:", existingSlot);

//       if (!existingSlot) {
//         allSlotsAvailable = false;
//         break; 
//       }
//     }

//     if (!allSlotsAvailable) {
//       return res.status(400).json({ message: "One or more selected time slots are not available" });
//     }

//     // Update time slots with course IDs
//     for (const selectedSlot of selectedTimeSlots) {
//       const { startTime, endTime } = selectedSlot;
//       const existingSlot = timetableEntry.timeSlots.find(slot =>
//         slot.startTime === startTime && slot.endTime === endTime && slot.isAvailable
//       );
//       existingSlot.isAvailable = false;
//       existingSlot.courseIds = courseIds; // Add course IDs to the time slot
//     }

//     // Enroll the user in courses
//     for (const courseId of courseIds) {
//       if (user.courses.includes(courseId)) {
//         return res.status(400).json({ message: `User is already enrolled in course with ID ${courseId}` });
//       }
//       user.courses.push(courseId);
//     }

//     await user.save();
//     res.status(200).json({ message: "User enrolled in courses successfully" });
//   } catch (error) {
//     console.error(error);
//     if (error.name === "CastError") {
//       return res.status(400).json({ message: "Invalid ID format" });
//     }
//     res.status(500).json({ message: error.message });
//   }
// }


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

    const timetableEntry = user.TimeTableSessions.find(entry => entry.day === selectedDate);
    if (!timetableEntry) {
      return res.status(400).json({ message: "Invalid selected date" });
    }
    console.log("Timetable Entry:", timetableEntry);

    let allSlotsAvailable = true;

    // Validate and update time slots
    for (const selectedSlot of selectedTimeSlots) {
      const { startTime, endTime, courseId } = selectedSlot;

      const existingSlot = timetableEntry.timeSlots.find(slot =>
        slot.startTime === startTime && slot.endTime === endTime && slot.isAvailable
      );

      if (!existingSlot) {
        allSlotsAvailable = false;
        break; 
      }

      // Check if the time slot already has a courseId assigned
      if (existingSlot.courseId) {
        return res.status(400).json({ message: `Time slot ${startTime}-${endTime} is already booked for a course` });
      }

      existingSlot.isAvailable = false;
      existingSlot.courseId = courseId; // Add course ID to the time slot
    }

    if (!allSlotsAvailable) {
      return res.status(400).json({ message: "One or more selected time slots are not available" });
    }

    // Enroll the user in courses
    for (const courseId of courseIds) {
      if (user.courses.includes(courseId)) {
        return res.status(400).json({ message: `User is already enrolled in course with ID ${courseId}` });
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





// async function unenrollUserFromCourses(req, res) {
//   console.log("Unenrolling user from courses");
//   try {
//     const userId = req.params.id;
//     const courseIds = req.body.courseIds;
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     for (const courseId of courseIds) {
//       if (!user.courses.includes(courseId)) {
//         return res
//           .status(400)
//           .json({
//             message: `User is not enrolled in course with ID ${courseId}`,
//           });
//       }
//       const index = user.courses.indexOf(courseId);
//       if (index !== -1) {
//         user.courses.splice(index, 1);
//       }
//     }

//     await user.save();
//     res.status(200).json({ message: "User unenrolled from courses successfully" });
//   } catch (error) {
//     console.error(error);
//     if (error.name === "CastError") {
//       return res.status(400).json({ message: "Invalid ID format" });
//     }
//     res.status(500).json({ message: error.message });
//   }
// }

async function unenrollUserFromCourses(req, res) {
  console.log("Unenrolling user from courses");
  try {
    const userId = req.params.id;
    const courseId = req.body.courseId; // Change to courseId since we're unenrolling only one course at a time
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.courses.includes(courseId)) {
      return res.status(400).json({ message: `User is not enrolled in course with ID ${courseId}` });
    }

    // Find the user's time slots associated with the course to be unenrolled
    user.TimeTableSessions.forEach(session => {
      session.timeSlots.forEach(slot => {
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
    res.status(200).json({ message: "User unenrolled from course successfully" });
  } catch (error) {
    console.error(error);
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    res.status(500).json({ message: error.message });
  }
}



export { getUsers, getUserById, updateUser, enrollUserInCourses, unenrollUserFromCourses };
