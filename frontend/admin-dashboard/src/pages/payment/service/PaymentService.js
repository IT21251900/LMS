import axios from "axios";
import { BE_URL } from "../../../utils/APIUrl";

const GetAllPayments = async () => {
  try {
    const role = localStorage.getItem("role");

    if (!role) {
      throw new Error("Role not found");
    }

    return await axios.get(`${BE_URL}/payment/payment/role/${role}`);
  } catch (error) {
    // Handle error
    console.error("Error fetching users:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const GetPaymentsByCourseId = async (id) => {
  try {
    const role = localStorage.getItem("role");

    if (!role) {
      throw new Error("Role not found");
    }

    return await axios.get(`${BE_URL}/payment/payment/course/${id}/${role}`);
  } catch (error) {
    // Handle error
    console.error("Error fetching users:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const GetPayment = async (id) => {
  try {
    return await axios.get(`${BE_URL}/payment/payment/${id}`);
  } catch (error) {
    // Handle error
    console.error("Error fetching users:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export default GetAllPayments;
