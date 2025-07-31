import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { getCurrentUser } from "../controller/authController";

const router = express.Router();

router.get("/", authMiddleware, getCurrentUser);

export default router;
