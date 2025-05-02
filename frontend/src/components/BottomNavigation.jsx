import { Link, useLocation } from "react-router-dom";
import { Home, Users, Bell, MessageCircle, User, Settings } from "lucide-react";

const BottomNavigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-base-100 border-t border-base-300 md:hidden h-16 shadow-lg">
      <div className="flex justify-around items-center h-full">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center py-2 flex-1 ${
            location.pathname === "/"
              ? "text-primary font-medium"
              : "text-base-content opacity-75 hover:opacity-100"
          }`}
        >
          <div
            className={`p-1 rounded-full ${
              location.pathname === "/" ? "bg-primary bg-opacity-20" : ""
            }`}
          >
            <Home size={20} />
          </div>
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link
          to="/friends"
          className={`flex flex-col items-center justify-center py-2 flex-1 ${
            location.pathname === "/friends"
              ? "text-primary font-medium"
              : "text-base-content opacity-75 hover:opacity-100"
          }`}
        >
          <div
            className={`p-1 rounded-full ${
              location.pathname === "/friends" ? "bg-primary bg-opacity-20" : ""
            }`}
          >
            <Users size={20} />
          </div>
          <span className="text-xs mt-1">Friends</span>
        </Link>
        <Link
          to="/notifications"
          className={`flex flex-col items-center justify-center py-2 flex-1 ${
            location.pathname === "/notifications"
              ? "text-primary font-medium"
              : "text-base-content opacity-75 hover:opacity-100"
          }`}
        >
          <div
            className={`p-1 rounded-full ${
              location.pathname === "/notifications"
                ? "bg-primary bg-opacity-20"
                : ""
            }`}
          >
            <Bell size={20} />
          </div>
          <span className="text-xs mt-1">Alerts</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNavigation;
