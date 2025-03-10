import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const userMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: " No Token Avilable" });
    }

    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = tokenDecoded;
    next();
  } catch (error) {
    console.error("Error in token:", error);
    res.status(401).json({ message: "Invalid or Expired Token" });
  }
};