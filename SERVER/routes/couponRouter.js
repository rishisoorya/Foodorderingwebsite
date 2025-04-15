import express from "express";
import { generateCoupon,getCoupon } from "../controllers/couponController.js";
import {userMiddleware,roleMiddleware} from "../middlewares/userMiddleware.js"



const router = express.Router();

router.post("/create",userMiddleware,roleMiddleware("admin"),generateCoupon)
router.get("/get",getCoupon)


export const couponRouterLink = router