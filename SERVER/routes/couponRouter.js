import express from "express";
import { generateCoupon } from "../controllers/couponController.js";
import {userMiddleware,roleMiddleware} from "../middlewares/userMiddleware.js"


const router = express.Router();

router.post("/create",userMiddleware,roleMiddleware("admin"),generateCoupon)



export const couponRouterLink = router