import express from "express";
import {
  createSubject,
  getSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
} from "../controller/subject.controller.js";
import { requireAuth } from "@clerk/express";
const router = express.Router();
// Protected routes - require authentication
router.post("/", requireAuth(), createSubject); // Create subject
router.get("/", requireAuth(), getSubjects); // Get all subjects
router.get("/:id", requireAuth(), getSubjectById); // Get single subject
router.put("/:id", requireAuth(), updateSubject); // Update subject
router.delete("/:id", requireAuth(), deleteSubject); // Delete subject
export default router;
