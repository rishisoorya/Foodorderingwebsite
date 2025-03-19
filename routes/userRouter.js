import express from "express";
import { getProfile, getRole, login,logout,profileUpdate,signUp} from "../controllers/userController.js"
import { userMiddleware } from "../middlewares/userMiddleware.js";

const router = express.Router();
router.post("/signup",signUp);
router.post("/login",login);
router.get("/profile",userMiddleware,getProfile);
router.get("/role",userMiddleware,getRole);
router.put("/update",userMiddleware,profileUpdate);
router.post("/logout",userMiddleware,logout);

export const userRouterLink = router;
