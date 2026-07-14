import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controller/Task.controller.js";
import { requireAuth } from "@clerk/express";
const router = express.Router();

// Protected routes - require authentication
// Standard REST endpoints
router.post("/", requireAuth(), createTask); // Create task
router.get("/", requireAuth(), getTasks); // Get all tasks
router.get("/:id", requireAuth(), getTaskById); // Get single task
router.put("/:id", requireAuth(), updateTask); // Update task
router.delete("/:id", requireAuth(), deleteTask); // Delete task

// Legacy endpoints for backward compatibility (if needed)
router.post("/c", requireAuth(), createTask); // Create task (legacy)
router.get("/g", requireAuth(), getTasks); // Get all tasks (legacy)
router.get("/g/:id", requireAuth(), getTaskById); // Get single task (legacy)
router.put("/u/:id", requireAuth(), updateTask); // Update task (legacy)
router.delete("/d/:id", requireAuth(), deleteTask); // Delete task (legacy)

export default router;
