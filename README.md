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

This application is configured for easy deployment to Vercel. Both the frontend and backend can be deployed separately.

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

#### Backend Deployment

1. In Vercel dashboard, click "New Project"
2. Import the same GitHub repository
3. Configure the project:
   - Root Directory: `backend`
   - Framework Preset: `Node.js`
   - Build Command: `npm run vercel-build`
   - Output Directory: `.`
4. Add Environment Variables:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET_KEY`: Your JWT secret key
   - `STEAM_API_KEY`: Your Stream API key
   - `STEAM_API_SECRET`: Your Stream API secret
   - `FRONTEND_URL`: URL of your deployed frontend (e.g., https://inultrim.vercel.app)
   - `NODE_ENV`: `production`
   - `PORT`: `3000` (Vercel's default port)
   - `COOKIE_DOMAIN`: Optional, for cross-domain cookies (e.g., vercel.app)
5. Click "Deploy"

**Alternative Backend Deployment Method:**

If you encounter issues with the above method, you can try deploying the entire repository:

1. In Vercel dashboard, click "New Project"
2. Import your GitHub repository
3. Configure the project:
   - Root Directory: `.` (root of the repository)
   - Framework Preset: `Other`
   - Build Command: `cd backend && npm run vercel-build`
   - Output Directory: `backend`
4. Add the same Environment Variables as above
5. Click "Deploy"

### Connecting Frontend and Backend

After deployment, make sure to:

1. Update the frontend's `VITE_BACKEND_URL` to point to your deployed backend
2. Update the backend's `FRONTEND_URL` to point to your deployed frontend
3. Test the application to ensure everything works correctly

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
