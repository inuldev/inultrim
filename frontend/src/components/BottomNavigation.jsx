import { Link, useLocation } from "react-router-dom";
import { Home, Users, Bell } from "lucide-react";

const BottomNavigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-base-100 border-t border-base-300 md:hidden h-16">
      <div className="flex justify-around">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center py-2 flex-1 ${
            location.pathname === "/" ? "text-primary" : "text-base-content"
          }`}
        >
          <Home size={20} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link
          to="/friends"
          className={`flex flex-col items-center justify-center py-2 flex-1 ${
            location.pathname === "/friends"
              ? "text-primary"
              : "text-base-content"
          }`}
        >
          <Users size={20} />
          <span className="text-xs mt-1">Friends</span>
        </Link>
        <Link
          to="/notifications"
          className={`flex flex-col items-center justify-center py-2 flex-1 ${
            location.pathname === "/notifications"
              ? "text-primary"
              : "text-base-content"
          }`}
        >
          <Bell size={20} />
          <span className="text-xs mt-1">Alerts</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNavigation;
