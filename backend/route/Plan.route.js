import express from "express";
import {
  createPlan,
  getPlans,
  getPlanById,
  updatePlan,
  deletePlan,
} from "../controller/Plan.controller.js";
import { requireAuth } from "@clerk/express";

const router = express.Router();

// Protected routes - require authentication
router.post("/", requireAuth(), createPlan); // Create plan
router.get("/", requireAuth(), getPlans); // Get all plans
router.get("/:id", requireAuth(), getPlanById); // Get single plan
router.put("/:id", requireAuth(), updatePlan); // Update plan
router.delete("/:id", requireAuth(), deletePlan); // Delete plan

export default router;
