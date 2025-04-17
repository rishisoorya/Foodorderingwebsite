import { Coupon } from "../models/couponModel.js";
import { User } from "../models/userModel.js";

export async function generateCoupon(req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const {
      code,
      discountPercentage,
      minOrderValue,
      maxDiscValue,
      expiryDate,
      isAvailable,
    } = req.body;
    console.log(code)
    console.log(discountPercentage)
    console.log(minOrderValue)
    console.log(maxDiscValue)
    console.log(expiryDate)
    if (
      !code ||
      !discountPercentage ||
      !minOrderValue ||
      !maxDiscValue ||
      !expiryDate
    ) {
      return res.status(401).json({ message: "All Feilds Are Required" });
    }
    const couponFound = await Coupon.findOne({ code: code });

    if (couponFound) {
      return res.status(400).json({ message: "Code is already in use" });
    }
    const newCoupon = new Coupon({
      code,
      discountPercentage,
      minOrderValue,
      MaxDiscValue:maxDiscValue,
      expiryDate,
      isAvailable,
    });
    await newCoupon.save();
    res
      .status(201)
      .json({ message: "New Coupon Generate Successfully", newCoupon });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }

  
}
export async function getCoupon(req, res) {
 try {
   const coupons = await Coupon.find();

   if (coupons.length === 0) {
     return res.status(404).json({ message: "No coupons found." });
   }

   return res.status(200).json({ message: "Fetched all coupons.", coupons });
 } catch (error) {
   console.error("Error fetching coupons:", error);
   res.status(500).json({ message: "Internal Server Error" });
 }
}
