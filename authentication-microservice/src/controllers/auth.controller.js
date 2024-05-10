import jwt from "jsonwebtoken";
import User from "../schemas/user.schema.js";

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

export const login = async (req, res) => {
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
    const token = generateToken(res, user._id, user.role);
    res.send({ token, role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password, NIC, role, timeTable, course } = req.body;
    const user = new User({
      name,
      email,
      password,
      NIC,
      role,
      timeTable,
      course,
    });
    await user.save();
    res.status(201).json({ message: "User created", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, success: false });
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    res.status(201).json({ message: "Get User", data: user, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, success: false });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const role = req.params.role;
    if (role === "admin" && role === "instructor") {
      const users = await User.find();

      res
        .status(201)
        .json({ message: "Get All User", data: users, success: true });
    } else {
      res.status(401).json({ message: "Unauthorized user", success: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, success: false });
  }
};

export const getUpdateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const role = req.params.role;
    let user = {};
    if (role === "admin" && role === "instructor") {
      user = await User.findByIdAndUpdate(id, req.body, { new: true });
    } else {
      res.status(401).json({ message: "Unauthorized user", success: false });
    }

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not updated" });
    }
    res
      .status(201)
      .json({ message: "User Updated", data: user, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, success: false });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const role = req.params.role;
    let user = {};
    if (role === "admin" && role === "instructor") {
      user = await User.findByIdAndDelete(id);
    } else {
      res.status(401).json({ message: "Unauthorized user", success: false });
    }

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
