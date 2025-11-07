import express from "express";
import {
  register,
  login,
  me,
  logout,
  refresh,
} from "../controllers/authController";
import { firebaseLogin } from "../controllers/firebaseAuthController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/firebase-login", firebaseLogin);
router.get("/me", authMiddleware, me);
router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;
