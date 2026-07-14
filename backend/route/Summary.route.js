import express from "express";
import {
  createSummary,
  getSummaries,
  getSummaryById,
  updateSummary,
  deleteSummary,
} from "../controller/Summary.controller.js";
import { requireAuth } from "@clerk/express";

const router = express.Router();

// Protected routes - require authentication
router.post("/", requireAuth(), createSummary); // Create summary
router.get("/", requireAuth(), getSummaries); // Get all summaries
router.get("/:id", requireAuth(), getSummaryById); // Get single summary
router.put("/:id", requireAuth(), updateSummary); // Update summary
router.delete("/:id", requireAuth(), deleteSummary); // Delete summary

export default router;
