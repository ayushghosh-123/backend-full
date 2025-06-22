import { Router } from "express";
import UserController from "../controllers/user.controller.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = Router()

router.post("/register", upload.fields([{ name: "avatar" , maxCount: 1}, { name: "coverImage", maxCount: 1}]), UserController.registerUser)
// router.route("/login").post(loginUser)


export default router 