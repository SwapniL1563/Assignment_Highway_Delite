import express from "express";
import { createNote, deleteNote, getNotes } from "../controller/noteController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create",authMiddleware,createNote);
router.get("/",authMiddleware,getNotes);
router.delete("/:id",authMiddleware,deleteNote);

export default router;