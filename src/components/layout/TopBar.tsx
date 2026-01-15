import { Activity, LogOut, User as UserIcon, Menu } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

interface TopBarProps {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}

const TopBar = ({ isCollapsed, setIsCollapsed }: TopBarProps) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="h-full flex items-center justify-between">
      {/* Left side: Breadcrumb or Title (Placeholder for now) */}
      <div className="h-16 flex items-center shrink-0 border-b border-gray-200">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="md:hidden mr-3 pr-3 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          aria-label="Toggle Sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Activity className="h-5 w-5 text-white" />
        </div>

        <span className="ml-3 text-xl font-bold text-gray-900 tracking-tight">
          JobHunter
        </span>
      </div>

      {/* Right side: Actions & Profile */}
      <div className="flex items-center space-x-4">
        {/* User Profile */}
        <div className="flex items-center space-x-3 pl-1">
          <div className="hidden md:flex flex-col items-end">
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

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="ml-2 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Sign out"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
