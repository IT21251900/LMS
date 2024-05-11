import axios from "axios";
import { BE_URL } from "../../../utils/APIUrl";

const GetCourses = async () => {
  try {
    const role = localStorage.getItem("role");

    if (!role) {
      throw new Error("Role not found");
    }

    return await axios.get(`${BE_URL}/course/`);
  } catch (error) {
    // Handle error
    console.error("Error fetching courses:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const GetPendingCorses = async () => {
  try {
    const role = localStorage.getItem("role");

    if (!role) {
      throw new Error("Role not found");
    }

    return await axios.get(`${BE_URL}/course/pending`);
  } catch (error) {
    // Handle error
    console.error("Error fetching courses:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const GetApproveCorses = async () => {
  try {
    const role = localStorage.getItem("role");

    if (!role) {
      throw new Error("Role not found");
    }

    return await axios.get(`${BE_URL}/course/approved`);
  } catch (error) {
    // Handle error
    console.error("Error fetching courses:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const ApproveCourse = async (id, course) => {
  try {
    const role = localStorage.getItem("role");

    if (!role) {
      throw new Error("Role not found");
    }

    return await axios.put(`${BE_URL}/course/${id}/${role}`, course);
  } catch (error) {
    // Handle error
    console.error("Error update courses:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const DeleteCourse = async (id) => {
  try {
    const role = localStorage.getItem("role");

    if (!role) {
      throw new Error("Role not found");
    }

    return await axios.delete(`${BE_URL}/course//${id}/${role}`);
  } catch (error) {
    // Handle error
    console.error("Error delete courses:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export default GetCourses;
