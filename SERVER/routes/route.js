import express from 'express';

import { adminRouterLink } from './adminRouter.js';
import { orderRouter } from './orderRouter.js';
import { userRouterLink } from './userRouter.js';
import { addressRouterLink } from './addressRouter.js';
import { cartRouterLink } from './cartRouter.js';
import { couponRouterLink } from './couponRouter.js';
import { menuitemsRouterLink } from './menuitemsRouter.js';
import { restaurantRouterLink } from './restaurantRouter.js';
import { paymentRouterLink } from './paymentRouter.js'; 
import { checkRouter } from './checkRouter.js';


const router = express.Router();

router.use("/user", userRouterLink);
router.use("/admin", adminRouterLink);
router.use("/order", orderRouter);
router.use("/address", addressRouterLink);
router.use("/cart", cartRouterLink);
router.use("/coupon", couponRouterLink);
router.use("/menuitems", menuitemsRouterLink);
router.use("/restaurant", restaurantRouterLink);
router.use("/payment", paymentRouterLink);
router.use("/check", checkRouter);

export const apiRouterLink = router;
