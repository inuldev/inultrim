// Serverless function handler for Vercel
import "dotenv/config";
import app from "../src/server.js";

// Export the Express app as a serverless function
export default function handler(req, res) {
  // Pass the request to the Express app
  return app(req, res);
}

// Configure the serverless function
export const config = {
  api: {
    bodyParser: false,
  },
};
