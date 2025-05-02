<h1 align="center">✨ Streaminul - Language Exchange Platform ✨</h1>

![Demo App](/frontend/public/screenshot.png)

## 🌟 Highlights

- 🌐 **Real-time Messaging** with Typing Indicators & Reactions
- 📹 **Video Calling** with Screen Sharing & Recording
- 👥 **Social Features** including Friend Management, Recommendations, and Notifications
- 🔍 **Search Functionality** for finding friends by name or language
- 🔐 **JWT Authentication** & Protected Routes
- 🌍 **Language Exchange Platform** with 32 Unique UI Themes
- 🎨 **Modern UI/UX** with Toast Notifications and Tooltips
- ⚡ **Tech Stack**: React + Express + MongoDB + TailwindCSS + TanStack Query
- 🧠 **Global State Management** with Zustand
- 🚨 **Comprehensive Error Handling** (Frontend & Backend)
- 🚀 **Responsive Design** for all devices
- 🎯 **Built with Scalable Technologies** like Stream
- ⏳ And much more!

## 🆕 Recent Updates

### Social Features

- **Friend Management**: Add, remove, and view friends with intuitive UI
- **Friend Recommendations**: Discover language partners based on your profile
- **Friend Requests**: Send, accept, and reject friend requests
- **Search Functionality**: Find friends by name, native language, or learning language

### UI/UX Improvements

- **Toast Notifications**: Enhanced feedback with custom toast notifications
- **Tooltips**: Improved user experience with informative tooltips
- **Loading Indicators**: Visual feedback during async operations
- **404 Page**: Custom not-found page for better user experience
- **Responsive Design**: Optimized for all screen sizes

---

## 🔍 Features in Detail

### Authentication & User Management

- **Secure Registration & Login**: JWT-based authentication system
- **User Profiles**: Customize your profile with language preferences and bio
- **Onboarding Process**: Guided setup for new users

### Social Networking

- **Friend Management**:
  - Add new friends through recommendations
  - Remove friends with confirmation
  - View all friends with search functionality
- **Friend Recommendations**: Algorithm suggests language partners based on your profile
- **Friend Requests**: Manage incoming and outgoing friend requests

### Communication

- **Real-time Chat**: Instant messaging with typing indicators
- **Video Calling**: One-on-one video calls with friends
- **Message History**: Access your conversation history anytime

### UI/UX

- **Theme Customization**: Choose from 32 different UI themes
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Toast Notifications**: Informative feedback for user actions
- **Tooltips**: Contextual help for UI elements
- **Loading States**: Visual feedback during async operations

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB account
- Stream account for chat and video functionality

## 🧪 .env Setup

### Backend (`/backend`)

