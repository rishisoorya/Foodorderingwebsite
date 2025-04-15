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

app.use(
  cors({
    origin: [
      process.env.CLIENT_URL,
      process.env.ADMIN_URL,
      process.env.RESTAURANT_URL,
    ],
    credentials: true, // Allow cookies and credentials
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // Allow these HTTP methods
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ], // Allow these headers
  })
);

// Handle preflight requests
app.options("*", cors());

// Verify environment variables
if (!process.env.CLIENT_URL || !process.env.ADMIN_URL) {
  console.warn(
    "CLIENT_URL or ADMIN_URL is not set in the environment variables."
  );
}

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
