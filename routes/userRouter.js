import express from "express";
import {signUp} from "../controllers/userController.js"
import { userMiddleware } from "../middlewares/userMiddleware.js";

const router = express.Router();
router.post("/signup",signUp);
router.post("/login",);
router.get("/profile",userMiddleware);
router.get("/role",userMiddleware);
router.put("/update",userMiddleware);

export const userRouterLink = router;