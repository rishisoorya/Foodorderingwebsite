import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { apiRouterLink } from "./routes/route.js";
import { connectDB } from "./config/db.js";
import cors from "cors";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Define allowed origins from environment variables
const allowedOrigins = [process.env.CLIENT_URI, process.env.ADMIN_URI];

// Configure CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies and credentials
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // Allowed HTTP methods
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ], // Allowed headers
  })
);

// Middleware
app.use(express.json());
app.use(cookieParser());

// Connect to the database
connectDB();

// API routes
app.use("/api", apiRouterLink);

// Handle 404 errors
app.all("*", (req, res) => {
  res.status(404).json({ message: "Endpoint does not exist" });
});

// Start the server
app.listen(port, () =>
  console.log(`Server running on port: http://localhost:${port}`)
);
