// Serverless entry point for Vercel
import app from "./src/server.js";

// Export a function that handles the request
export default function handler(req, res) {
  // Forward the request to the Express app
  return app(req, res);
}
