import { Router } from "express";
import { registerUser } from "../controllers/user_controller.js";

const router = Router()
router.route("/register").post(registerUser)
// router.route("/login").post(login)
export default router