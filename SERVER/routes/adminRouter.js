import express from 'express';
import {
    
    getProfile,
    profileUpdate,
    signUp,
    getRole,
    login,logout
} from "../controllers/userController.js";
import { roleMiddleware, userMiddleware } from "../middlewares/userMiddleware.js";
import { verifyRestaurant } from '../controllers/restaurantController.js';

const router = express.Router();

router.post("/signup", signUp);
router.post("/login",login);
router.post("/logout",logout);
router.get("/profile", userMiddleware, getProfile);
router.put("/update",userMiddleware,roleMiddleware("admin"), profileUpdate);
router.get("/role",getRole);
router.put("/verify/:restaurantId",userMiddleware,roleMiddleware("admin"),verifyRestaurant)

export const adminRouterLink = router;
