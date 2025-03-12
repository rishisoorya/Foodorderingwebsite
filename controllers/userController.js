import bcrypt from "bcryptjs";
import { User } from "../models/userModel.js";
import { createToken } from "../utils/token.js";

export async function signUp(req, res) {
  try {
    const { name, email, number, password, profilePic, role } = req.body;

    if (!name || !email || !number || !password) {
      return res.status(400).json({ message: "All Fields Required" });
    }

    // Check if user with the same email or phone exists
    const userExist = await User.findOne({ $or: [{ email }, { number }] });
    if (userExist) {
      return res.status(400).json({ message: "Email or Phone already registered" });
    }

    // Hash password asynchronously
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      number,
      password: hashedPassword,
      profilePic,
      role,
    });

    await newUser.save();

    // Generate token
    const token = createToken(newUser);

    // Set cookie with token
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set secure flag in production
      sameSite: "Strict",
    });

    return res.status(201).json({ message: "Signed Up Successfully"});
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function logIn(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordChecking = bcrypt.compareSync(password, user.password);
    
    if (!passwordChecking) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = createToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "Strict",
    });

    return res.status(200).json({ message: "Logged in successfully"});
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function profileChange(req,res) {

  try {
    const {email,name,number,profilePic} = req.body;
    const userId = req.user.id 
    if (!userId){
      return res.status(401).json({message:"no user found"});
    }
    const user = await User.findByIdAndUpdate(
      userId,
      {name,number,profilePic,email},
      {new:true}
    )

   
return res.status(200).json({message:"updated profile",user})
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
  
  
}
export async function getingRole(req,res) {
  try {
  
    const user = await User.findById(req.user.id).select("role")
    if (!user){
      return res.status(404).json({message:"user not found"})
    }
    res.status(200).json({message:"user found",user})
  } catch (error) {
    console.error("error while fetching role",error)
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function profile(req,res) {
  try {
  
    const user = await User.findById(req.user.id).select("-role")
    if (!user){
      return res.status(404).json({message:"user not found"})
    }
    res.status(200).json({message:"user found",user})
  } catch (error) {
    console.error("error while fetching role",error)
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function logout(req,res) {
  try {
    res.clearCookie("token")
    res.status(200).json({message:"logout sucessfully"})
  } catch (error) {
    console.error("logout error",error)
    return res.status(500).json({ message: "Internal Server Error" });
  }
    
  }
  
