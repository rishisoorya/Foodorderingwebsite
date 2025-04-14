import express from "express";
import {
  addItemToMenu,
  updateMenu,
  getMenuByName,
  getAllMenu,
  getMenuItemById,
  deleteMenuItem,
} from "../controllers/menuController.js";
import { upload } from "../middlewares/multermiddileware.js";
import { userMiddleware } from "../middlewares/userMiddleware.js";

const router = express.Router();

router.post("/create", userMiddleware, upload.single("image"), addItemToMenu);
router.put(
  "/update/:menuItemId",
  userMiddleware,
  upload.single("image"),
  updateMenu
);
router.get("/by/:name", getMenuByName);
router.get("/all", getAllMenu);
router.get("/:restaurantId/item/:menuItemId", getMenuItemById);
router.delete("/delete/:menuItemId", userMiddleware, deleteMenuItem);

export const menuitemsRouterLink = router;
