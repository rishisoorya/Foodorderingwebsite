import mongoose from "mongoose";

const { Schema } = mongoose;

const restaurantSchema = new Schema(
  {
    nameOfRestaurant: { type: String, required: true, maxlength: 50 }, 
    contactEmail: { type: String, required: true, unique: true },
    contactNumber: { 
      type: String, 
      required: true, 
      match: [/^\d{10}$/, "Invalid phone number. It must be exactly 10 digits."] 
    },
    restaurantImageUrl: { type: String }, 
    openStatus: { type: Boolean, default: true }, 
    customerRating: { type: Number, min: 1, max: 5 },
    associatedSeller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Restaurant = mongoose.model("Restaurant", restaurantSchema);
