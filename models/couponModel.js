import mongoose from "mongoose";

const { Schema } = mongoose;

const couponSchema = new Schema({
    couponCode: {
        type: String,
        required: true,
        unique: true
    },
    discountRate: {
        type: Number,
        required: true
    },
    minimumOrderAmount: {
        type: Number,
        required: true
    },
    maximumDiscount: {
        type: Number,
        required: true
    },
    validUntil: {
        type: Date,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export const Coupon = mongoose.model("Coupon", couponSchema);
