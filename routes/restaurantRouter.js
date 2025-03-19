import express from "express";
import { createRestaurant,restaurantLogin,modifyRestaurant,findRestaurantByName,getAllRestaurant,getRestaurantById,logout,removeRestaurant, } from "../controllers/restaurantController.js";
import { upload } from "../middlewares/multermiddileware.js";
import {userMiddleware}from "../middlewares/userMiddleware.js";
const router = express.Router();

router.post("/register",upload.single("image"), createRestaurant);
router.post("/login", restaurantLogin);
router.put(
  "/update",userMiddleware,
  upload.single("image"),
  modifyRestaurant
);

router.get("/by/:name", findRestaurantByName);
router.get("/all", getAllRestaurant);
router.get("/id/:restaurantId", getRestaurantById);
router.delete("/delete/:restaurantId", removeRestaurant);
router.post("/logout",logout)
export const restaurantRouterLink = router