import express from 'express'
import { addToCart, addQuantity,getCart,deleteCartItem} from '../controllers/cartController.js';
import {userMiddleware}  from "../middlewares/userMiddleware.js"
const router = express.Router();

router.post("/item",userMiddleware,addToCart)
router.delete("/remove/:foodId",userMiddleware,deleteCartItem)
router.put("/update",userMiddleware,addQuantity)
router.get("/all",userMiddleware,getCart)

export const cartRouterLink = router