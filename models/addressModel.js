import mongoose from "mongoose";

const { Schema } = mongoose;

const addressSchema = new Schema(
  {
    recipientName: { type: String, required: true, maxlength: 50 }, 
    buildingName: { type: String, required: true, maxlength: 50 }, 
    streetAddress: { type: String, required: true, maxlength: 50 }, 
    nearbyLandmark: { type: String, required: true, maxlength: 50 }, 
    cityName: { type: String, required: true, maxlength: 50 }, 
    stateName: { type: String, required: true, maxlength: 50 }, 
    postalCode: {
      type: String,
      required: true,
      match: [/^\d{6}$/, "Invalid postal code format. It must be exactly 6 digits."], 
    },
    contactNumber: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Invalid contact number. It must be exactly 10 digits."], 
    },
    userReference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
     
    },
  },
  { timestamps: true } 
);

export const Address = mongoose.model("Address", addressSchema);
