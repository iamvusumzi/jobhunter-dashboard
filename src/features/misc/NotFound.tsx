import { useNavigate } from "react-router-dom";
import { SearchX } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center max-w-md">
        <div className="bg-gray-100 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <SearchX className="h-10 w-10 text-gray-400" />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Page not found
        </h2>
        <p className="text-gray-500 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate("/")}
          className="w-full py-3 px-4 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors"
        >
          Return Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
