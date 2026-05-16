import express from "express"
import { requireAuth } from "../middleware/Auth.middleware";
import { Subject } from "../controller/subject.controller";
const router =express.Router()
router.post("/Subject",requireAuth,Subject)
export default Subjectroute;