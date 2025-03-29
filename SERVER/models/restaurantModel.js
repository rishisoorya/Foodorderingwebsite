import mongoose from "mongoose";

const { Schema } = mongoose;
const menuItemSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String },
  category: { type: String },
});

const restaurantSchema = new Schema(
  {
    name: { type: String, required: true, maxlength: 50 },
    email: { type: String, required: true, unique: true },
    phone: {
      type: String,
      required: true,
      match: [/^\+91\d{10}$/, "Invalid Indian phone number"], // Validation for +91XXXXXXXXXX format
    },
    image: { type: String },
    openStatus: { type: Boolean, default: true },
    customerRating: { type: Number, min: 1, max: 5 },
    menu: [menuItemSchema],
    createdAt: { type: Date, default: Date.now },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Restaurant = mongoose.model("Restaurant", restaurantSchema);
