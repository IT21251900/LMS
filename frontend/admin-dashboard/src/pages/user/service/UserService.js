import axios from "axios";
import BE_URL_WITH_API from "../../../utils/APIUrl";

const GetUsers = async () => {
  try {
    const role = localStorage.getItem("role");

    if (!role) {
      throw new Error("Role not found");
    }

    return await axios.get(`${BE_URL_WITH_API}/auth/user/role/${role}`);
  } catch (error) {
    // Handle error
    console.error("Error fetching users:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const UserLogin = async (authData) => {
  try {
    const res = await axios.post(
      `${BE_URL_WITH_API}/auth/user/login`,
      authData
    );
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);
    localStorage.setItem("userId", res.data.userId);
    return true;
  } catch (error) {}
};

export const CreateUser = async (user) => {
  try {
    return await axios.post(`${BE_URL_WITH_API}/auth/user/register`, user);
  } catch (error) {
    // Handle error
    console.error("Error create users:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const UpdateUser = async (id, user) => {
  try {
    const role = localStorage.getItem("role");

    if (!role) {
      throw new Error("Role not found");
    }

    return await axios.put(`${BE_URL_WITH_API}/auth/user/${id}/${role}`, user);
  } catch (error) {
    // Handle error
    console.error("Error update users:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const DeleteUser = async (id) => {
  try {
    const role = localStorage.getItem("role");

    if (!role) {
      throw new Error("Role not found");
    }

    return await axios.delete(`${BE_URL_WITH_API}/auth/user/${id}/${role}`);
  } catch (error) {
    // Handle error
    console.error("Error delete users:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const LogOutUser = async () => {
  try {
    localStorage.clear();
    return true;
    // return await axios.delete(`${BE_URL_WITH_API}/auth/user/${id}/${role}`);
  } catch (error) {
    // Handle error
    console.error("Error delete users:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export default GetUsers;
