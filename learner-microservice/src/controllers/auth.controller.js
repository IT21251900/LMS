import jwt from "jsonwebtoken";
import User from "../schemas/user.schema.js";
import { timetable } from "../utils/timetable.js";

const generateToken = (res, userId, role) => {
  const jwtSecret = process.env.JWT_SECRET;
  const token = jwt.sign({ userId, role }, jwtSecret, {
    expiresIn: "24h",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  });

  return token;
};

const clearToken = (res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
};

async function login(req, res) {
  console.log("Learner Logging in");
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const isMatch = await user.checkPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const token = generateToken(res, user._id);
    res.send({ token, id:user._id, firstname:user.firstname, lastname:user.lastname, userImage:user.userImage});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

async function register(req, res) {
  console.log("Registering Learner");
  try {
    const { firstname, lastname, email, phone, password, userImage } = req.body;
    const user = new User({
      firstname,
      lastname,
      email,
      phone,
      password,
      userImage,
      TimeTableSessions: timetable
    });

    await user.save();

    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}




export { login, register };
