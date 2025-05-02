import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";
import BottomNavigation from "./BottomNavigation";
import useAuthUser from "../hooks/useAuthUser";

const Layout = ({ children, showSidebar = false }) => {
  const [mobileNavType, setMobileNavType] = useState("sidebar"); // "sidebar" or "bottom"
  const { authUser } = useAuthUser();

  // Load user preference from localStorage
  useEffect(() => {
    const savedPref = localStorage.getItem("mobileNavPreference");
    if (savedPref) {
      setMobileNavType(savedPref);
    }
  }, []);

  // Save preference to localStorage when changed
  const toggleMobileNavType = () => {
    const newType = mobileNavType === "sidebar" ? "bottom" : "sidebar";
    setMobileNavType(newType);
    localStorage.setItem("mobileNavPreference", newType);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1 h-full overflow-hidden">
        {/* Desktop Sidebar */}
        {showSidebar && <Sidebar />}

        <div className="flex-1 flex flex-col h-full">
          <Navbar
            onToggleMobileNav={toggleMobileNavType}
            currentMobileNav={mobileNavType}
          />

          {/* Main Content */}
          <main
            className={`flex-1 overflow-y-auto ${
              mobileNavType === "bottom" ? "pb-16" : ""
            }`}
          >
            {children}
          </main>

          {/* Mobile Navigation */}
          {showSidebar && (
            <>
              {mobileNavType === "sidebar" ? (
                <MobileSidebar user={authUser} />
              ) : (
                <BottomNavigation />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;
