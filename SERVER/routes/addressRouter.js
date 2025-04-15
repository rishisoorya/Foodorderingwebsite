import express from "express"
import { createAddress,deleteAddress,getAddress,updateAddress} from "../controllers/addressController.js";
import { userMiddleware } from "../middlewares/userMiddleware.js";
const router = express.Router();

router.post("/create",userMiddleware,createAddress)
router.delete("/delete/:addressId",userMiddleware,deleteAddress)
router.get("/get/getAllAddress",userMiddleware,getAddress)
router.put("/put/updateAddress",userMiddleware,updateAddress)

export const addressRouterLink = router;