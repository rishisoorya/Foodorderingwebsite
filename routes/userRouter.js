import express from "express";
import {getingRole, logIn,logout,profile,profileChange,signUp} from "../controllers/userController.js"
import { userMiddleware } from "../middlewares/userMiddleware.js";

const router = express.Router();
router.post("/signup",signUp);
router.post("/login",logIn);
router.get("/profile",userMiddleware,profile);
router.get("/role",userMiddleware,getingRole);
router.put("/update",userMiddleware,profileChange);
router.post("/logout",userMiddleware,logout);

export const userRouterLink = router;
