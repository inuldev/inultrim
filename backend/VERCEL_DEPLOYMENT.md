# Deploying the Backend to Vercel

This guide provides step-by-step instructions for deploying the backend API to Vercel.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. Vercel CLI installed (optional, but recommended for troubleshooting)
3. MongoDB Atlas account with a database set up
4. Stream account with API keys

## Deployment Steps

### Method 1: Deploy via Vercel Dashboard

1. Log in to your Vercel account
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - Root Directory: `backend`
   - Framework Preset: `Other`
   - Build Command: `npm install`
   - Output Directory: `.`
5. Add Environment Variables (copy from `.env.vercel`):
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET_KEY`: Your JWT secret key
   - `STREAM_API_KEY`: Your Stream API key
   - `STREAM_API_SECRET`: Your Stream API secret
   - `FRONTEND_URL`: URL of your deployed frontend (e.g., https://inultrim.vercel.app)
   - `NODE_ENV`: `production`
6. Click "Deploy"

### Method 2: Deploy via Vercel CLI (Recommended for Troubleshooting)

1. Install Vercel CLI:

   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:

   ```bash
   vercel login
   ```

3. Navigate to the backend directory:

   ```bash
   cd backend
   ```

4. Deploy to Vercel:

   ```bash
   vercel
   ```

5. When prompted:

   - Set up and deploy: `Y`
   - Which scope: Select your account
   - Link to existing project: `N` (if first time)
   - Project name: `inultrim-api` (or your preferred name)
   - Root directory: `.`
   - Override settings: `Y`
   - Build command: `npm install`
   - Output directory: `.`
   - Development command: `npm run dev`
   - Want to override the settings: `Y`

6. After deployment, set environment variables:

   ```bash
   vercel env add MONGO_URI
   vercel env add JWT_SECRET_KEY
   vercel env add STREAM_API_KEY
   vercel env add STREAM_API_SECRET
   vercel env add FRONTEND_URL
   vercel env add NODE_ENV
   ```

7. Redeploy with environment variables:
   ```bash
   vercel --prod
   ```

## Troubleshooting

### 404 Errors

If you're getting 404 errors after deployment:

1. Check that your `vercel.json` file is correctly configured:

   ```json
   {
     "version": 2,
     "public": true,
     "rewrites": [{ "source": "/(.*)", "destination": "/api" }]
   }
   ```

2. Verify that your `api/index.js` file is using the proper serverless function handler:

   ```javascript
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
   ```

3. If your API is showing the source code instead of executing it, make sure:

   - You're using the proper serverless function handler format (as shown above)
   - Your vercel.json is using rewrites instead of routes
   - You've deployed the backend directory, not the entire repository

4. Check Vercel deployment logs for any errors:
   ```bash
   vercel logs inultrim-api.vercel.app
   ```

### CORS Issues

If you're experiencing CORS issues:

1. Make sure your frontend URL is added to the `allowedOrigins` array in `api/index.js`
2. Verify that the `credentials: true` option is set in the CORS configuration
3. Check that your frontend is making requests with `withCredentials: true`

### Database Connection Issues

If your API can't connect to MongoDB:

1. Check that your MongoDB connection string is correctly set in Vercel environment variables
2. Verify that your MongoDB Atlas cluster has the correct IP whitelist settings (Vercel uses dynamic IPs, so you may need to allow access from anywhere)
3. Check the Vercel function logs for any connection errors

## Testing Your Deployment

After deployment, test your API with the following endpoints:

1. Root endpoint: `https://inultrim-api.vercel.app/`
2. Health check: `https://inultrim-api.vercel.app/api/health`
3. Auth endpoints: `https://inultrim-api.vercel.app/api/auth/*`

You can use tools like Postman or curl to test your API endpoints.
