import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    cartReference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    subtotal: { type: Number, min: 0, default: 0 }, 
    appliedCoupon: { type: mongoose.Schema.Types.ObjectId, ref: "Coupon" }, 
    totalPayable: { type: Number, min: 0, default: 0 }, 
    orderStatus: {
      type: String,
      enum: Object.values(ORDER_STATUS),
      default: ORDER_STATUS.PENDING,
    },
    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
