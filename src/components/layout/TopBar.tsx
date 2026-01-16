import { Activity, LogOut, User as UserIcon, Menu, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

interface TopBarProps {
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;

  isMobileOpen: boolean;
  setIsMobileOpen: (v: boolean) => void;
}

const TopBar = ({ isMobileOpen, setIsMobileOpen }: TopBarProps) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  return (
    <div className="h-full flex items-center justify-between">
      {/* Left: Mobile menu + Brand */}
      <div className="flex items-center gap-4 min-w-0">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden inline-flex items-center justify-center p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          aria-label={isMobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isMobileOpen}
        >
          {isMobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
          <Activity className="h-5 w-5 text-white" />
        </div>

        <span className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight truncate">
          JobHunter
        </span>
      </div>

      {/* Right: Profile + Logout */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex flex-col items-end leading-tight">
          <span className="text-sm font-medium text-gray-700">
            {user?.username || "Admin User"}
          </span>
          <span className="text-xs text-gray-500">
            {user?.role || "Viewer"}
          </span>
        </div>

        <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200">
          <UserIcon className="h-4 w-4 text-gray-500" />
        </div>

        <button
          onClick={handleLogout}
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Sign out"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
