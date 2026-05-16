import express from "express"
import * as usercontroller from "../controller/user.controller"
import { validateLogin, validateRegister } from "../middleware/Validate.middleware"
import { requireAuth } from "../middleware/Auth.middleware"
const router =express.Router()
router.post("/register",validateLogin,usercontroller.login)
router.post("/login",validateRegister,usercontroller.register)
router.post("/logout",requireAuth,usercontroller.logout)
router.get('/me', requireAuth, authController.getCurrentUser);
router.post('/refresh',authController.refreshToken);
export default Userroute;