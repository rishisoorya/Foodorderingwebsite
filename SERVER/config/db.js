import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongooseUrl = process.env.MONGO_URL;

export const connectDB = async () => {
  try {
    await mongoose.connect(mongooseUrl);
    console.log("Successfully connected to the database");
  } catch (error) {
    console.error("DB connection error:", error);
   
  }
};
