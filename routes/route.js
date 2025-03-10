import express from 'express';
import { adminRouterLink } from './adminRouter.js';
import { sellerRouterLink } from './sellerRouter.js';
import { userRouterLink } from './userRouter.js';
import { addressRouterLink } from './addressRouter.js';
import { cartRouterLink } from './cartRouter.js';
import { couponRouterLink } from './couponRouter.js';
import { menuitemsRouterLink } from './menuitemsRouter.js';
import { restaurantRouterLink } from './restaurantRouter.js';
import { paymentRouterLink } from './paymentRouter.js'; 

const router = express.Router();

router.use("/user", userRouterLink);
router.use("/admin", adminRouterLink);
router.use("/seller", sellerRouterLink);
router.use("/address", addressRouterLink);
router.use("/cart", cartRouterLink);
router.use("/coupon", couponRouterLink);
router.use("/menuitems", menuitemsRouterLink);
router.use("/restaurant", restaurantRouterLink);
router.use("/payment", paymentRouterLink);

export const apiRouterLink = router;
