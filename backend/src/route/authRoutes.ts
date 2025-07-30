import express from "express"
import { getCurrentUser, sendOtp, verifyOtp } from "../controller/authController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/send-otp",sendOtp);
router.post("/verify-otp",verifyOtp);

router.get("/me",authMiddleware,getCurrentUser);

export default router;