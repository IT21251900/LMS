import express from "express";
import {
  register,
  getAllUsers,
  updateUser,
  deleteUser,
  login,
  getUserById,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/:id/:role", updateUser);
router.delete("/:id/:role", deleteUser);
router.get("/role/:role", getAllUsers);
router.get("/:id", getUserById);

export default router;
