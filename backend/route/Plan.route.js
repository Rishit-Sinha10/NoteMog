import express from "express"
import { Plan } from "../controller/Plan.controller"
import { requireAuth } from "../middleware/Auth.middleware";
const router =express.Router()
router.post("/Plan",requireAuth,Plan)
export default Planroute;