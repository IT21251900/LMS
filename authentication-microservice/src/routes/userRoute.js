import express from "express";
import {
  register,
  getAllUsers,
  getUpdateUser,
  deleteUser,
  login,
  getUserById,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/:id", getUserById);
router.put("/:id/:role", getUpdateUser);
router.delete("/:id/:role", deleteUser);
router.get("/", getAllUsers);

export default router;
