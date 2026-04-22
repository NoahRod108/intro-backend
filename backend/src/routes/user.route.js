import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  verifyToken,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/verify").get(verifyToken);

export default router;