```
PORT=5001
MONGO_URI=your_mongo_uri
STEAM_API_KEY=your_steam_api_key
STEAM_API_SECRET=your_steam_api_secret
JWT_SECRET_KEY=your_jwt_secret
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend (`/frontend`)

```
VITE_STREAM_API_KEY=your_stream_api_key
VITE_BACKEND_URL=http://localhost:5001/api
```

---

## 🔧 Installation & Setup

### Run the Backend

```bash
cd backend
npm install
npm run dev
```

### Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

## 📱 Usage Guide

1. **Register/Login**: Create an account or login to an existing one
2. **Complete Onboarding**: Set up your profile with language preferences
3. **Find Friends**: Browse recommendations and send friend requests
4. **Chat**: Start conversations with your friends
5. **Video Call**: Initiate video calls from the chat interface
6. **Manage Friends**: Search, add, or remove friends as needed

## 🛠️ Technologies Used

- **Frontend**: React, TailwindCSS, DaisyUI, React Query, Zustand
- **Backend**: Express.js, MongoDB, Mongoose
- **Real-time Communication**: Stream Chat & Video SDK
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Ready for deployment on platforms like Vercel, Netlify, or Heroku

## 🔄 Recent Improvements

### Routing & Navigation

- Fixed routing issues with React Router
- Implemented proper 404 page for non-existent routes
- Improved navigation between pages

### Friend Management

- Added ability to remove friends with confirmation
- Implemented search functionality for finding friends
- Enhanced friend recommendations to show unfriended users
- Improved UI for friend cards and lists

### UI/UX Enhancements

- Added toast notifications for better feedback
- Implemented tooltips for improved usability
- Added loading indicators for async operations
- Improved responsive design for all screen sizes

## 🚀 Deployment Guide

### Deploying to Vercel

This application is configured for easy deployment to Vercel. Both the frontend and backend need to be deployed separately.

> **Note**: For detailed backend deployment instructions and troubleshooting, see the [VERCEL_DEPLOYMENT.md](backend/VERCEL_DEPLOYMENT.md) file in the backend directory.

#### Frontend Deployment

1. Fork or clone this repository to your GitHub account
2. Sign up for a Vercel account at https://vercel.com
3. Click "New Project" in Vercel dashboard
4. Import your GitHub repository
5. Configure the project:
   - Root Directory: `frontend`
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Add Environment Variables:
   - `VITE_STREAM_API_KEY`: Your Stream API key
   - `VITE_BACKEND_URL`: URL of your deployed backend (e.g., https://inultrim-api.vercel.app/api)
7. Click "Deploy"

#### Backend Deployment (Recommended Method)

1. In Vercel dashboard, click "New Project"
2. Import your GitHub repository
3. Configure the project:
   - Root Directory: `backend`
   - Framework Preset: `Other`
   - Build Command: `npm install`
   - Output Directory: `.`
4. Add Environment Variables:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET_KEY`: Your JWT secret key
   - `STREAM_API_KEY`: Your Stream API key
   - `STREAM_API_SECRET`: Your Stream API secret
   - `FRONTEND_URL`: URL of your deployed frontend (e.g., https://inultrim.vercel.app)
   - `NODE_ENV`: `production`
5. Click "Deploy"

#### Vercel Configuration Files

The project includes the necessary configuration files for Vercel deployment:

1. **Backend Configuration** (`backend/vercel.json`):

   ```json
   {
     "version": 2,
     "public": true,
     "rewrites": [{ "source": "/(.*)", "destination": "/api" }]
   }
   ```

2. **API Handlers** (`backend/api/*.js`):
   Each API file uses the serverless function handler pattern:

   ```javascript
   // Serverless function handler for Vercel
   import app from "../src/server.js";

   export default function handler(req, res) {
     return app(req, res);
   }
   ```

**Important Notes for Vercel Deployment**

- **API Directory Structure**: The `api` directory is special in Vercel and is used for serverless functions. Each file in this directory becomes a serverless endpoint.
- **Serverless Function Format**: Always use the handler function format for API files to ensure they execute properly.
- **Vercel Configuration**: Use `rewrites` in vercel.json instead of `routes` for better compatibility.
- **Environment Variables**: All environment variables must be set in the Vercel dashboard.
- **Cross-Domain Cookies**: For cross-domain cookies to work, set `sameSite: "none"` and `secure: true` in your cookie options.
- **Cold Starts**: Serverless functions have cold starts, which may cause the first request to be slower.
- **Testing Locally**: You can test your Vercel deployment locally using `vercel dev` in the backend directory.

### Connecting Frontend and Backend

After deploying both the frontend and backend, you need to connect them:

1. **Update Frontend Environment Variables**:

   - Go to your frontend project in the Vercel dashboard
   - Navigate to "Settings" > "Environment Variables"
   - Set `VITE_BACKEND_URL` to your backend URL (e.g., `https://inultrim-api.vercel.app/api`)
   - Click "Save" and redeploy if necessary

2. **Update Backend Environment Variables**:

   - Go to your backend project in the Vercel dashboard
   - Navigate to "Settings" > "Environment Variables"
   - Set `FRONTEND_URL` to your frontend URL (e.g., `https://inultrim.vercel.app`)
   - Click "Save" and redeploy if necessary

3. **Test the Connection**:

   - Visit your frontend application
   - Try to log in or register
   - Check the browser console for any CORS errors
   - Verify that API requests are being made to the correct URL

4. **Troubleshooting Connection Issues**:
   - Check CORS configuration in the backend
   - Verify that cookies are being set correctly
   - Ensure all environment variables are properly set
   - Check Vercel logs for any errors

### Troubleshooting Vercel Deployment

If you encounter issues with your Vercel deployment, here are some common problems and solutions:

#### 1. API Returns 404 Not Found

- Verify that your `vercel.json` file is correctly configured with rewrites
- Check that your API files are using the proper serverless function handler format
- Make sure you've deployed the correct directory (backend)
- Check Vercel logs for any errors during deployment

#### 2. API Shows Source Code Instead of Executing

- Make sure your API files are using the proper serverless function handler format:
  ```javascript
  export default function handler(req, res) {
    return app(req, res);
  }
  ```
- Verify that your `vercel.json` is using rewrites instead of routes
- Check that you're deploying the backend directory, not the entire repository

#### 3. CORS Errors

- Verify that your backend CORS configuration includes your frontend domain
- Check that credentials are enabled in both frontend requests and backend CORS config
- Make sure your cookies are configured with `sameSite: "none"` and `secure: true`

#### 4. Environment Variables Not Working

- Double-check that all environment variables are set in the Vercel dashboard
- Verify that you're referencing them correctly in your code
- Remember that environment variables are case-sensitive
- Redeploy after making changes to environment variables

#### 5. Database Connection Issues

- Verify your MongoDB connection string is correct
- Make sure your MongoDB Atlas cluster has the correct IP whitelist settings
- Check Vercel logs for any connection errors

For more detailed troubleshooting, refer to the [VERCEL_DEPLOYMENT.md](backend/VERCEL_DEPLOYMENT.md) file in the backend directory.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
