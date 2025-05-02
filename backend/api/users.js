// Serverless function handler for users routes
import "dotenv/config";
import app from "../src/server.js";

// Export the Express app as a serverless function
export default function handler(req, res) {
  // Only handle /api/users routes
  if (req.url.startsWith("/api/users")) {
    return app(req, res);
  }

  // Return 404 for other routes
  res.status(404).json({
    error: "Not Found",
    message: `Cannot ${req.method} ${req.url}`,
    path: req.url,
  });
}
