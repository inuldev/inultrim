import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Users, Bell, User, MessageCircle } from "lucide-react";

import { useThemeStore } from "../store/useThemeStore";

import ThemeSelector from "./ThemeSelector";

const MobileSidebar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme } = useThemeStore();

  // Close sidebar when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        !e.target.closest(".mobile-sidebar") &&
        !e.target.closest(".sidebar-toggle")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      {/* Toggle Button */}
      <button
        className="sidebar-toggle fixed top-4 left-4 z-50 p-2 rounded-full bg-base-200 shadow-md md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`mobile-sidebar fixed inset-y-0 left-0 z-40 w-64 bg-base-100 shadow-lg transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* User Profile */}
          <div className="p-4 border-b border-base-300">
            <div className="flex items-center space-x-3">
              <div className="avatar">
                <div className="w-12 h-12 rounded-full">
                  <img src={user?.profilePic} alt={user?.fullName} />
                </div>
              </div>
              <div>
                <h3 className="font-bold">{user?.fullName}</h3>
                <p className="text-sm opacity-70">
                  {user?.bio?.substring(0, 20)}...
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className={`flex items-center p-3 space-x-3 rounded-lg hover:bg-base-200 ${
                    location.pathname === "/" ? "bg-base-200 text-primary" : ""
                  }`}
                >
                  <Home size={20} />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/friends"
                  className={`flex items-center p-3 space-x-3 rounded-lg hover:bg-base-200 ${
                    location.pathname === "/friends"
                      ? "bg-base-200 text-primary"
                      : ""
                  }`}
                >
                  <Users size={20} />
                  <span>Friends</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/notifications"
                  className={`flex items-center p-3 space-x-3 rounded-lg hover:bg-base-200 ${
                    location.pathname === "/notifications"
                      ? "bg-base-200 text-primary"
                      : ""
                  }`}
                >
                  <Bell size={20} />
                  <span>Notifications</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className={`flex items-center p-3 space-x-3 rounded-lg hover:bg-base-200 ${
                    location.pathname === "/profile"
                      ? "bg-base-200 text-primary"
                      : ""
                  }`}
                >
                  <User size={20} />
                  <span>Profile</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/messages"
                  className={`flex items-center p-3 space-x-3 rounded-lg hover:bg-base-200 ${
                    location.pathname.startsWith("/chat")
                      ? "bg-base-200 text-primary"
                      : ""
                  }`}
                >
                  <MessageCircle size={20} />
                  <span>Messages</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Theme Selector */}
          <div className="p-4 border-t border-base-300">
            <p className="mb-2 text-sm font-medium">Theme</p>
            <ThemeSelector currentTheme={theme} />
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default MobileSidebar;
