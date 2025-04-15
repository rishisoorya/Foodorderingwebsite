import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const createToken = (user) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return token;
  } catch (error) {
    console.error(`Error creating token for user ${user?._id}:`, error.message);
    return null;
  }
};
