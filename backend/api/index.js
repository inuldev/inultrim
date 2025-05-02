// Import required modules
import "dotenv/config";
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

// Allow multiple origins for CORS
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "https://inultrim.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
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
// For Vercel, we need to export a handler function
export default app;

// Export a handler function for serverless environments
export const config = {
  api: {
    bodyParser: false,
  },
};
