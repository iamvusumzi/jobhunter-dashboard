import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchRecentExecutions } from "./executionsSlice";
import { CheckCircle, XCircle, Loader2, Database, Clock } from "lucide-react";
import { type ExecutionStatus } from "../../types/observations";
import clsx from "clsx";

const ExecutionsList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, loading } = useAppSelector((state) => state.executions);

  useEffect(() => {
    dispatch(fetchRecentExecutions(10));

    const interval = setInterval(() => {
      if (
        items.length > 0 &&
        items.some(
          (exec) =>
            exec.status === "RUNNING" || exec.status === "INGESTION_COMPLETE"
        )
      ) {
        dispatch(fetchRecentExecutions(10));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch, items]);

  const getDuration = (start: string, end: string | null) => {
    if (!end) return "Active...";
    const diff = new Date(end).getTime() - new Date(start).getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    return minutes > 0 ? `${minutes}m ${seconds % 60}s` : `${seconds}s`;
  };

  const StatusIcon = ({ status }: { status: ExecutionStatus }) => {
    switch (status) {
      case "COMPLETED":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "FAILED":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "RUNNING":
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
      case "INGESTION_COMPLETE":
        return <Database className="h-5 w-5 text-purple-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Ingestion History
          </h1>
          <p className="text-gray-500 text-sm mt-1">Recent activity log</p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Started
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Jobs Scanned
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Jobs Approved
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading && items.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center">
                  <Loader2 className="h-8 w-8 text-blue-600 animate-spin mx-auto" />
                </td>
              </tr>
            ) : (
              items.map((exec) => (
                <tr
                  key={exec.id}
                  onClick={() => navigate(`/app/executions/${exec.id}`)}
                  className="hover:bg-gray-50 transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <StatusIcon status={exec.status} />
                      <span
                        className={clsx("ml-2 text-sm font-medium", {
                          "text-green-700": exec.status === "COMPLETED",
                          "text-red-700": exec.status === "FAILED",
                          "text-blue-700": exec.status === "RUNNING",
                          "text-purple-700":
                            exec.status === "INGESTION_COMPLETE",
                        })}
                      >
                        {exec.status.replace("_", " ")}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(exec.startedAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {exec.totalJobsReceived}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                    {getDuration(exec.startedAt, exec.finishedAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {exec.totalJobsAccepted > 0 ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        {exec.totalJobsAccepted}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">-</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="text-center pt-2">
        <button
          onClick={() => dispatch(fetchRecentExecutions(20))}
          className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
        >
          Load last 20 runs
        </button>
      </div>
    </div>
  );
};

export default ExecutionsList;
