import mongoose from "mongoose";

const { Schema } = mongoose;

const menuSchema = new Schema(
  {
    dishName: { type: String, required: true, maxlength: 50 }, 
    dishDescription: { type: String, required: true, maxlength: 200 }, 
    dishPrice: { type: Number, required: true, maxlength: 10 }, 
    dishImageUrl: { type: String }, 
    availabilityStatus: { type: Boolean, default: true }, 
    linkedRestaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true, 
    },
  },
  { timestamps: true } 
);

export const Menu = mongoose.model("Menu", menuSchema);
