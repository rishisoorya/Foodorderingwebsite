import { cloudinaryInstance } from "../config/cloudinary.js";
import {Restaurant}from "../models/restaurantModel.js"
import bcrypt from "bcryptjs";
import { createToken } from "../utils/token.js";

export const createRestaurant = async (req, res) => {
  try {
    const { name, email, phone, password, image,isVerified } = req.body;
    const existingRestaurant = await Restaurant.findOne({ email });
    if (existingRestaurant) {
      return res.status(400).json({ message: "This email is already linked to an account" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "Image file missing" });
    }
    const imageUri = await cloudinaryInstance.uploader.upload(req.file.path);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newRestaurant = new Restaurant({
      name,
      email,
      phone,
      password: hashedPassword,
      image:imageUri.url,
      isVerified
    });

    await newRestaurant.save();
    const token = createToken(newRestaurant);
    res.cookie("token", token);
    res.status(201).json({ message: "Restaurant registered successfully",newRestaurant });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error", error });
  }
};

export const restaurantLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const restaurant = await Restaurant.findOne({ email });
    if (!restaurant) {
      return res.status(404).json({ message: "No restaurant found" });
    }
    if (!restaurant.isVerified) {
      return res.status(403).json({ message: "Restaurant is under review. Please wait for admin approval." });
    }
    const isMatch = await bcrypt.compare(password, restaurant.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = createToken(restaurant);
    res.cookie("token", token, {
      httpOnly: true, // Prevents access via JavaScript (XSS protection)
      secure: true, // Works only on HTTPS (important in production)
      sameSite: "None", // Allows cross-origin requests
      path: "/", // Available for all routes
    });
    res.status(200).json({ message: "Login successful"});
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export async function modifyRestaurant(req, res) {
  try {
    const restaurantId  = req.user.id;
    console.log(restaurantId)
    const { name, email, phone,rating } = req.body;

    const restaurant = await Restaurant.findById(restaurantId).select("-password");
    if (name) restaurant.name = name;
    if (email) restaurant.email = email;
    if (phone) restaurant.phone = phone;
    if (rating) restaurant.rating = rating;
    if (req.file) {
      const imageUri = await cloudinaryInstance.uploader.upload(req.file.path);
      restaurant.image = imageUri.url;
    }
    const modifyRestaurant = await restaurant.save();
    return res
      .status(200)
      .json({ message: "Restaurant information has been updated", modifyRestaurant });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function findRestaurantByName(req, res) {
  try {
    const { name } = req.params;

    const restaurant = await Restaurant.findOne({
      name: { $regex: new RegExp(`^${name.trim()}$`, 'i') }
    }).select("-password");

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant does not exist" });
    }

    res.status(200).json({ message: "Restaurant found successfully", restaurant });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


export async function getAllRestaurant(req,res) {
  try {
    const restaurant = await Restaurant.find()
    res.status(200).json({message:"All Restaurant Are Fetched", restaurant})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getRestaurantById(req,res) {
  try {
    const {restaurantId} = req.params
    const findRestaurant = await Restaurant.findById(restaurantId)
    if(!findRestaurant){
return res.status(404).json({message:"No Restaurant found"})
    }
    res.status(200).json({message: "Restaurant Fetched Successfully",findRestaurant})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });  
  }
}

export async function removeRestaurant(req,res) {
  try {
    const {restaurantId} = req.params
const findRestaurant = await Restaurant.findById(restaurantId)
    if(!findRestaurant){
return res.status(404).json({message:"No Restaurant found"})
    }
const restaurantDel = await Restaurant.findByIdAndDelete(restaurantId)
res.status(200).json({message:"Restaurant removed successfully"})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });  
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export const verifyRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    restaurant.isVerified = true;
    await restaurant.save();

    res.status(200).json({ message: "Restaurant verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};