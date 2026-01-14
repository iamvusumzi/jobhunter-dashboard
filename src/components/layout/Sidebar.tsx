import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  Activity,
  Search,
  ChevronsLeft,
  BrainCircuit,
  UserCog,
} from "lucide-react";
import clsx from "clsx"; // Helper for conditional classes
import * as Tooltip from "@radix-ui/react-tooltip";

const navItems = [
  { name: "Dashboard", path: "/app", icon: LayoutDashboard, exact: true },
  { name: "Jobs", path: "/app/jobs", icon: Briefcase, exact: false },
  { name: "Executions", path: "/app/executions", icon: Activity, exact: false },
  {
    name: "Profile",
    path: "/app/settings/profile",
    icon: UserCog,
    exact: false,
  },
  {
    name: "Search Rules",
    path: "/app/settings/search",
    icon: Search,
    exact: false,
  },
  {
    name: "AI Brain",
    path: "/app/settings/ai-config",
    icon: BrainCircuit,
    exact: false,
  },
  // { name: 'Stats', path: '/app/stats', icon: PieChart, exact: false }, // Future
];

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}

const Sidebar = ({ isCollapsed, setIsCollapsed }: SidebarProps) => {
  return (
    <div
      className={clsx(
        "fixed top-0 left-0 z-10 hidden h-screen flex-col border-r border-gray-200 bg-white transition-all duration-300 ease-in-out md:flex",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <Tooltip.Provider delayDuration={0}>
        {/* Brand Logo area */}
        <div
          className={clsx(
            "h-16 flex items-center shrink-0 border-b border-gray-200",
            isCollapsed ? "justify-center" : "px-6"
          )}
        >
          <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Activity className="h-5 w-5 text-white" />
          </div>
          {!isCollapsed && (
            <span className="ml-3 text-xl font-bold text-gray-900 tracking-tight">
              JobHunter
            </span>
          )}
        </div>

        {/* Navigation Links */}
        <nav
          className={clsx(
            "flex-1 py-6 space-y-1 overflow-y-auto",
            isCollapsed ? "px-2" : "px-4"
          )}
        >
          {navItems.map((item) => (
            <Tooltip.Root key={item.path}>
              <Tooltip.Trigger asChild>
                <NavLink
                  to={item.path}
                  end={item.exact} // "end" prevents /app from being active when at /app/jobs
                  className={({ isActive }) =>
                    clsx(
                      "group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                      isCollapsed && "justify-center",
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <item.icon
                        className={clsx(
                          "h-5 w-5 shrink-0 transition-colors",
                          !isCollapsed && "mr-3",
                          isActive
                            ? "text-blue-600"
                            : "text-gray-400 group-hover:text-gray-500"
                        )}
                      />
                      {!isCollapsed && item.name}
                    </>
                  )}
                </NavLink>
              </Tooltip.Trigger>
              {isCollapsed && (
                <Tooltip.Portal>
                  <Tooltip.Content
                    side="right"
                    align="center"
                    className="z-50 overflow-hidden rounded-md bg-gray-900 px-3 py-1.5 text-xs text-gray-50 animate-in fade-in-0 zoom-in-95"
                  >
                    {item.name}
                  </Tooltip.Content>
                </Tooltip.Portal>
              )}
            </Tooltip.Root>
          ))}
        </nav>

        {/* Bottom Links */}
        <div className="p-4 border-t border-gray-200">
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className={clsx(
                  "flex items-center w-full px-3 py-2 mt-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors",
                  isCollapsed && "justify-center"
                )}
              >
                <ChevronsLeft
                  className={clsx(
                    "h-5 w-5 text-gray-400 shrink-0 transition-transform duration-300",
                    isCollapsed && "rotate-180"
                  )}
                />
                {!isCollapsed && <span className="ml-3">Collapse</span>}
              </button>
            </Tooltip.Trigger>
            {isCollapsed && (
              <Tooltip.Portal>
                <Tooltip.Content
                  side="right"
                  align="center"
                  className="z-50 overflow-hidden rounded-md bg-gray-900 px-3 py-1.5 text-xs text-gray-50 animate-in fade-in-0 zoom-in-95"
                >
                  Expand
                </Tooltip.Content>
              </Tooltip.Portal>
            )}
          </Tooltip.Root>
        </div>
      </Tooltip.Provider>
    </div>
  );
};

export default Sidebar;
