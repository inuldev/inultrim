// Import required modules
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "../src/lib/db.js";
import authRoutes from "../src/routes/auth.route.js";
import userRoutes from "../src/routes/user.route.js";
import chatRoutes from "../src/routes/chat.route.js";

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow all origins for now
      callback(null, true);
    },
    credentials: true,
  })
);

// Connect to database
connectDB();

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Streaminul API is running",
    documentation:
      "API endpoints available at /api/auth, /api/users, and /api/chat",
    version: "1.0.0",
  });
});

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

// 404 handler for API routes
app.use("/api/*", (req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `Cannot ${req.method} ${req.originalUrl}`,
    path: req.originalUrl,
  });
});

// Export the Express app as a serverless function
export default app;
