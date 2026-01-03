import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { hideToast } from "./uiSlice";
import { CheckCircle, XCircle, Info, X } from "lucide-react";

const Toast = () => {
  const dispatch = useAppDispatch();
  const { message, type, visible } = useAppSelector((state) => state.ui);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [visible, dispatch]);

  if (!visible) return null;

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <XCircle className="h-5 w-5 text-red-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
  };

  const styles = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };

  return (
    <div className="fixed bottom-4 right-4 z-100 transition-all duration-300">
      <div
        key={message}
        className={`relative overflow-hidden flex items-center p-4 rounded-lg border shadow-xl min-w-75 ${styles[type]}`}
      >
        <div className="shrink-0 mr-3">{icons[type]}</div>
        <div className="text-sm font-semibold grow">{message}</div>
        <button
          onClick={() => dispatch(hideToast())}
          className="ml-4 inline-flex text-gray-400 hover:text-gray-900 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 h-1 bg-current opacity-20 animate-toast-progress" />
      </div>
    </div>
  );
};

export default Toast;
