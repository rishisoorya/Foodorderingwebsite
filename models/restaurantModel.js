import mongoose from "mongoose";

const { Schema } = mongoose;
const menuItemSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String },
  category: { type: String }, 
});

export const MenuItem = mongoose.model("MenuItem", menuItemSchema);

const restaurantSchema = new Schema(
  {
    name: { type: String, required: true, maxlength: 50 }, 
    email: { type: String, required: true, unique: true },
    phone: { 
      type: String, 
      required: true, 
      match: [/^\d{10}$/, "Invalid phone number. It must be exactly 10 digits."] 
    },
    image: { type: String }, 
    openStatus: { type: Boolean, default: true }, 
    customerRating: { type: Number, min: 1, max: 5 },
    menu: [menuItemSchema], 
    createdAt: { type: Date, default: Date.now },
    password: { type: String, required: true },
    isVerified:{type:Boolean,default:true}
    
  },
  { timestamps: true }
);

export const Restaurant = mongoose.model("Restaurant", restaurantSchema);
