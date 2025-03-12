
import { Coupon } from "../models/couponModel.js"
import { User } from "../models/userModel.js"
import { Coupon } from "../models/couponModel.js";
import { User } from "../models/userModel.js";

// Create a new coupon
export async function createCoupon(req, res) {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        const { code, discountPercentage, minOrderVal, maxDiscValue, expiryDate, isAvailable = true } = req.body;

        if (!code || !discountPercentage || !minOrderVal || !maxDiscValue || !expiryDate) {
            return res.status(400).json({ message: "All Fields Are Required" });
        }

        const couponExist = await Coupon.findOne({ code });
        if (couponExist) {
            return res.status(400).json({ message: "Coupon Code Already Exists" });
        }

        const newCoupon = new Coupon({
            code,
            discountPercentage,
            minOrderVal,
            maxDiscValue,
            expiryDate,
            isAvailable,
        });

        await newCoupon.save();
        return res.status(201).json({ message: "New Coupon Added Successfully", newCoupon });
    } catch (error) {
        console.error("Create Coupon Error:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

// Get all coupons
export async function getCoupons(req, res) {
    try {
        const coupons = await Coupon.find();
        return res.status(200).json(coupons);
    } catch (error) {
        console.error("Get Coupons Error:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

// Delete a coupon
export async function deleteCoupon(req, res) {
    try {
        const { id } = req.params;
        const deletedCoupon = await Coupon.findByIdAndDelete(id);

        if (!deletedCoupon) {
            return res.status(404).json({ message: "Coupon Not Found" });
        }

        return res.status(200).json({ message: "Coupon Deleted Successfully" });
    } catch (error) {
        console.error("Delete Coupon Error:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

// Update a coupon
export async function updateCoupon(req, res) {
    try {
        const { id } = req.params;
        const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedCoupon) {
            return res.status(404).json({ message: "Coupon Not Found" });
        }

        return res.status(200).json({ message: "Coupon Updated Successfully", updatedCoupon });
    } catch (error) {
        console.error("Update Coupon Error:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}


export async function createCoupon(req,res) {
    try {
        const user = await User.findById(req.user.id)
        if(!user){
            return res.status(404).json({message:"User Not Found"})
        }
        const {code,discountPercentage,minOrderVal,MaxDiscValue,expiryDate,isAvailable} = req.body
        if(!code || !discountPercentage || !minOrderVal || !MaxDiscValue ||!expiryDate){
            return res.status(401).json({message: "All Feilds Are Required"})
        }
        const couponExist = await Coupon.findOne({code:code})
        if(couponExist){
return res.status(400).json({message:"Code Already Exist"})
        }
        const newCoupon = new Coupon(
            {
                code,discountPercentage,minOrderVal,MaxDiscValue,expiryDate,isAvailable  
            }
        )
        await newCoupon.save()
    res.status(201).json({ message: "New Coupon is Added Successfully", newCoupon });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
    
}
