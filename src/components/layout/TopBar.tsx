import { LogOut, User as UserIcon, Bell } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="h-full flex items-center justify-between">
      {/* Left side: Breadcrumb or Title (Placeholder for now) */}
      <div className="flex items-center">
        <h1 className="text-lg font-semibold text-gray-800">
          {/* You could use useLocation to show dynamic titles here */}
          Console
        </h1>
      </div>

      {/* Right side: Actions & Profile */}
      <div className="flex items-center space-x-4">
        {/* Notification Bell */}
        <button className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100 transition-colors relative">
          <Bell className="h-5 w-5" />
          {/* Notification Dot */}
          <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-6 w-px bg-gray-200" />

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
