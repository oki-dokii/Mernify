import express from "express";
import { getNote, updateNote } from "../controllers/notesController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/:boardId/notes", authMiddleware, getNote);
router.put("/:boardId/notes", authMiddleware, updateNote);

export default router;
