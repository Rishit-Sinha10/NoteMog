import express from "express";
import {
  login,
  register,
  getUserProfile,
  logout,
  updateProfile
} from "../controller/user.controller.js";
import { requireAuth } from "../middleware/Auth.middleware.js";
import {
  validateLogin,
  validateRegister,
} from "../middleware/Validate.middleware.js";
const router = express.Router();
// Public routes (no authentication required)
router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
// Protected routes (authentication required)
router.get("/profile", requireAuth(), getUserProfile);
router.put("/profile", requireAuth(), updateProfile);
router.post("/logout", requireAuth(), logout);
export default router;
