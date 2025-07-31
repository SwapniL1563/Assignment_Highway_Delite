import express from "express"
import { getCurrentUser, sendSigninOtp, sendSignupOtp, verifyOtp } from "../controller/authController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/signup-otp",sendSignupOtp);
router.post("/signin-otp",sendSigninOtp);
router.post("/verify-otp",verifyOtp);

router.get("/me",authMiddleware,getCurrentUser);

export default router;