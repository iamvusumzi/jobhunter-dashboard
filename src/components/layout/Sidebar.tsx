import { useEffect } from "react";
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
import clsx from "clsx";
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
];

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;

  isMobileOpen: boolean;
  setIsMobileOpen: (v: boolean) => void;
}

const Sidebar = ({
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
}: SidebarProps) => {
  useEffect(() => {
    if (!isMobileOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMobileOpen, setIsMobileOpen]);

  const closeMobile = () => setIsMobileOpen(false);

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={clsx(
          "fixed inset-0 z-40 bg-black/30 md:hidden transition-opacity",
          isMobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={closeMobile}
        aria-hidden="true"
      />

      <div
        className={clsx(
          "fixed top-0 left-0 z-50 h-screen border-r border-gray-200 bg-white transition-all duration-300 ease-in-out",
          isCollapsed ? "md:w-20" : "md:w-64",
          "w-72 sm:w-80",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0"
        )}
        role="navigation"
        aria-label="Sidebar navigation"
      >
        <Tooltip.Provider delayDuration={0}>
          {/* Collapse control (desktop) */}
          <div className="h-16 px-4 border-b border-gray-200 flex items-center justify-between">
            {/* Desktop collapse button */}
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className={clsx(
                    "hidden md:flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors",
                    isCollapsed && "justify-center w-full"
                  )}
                  aria-label={
                    isCollapsed ? "Expand sidebar" : "Collapse sidebar"
                  }
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
            <div className="md:hidden text-sm font-semibold text-gray-900">
              Navigation
            </div>
          </div>

          {/* Navigation Links */}
          <nav className={clsx("flex-1 py-4 space-y-1 overflow-y-auto px-3")}>
            {navItems.map((item) => (
              <Tooltip.Root key={item.path}>
                <Tooltip.Trigger asChild>
                  <NavLink
                    to={item.path}
                    end={item.exact}
                    onClick={() => {
                      closeMobile();
                    }}
                    className={({ isActive }) =>
                      clsx(
                        "group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                        isCollapsed && "md:justify-center",
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
                            isCollapsed ? "md:mr-0" : "mr-3",
                            isActive
                              ? "text-blue-600"
                              : "text-gray-400 group-hover:text-gray-500"
                          )}
                        />
                        <span
                          className={clsx(
                            "md:block",
                            isCollapsed ? "md:hidden" : ""
                          )}
                        >
                          {item.name}
                        </span>
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
        </Tooltip.Provider>
      </div>
    </>
  );
};

export default Sidebar;
