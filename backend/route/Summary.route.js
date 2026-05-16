import express from "express"
import { requireAuth } from "../middleware/Auth.middleware";
import { Summary } from "../controller/Summary.controller";
const router =express.Router()
router.post("/Summary",requireAuth,Summary)
export default Summaryroute;