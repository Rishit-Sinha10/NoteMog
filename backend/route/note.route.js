import express from "express"
import { requireAuth } from "../middleware/Auth.middleware";
import { Note } from "../controller/note.controller"
const router =express.Router()
router.post("/Note",requireAuth,Note)
export default Noteroute;