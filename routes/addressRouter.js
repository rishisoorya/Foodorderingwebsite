import express from "express"
import { generateAddress,removeAddress } from "../controllers/addressController.js";
import { userMiddleware } from "../middlewares/userMiddleware.js";
const router = express.Router();

router.post("/create",userMiddleware,generateAddress)
router.delete("/delete/:addressId",userMiddleware,removeAddress)

export const addressRouterLink = router;