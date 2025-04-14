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

// Debug logs to check environment variables (check Render logs after deploy)
console.log("CLIENT_URI:", process.env.CLIENT_URI);
console.log("ADMIN_URI:", process.env.ADMIN_URI);

// TEMPORARY CORS FOR TESTING (allow all origins)
app.use(
  cors({
    origin: '*', // ❗️ TEMP: Allow all origins
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
  })
);

// ✅ When deploying to production, switch to this version:
// app.use(
//   cors({
//     origin: [process.env.CLIENT_URI, process.env.ADMIN_URI],
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//     allowedHeaders: [
//       "Content-Type",
//       "Authorization",
//       "X-Requested-With",
//       "Accept",
//     ],
//   })
// );

app.use(express.json());
app.use(cookieParser());

// Connect to database
connectDB();

// API routes
app.use("/api", apiRouterLink);

// Handle 404 errors
app.all("*", (req, res) => {
  res.status(404).json({ message: "Endpoint does not exist" });
});

// Start server
app.listen(port, () =>
  console.log(`Server running on port: http://localhost:${port}`)
);
