import express from 'express';
import {
    
    getProfile,
    profileUpdate,
    signUp,
    getRole,
    login,
} from "../controllers/userController.js";
import { userMiddleware } from "../middlewares/userMiddleware.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/profile", userMiddleware, getProfile);
router.put("/update", profileUpdate);
router.get("/role", getRole);

export const adminRouterLink = router;
