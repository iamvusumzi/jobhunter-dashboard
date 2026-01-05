import { useNavigate } from "react-router-dom";
import { ShieldAlert } from "lucide-react";

const Forbidden = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center max-w-md">
        <div className="bg-red-50 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldAlert className="h-10 w-10 text-red-500" />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">403</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Access Denied
        </h2>
        <p className="text-gray-500 mb-8">
          You don't have permission to access this area. This console is
          restricted to authorized administrators.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/login")}
            className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex-1 py-3 px-4 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
