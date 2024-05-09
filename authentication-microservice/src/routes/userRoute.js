import express from "express";
import {
  register,
  getAllUsers,
  getUpdateUser,
  deleteUser,
  login,
  getUserById,
} from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/:id", getUserById);
router.put("/:id", getUpdateUser);
router.delete("/:id", deleteUser);
router.get("/", getAllUsers);

export default router;
