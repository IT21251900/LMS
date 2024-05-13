import axios from "axios";
import { BE_URL } from "../../../util/APIUrl";

const GetClientToken = async () => {
  try {
    return await axios.get(`${BE_URL}/payment/payment/client_token`);
  } catch (error) {
    // Handle error
    console.error("Error fetching client token:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const ProcessPayment = async (payment) => {
  try {
    return await axios.post(`${BE_URL}/payment/payment/checkout`, payment);
  } catch (error) {
    // Handle error
    console.error("Error process payment:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const GetAllPayments = async () => {
  try {
    const role = localStorage.getItem("role");

    if (!role) {
      throw new Error("Role not found");
    }

    return await axios.get(`${BE_URL}/payment/payment/role/${role}}`);
  } catch (error) {
    // Handle error
    console.error("Error fetching payments:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};
export const GetCStudentByID = async (id) => {
  try {
    return await axios.get(`${BE_URL}/learner/auth/${id}`);
  } catch (error) {
    // Handle error
    console.error("Error fetching courses:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const GetCourseByID = async (id) => {
  try {
    return await axios.get(`${BE_URL}/course/${id}`);
  } catch (error) {
    // Handle error
    console.error("Error fetching courses:", error);
    throw error; // Rethrow the error to handle it in the component learner
  }
};

export const GetPaymentById = async (id) => {
  try {
    return await axios.get(`${BE_URL}/payment/payment/${id}}`);
  } catch (error) {
    // Handle error
    console.error("Error fetching payment:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export default GetClientToken;
