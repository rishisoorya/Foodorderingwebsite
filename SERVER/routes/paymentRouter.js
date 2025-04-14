import express from "express";
import {
  userMiddleware,
  roleMiddleware,
} from "../middlewares/userMiddleware.js";
import {
  createPayment,
  verifyPayment,
  getPayments,
} from "../controllers/paymentController.js";

const router = express.Router();
router.post("/create/:orderId", userMiddleware, createPayment);
router.post("/verify", userMiddleware, verifyPayment);
router.get(
  "/transaction",
  userMiddleware,
  roleMiddleware("admin"),
  getPayments
);
router.get("/all/transaction", userMiddleware, getPayments);
export const paymentRouterLink = router;
