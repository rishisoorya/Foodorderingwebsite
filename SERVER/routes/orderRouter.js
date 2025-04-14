import express from "express";
import {
  createOrder,
  getAllOrders,
  getAllRestaurantOrders,
  getOrderById,
  updateOrderStatus,
  updateOrderUser,
} from "../controllers/orderController.js";
import { userMiddleware } from "../middlewares/userMiddleware.js";
const router = express.Router();

router.post("/update", userMiddleware, createOrder);
router.get("/get/all", userMiddleware, getAllOrders);
router.get("/by/:orderId", userMiddleware, getOrderById);
router.put("/update/:orderId", userMiddleware, updateOrderUser);
router.put("/update/status/:orderId", userMiddleware, updateOrderStatus);
router.get("/restaurant-order", userMiddleware, getAllRestaurantOrders);
export const orderRouter = router;
