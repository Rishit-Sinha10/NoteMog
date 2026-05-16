import express from "express"
import { Task } from "../controller/Task.controller";
import { requireAuth } from "../middleware/Auth.middleware";
const router =express.Router()
router.post("/Task",requireAuth,Task)
export default Taskroute;