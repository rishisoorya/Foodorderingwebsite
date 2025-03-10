import mongoose from "mongoose";

const { Schema } = mongoose;

const cartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },
    items: [
        {
            menuItem: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Menu",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
                default: 1,
            },
            itemTotal: {
                type: Number,
                required: true,
                min: 0,
            }
        }
    ],
    cartTotal: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    cartFinalTotal: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    status: {
        type: String,
        enum: ["pending", "completed", "cancelled"],
        default: "pending",
    }
}, { timestamps: true });

cartSchema.method.calulateTotalPrice = function(){
    this.totalPrice = this.items.reduce((total,items)=> total + items.price,0);
  }

export const Cart = mongoose.model("Cart", cartSchema);
