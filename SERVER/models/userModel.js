import mongoose from "mongoose";

const { Schema } = mongoose;
const userSchema = new Schema({
  name: { type: String, required: true, maxlength: 50 },
  email: { type: String, required: true, unique: true },
  phone: {
    type: String,
    required: true,
    match: [/^\+91\d{10}$/, "Invalid Indian phone number"], // Validation for +91XXXXXXXXXX format
  },
  password: { type: String, required: true, minlength: 8 },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  profilePic: {
    type: String,
    default:
      "https://res.cloudinary.com/dzmymp0yf/image/upload/v1740756875/Food%20Order%20Website/noeuwugmxrhszkjcq2no.png",
  },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", userSchema);
