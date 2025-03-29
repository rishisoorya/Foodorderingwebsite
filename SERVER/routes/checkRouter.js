import express from "express";
import { userMiddleware } from "../middlewares/userMiddleware.js";
import { checkUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/user",userMiddleware ,checkUser );

export const checkRouter = router;