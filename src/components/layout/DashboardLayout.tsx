import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import clsx from "clsx";

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div className="h-screen bg-gray-50">
      {/* The Sidebar is fixed and handles its own state. We pass state to it. */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Main Content Area */}
      {/* This container's left padding adjusts based on the sidebar's state */}
      <div
        className={clsx(
          "flex h-full flex-col transition-all duration-300 ease-in-out",
          isCollapsed ? "md:pl-20" : "md:pl-64"
        )}
      >
        <header className="h-16 border-b border-gray-200 bg-white shadow-sm z-20 px-6">
          <TopBar />
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
