import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { createToken } from "../utils/token.js";

export async function signUp(req, res) {
  try {
    const { name, email, phone, password, profilePic, role } = req.body;
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All Fields Required" });
    }
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({ message: "User Already Exists" });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      profilePic,
      role,
    });
    await newUser.save();
    const token = createToken(newUser);
    res.cookie("token", token);
    res.status(201).json({ message: "Signed Up Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({ message: "Fill All Required Fields" });
    }
    const user = await User.findOne({ email: email }).select("role password");
   
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const isPasswordMatch = bcrypt.compareSync(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Wrong Password" });
    }
    const token = createToken(user);
    res.cookie("token", token, {
      httpOnly: true, // Prevents access via JavaScript (XSS protection)
      secure: true, // Works only on HTTPS (important in production)
      sameSite: "None", // Allows cross-origin requests
      path: "/", // Available for all routes
    });
    res.status(200).json({ message: "Logged in Successfully",user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function profileUpdate(req, res) {
  try {
    const { name, email, phone, profilePic } = req.body;
    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized User" });
    }
    const user = await User.findByIdAndUpdate(
      userId,
      { name, email, phone, profilePic },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "profile updated Successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getProfile(req, res) {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized User" });
    }
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unable To Find User" });
    }
    res.status(200).json({ message: "User Profile Fetched Sucessfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getRole(req, res) {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized User" });
    }
    const user = await User.findById(userId).select("role");
    if (!user) {
      return res.status(404).json({ message: "Unable To Find User" });
    }
    res.status(200).json({ message: "Role Fetched Sucessfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function checkUser(req, res, next) {
  try {
    res.json({ message: "user autherized" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
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

export async function getAlluser(req,res) {
  try {
    const users = await User.find({role:{$ne:"admin"}}).select("-password")
    res.status(200).json({ message: "fetched all user",users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function removeUser(req,res) {
  try {
    const {userId} = req.params
const findUser = await User.findById(userId)
    if(!findUser){
return res.status(404).json({message:"No Restaurant found"})
    }
const userDel = await User.findByIdAndDelete(userId)
res.status(200).json({message:"Restaurant removed successfully"})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });  
  }
}