import axios from "axios";
import API from "../../../utils/APIUrl";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    config.headers.Cookie = `jwt=${token}`; // Add the cookie to headers
    return config;
  },
  (error) => Promise.reject(error)
);

const getUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    console.log(token, role);
    if (!token) {
      throw new Error("Token not found");
    }

    // Set the token in a cookie named 'jwt'
    document.cookie = `jwt=${token}; path=/;`;

    return await axios.get(`${API}/user/user/`, { data: role });
  } catch (error) {
    // Handle error
    console.error("Error fetching users:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const UserLogin = async (authData) => {
  try {
    const res = await axios.post(`${API}/auth/user/login`, authData);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);
    return true;
  } catch (error) {}
};

export default getUsers;
