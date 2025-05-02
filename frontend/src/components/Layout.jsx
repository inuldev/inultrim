import { useEffect, useState } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import BottomNavigation from "./BottomNavigation";

const Layout = ({ children, showSidebar = false }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Check if device is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1 h-full overflow-hidden">
        {/* Desktop Sidebar - only shown on larger screens */}
        {showSidebar && !isMobile && <Sidebar />}

        <div className="flex-1 flex flex-col h-full">
          <Navbar />

          {/* Main Content */}
          <main className={`flex-1 overflow-y-auto ${isMobile ? "pb-16" : ""}`}>
            {children}
          </main>

          {/* Mobile Bottom Navigation - only shown on mobile */}
          {showSidebar && isMobile && <BottomNavigation />}
        </div>
      </div>
    </div>
  );
};

export default Layout;
