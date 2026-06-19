import { Router } from "express";
import UserController from "../controllers/user.controller.js"
import { upload } from "../middlewares/multer.middleware.js"
import verifyJwt from "../middlewares/auth.middleware.js";

const router = Router()

router.post("/register", upload.fields([{ name: "avatar" , maxCount: 1}, { name: "coverImage", maxCount: 1}]), UserController.registerUser)
router.post("/login", UserController.loginUser)

// secure routes
router.route("/logout").post(verifyJwt,  UserController.logOutUser)
router.route("/refresh-token").post(UserController.refreshAccessToken)


export default router 