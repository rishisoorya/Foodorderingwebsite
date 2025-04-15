import express from "express";
import {
  roleMiddleware,
  userMiddleware,
} from "../middlewares/userMiddleware.js";
import { checkUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/user", userMiddleware, checkUser);
router.get("/admin", userMiddleware, roleMiddleware("admin"), checkUser);
router.get("/restaurant", userMiddleware, checkUser);

export const checkRouter = router;
