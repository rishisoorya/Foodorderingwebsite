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

    return res.status(201).json({ message: "Signed Up Successfully", token });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
