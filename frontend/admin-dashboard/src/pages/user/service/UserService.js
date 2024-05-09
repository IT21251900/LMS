import axios from "axios"; // Import axios directly
import API from "../../../utils/APIUrl";

const GetUsers = async () => await axios.get(`${API}/user/`);
