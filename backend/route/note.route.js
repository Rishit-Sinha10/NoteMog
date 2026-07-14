import express from "express";
import {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from "../controller/note.controller.js";
import { requireAuth } from "@clerk/express";
const router = express.Router();
// Protected routes - require authentication
router.post("/", requireAuth(), createNote); // Create note
router.get("/", requireAuth(), getNotes); // Get all notes
router.get("/:id", requireAuth(), getNoteById); // Get single note
router.put("/:id", requireAuth(), updateNote); // Update note
router.delete("/:id", requireAuth(), deleteNote); // Delete note
export default router;
