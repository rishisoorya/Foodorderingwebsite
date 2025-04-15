import express from "express";
import { getProfile, getRole, login,logout,profileUpdate,signUp,getAlluser,removeUser} from "../controllers/userController.js"
import { roleMiddleware, userMiddleware } from "../middlewares/userMiddleware.js";

const router = express.Router();
router.post("/signup",signUp);
router.post("/login",login);
router.get("/profile",userMiddleware,getProfile);
router.get("/role",userMiddleware,getRole);
router.put("/update",userMiddleware,profileUpdate);
router.post("/logout",userMiddleware,logout);
router.get("/users",userMiddleware,roleMiddleware("admin"),getAlluser)
router.delete("/delete/:userId",userMiddleware,roleMiddleware("admin"),removeUser)

export const userRouterLink = router;
