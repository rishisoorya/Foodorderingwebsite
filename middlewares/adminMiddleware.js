import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const adminMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token; // Ensure token exists
    if (!token) {
      return res.status(401).json({ message: "No Token Available" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing in environment variables");
      return res.status(500).json({ message: "Internal Server Error" });
    }

    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = tokenDecoded;

    // Check if user has an admin role
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access Denied: Admins Only" });
    }

    next(); // User is an admin, proceed to the next middleware
  } catch (error) {
    console.error("Error in admin middleware:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token Expired. Please login again." });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid Token" });
    }

    res.status(401).json({ message: "Unauthorized Access" });
  }
};
