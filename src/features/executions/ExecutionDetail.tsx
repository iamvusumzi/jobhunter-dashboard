import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchExecutionById } from "./executionsSlice";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Coins,
  Activity,
  Layers,
} from "lucide-react";
import clsx from "clsx";
import MetricCard from "../../components/ui/MetricCard";
import Loader from "../../components/ui/Loader";

const ExecutionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    selectedExecution: exec,
    loading,
    error,
  } = useAppSelector((state) => state.executions);

  useEffect(() => {
    if (id) {
      dispatch(fetchExecutionById(id));
    }
  }, [dispatch, id]);

  if (loading && !exec) {
    return <Loader message="Loading execution details..." />;
  }

  if (error || !exec) {
    return (
      <div className="p-12 text-center text-red-500">
        <p>Error loading execution details: {error || "Not found"}</p>
        <button
          onClick={() => navigate("/app/executions")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Back to Executions
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* 1. Header & Navigation */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/app/executions")}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Execution Report</h1>
          <p className="text-gray-500 text-sm flex items-center gap-2">
            ID:{" "}
            <span className="font-mono text-xs bg-gray-100 px-1 rounded">
              {exec.id.substring(0, 8)}...
            </span>
            <span className="text-gray-300">•</span>
            {new Date(exec.startedAt).toLocaleString()}
          </p>
        </div>

        {/* Status Badge */}
        <div
          className={clsx(
            "ml-auto px-4 py-1.5 rounded-full text-sm font-bold border flex items-center shadow-sm",
            {
              "bg-green-50 text-green-700 border-green-200":
                exec.status === "COMPLETED",
              "bg-blue-50 text-blue-700 border-blue-200":
                exec.status === "RUNNING",
              "bg-purple-50 text-purple-700 border-purple-200":
                exec.status === "INGESTION_COMPLETE",
              "bg-red-50 text-red-700 border-red-200": exec.status === "FAILED",
            }
          )}
        >
          {exec.status.replace("_", " ")}
        </div>
      </div>

      {/* 2. Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Outcome: Matches */}
        <MetricCard
          title="New Matches"
          value={exec.totalJobsAccepted || 0}
          icon={CheckCircle}
          color="bg-green-500"
          subtext={`${exec.jobsRejected} Auto-Rejected`}
        />

        {/* Efficiency: Analysis */}
        <MetricCard
          title="Analyzed"
          value={exec.jobsAnalysed}
          icon={Activity}
          color="bg-blue-500"
          subtext={`${exec.jobsSkipped} Skipped (Duplicates)`}
        />

        {/* Cost: Tokens */}
        <MetricCard
          title="Token Usage"
          value={exec.totalTokensUsed?.toLocaleString() || "0"}
          icon={Coins}
          color="bg-amber-500"
          subtext="Gemini API Cost"
        />

        {/* Reliability: Failures */}
        <MetricCard
          title="Errors"
          value={exec.jobsFailed}
          icon={XCircle}
          color={exec.jobsFailed > 0 ? "bg-red-500" : "bg-gray-400"}
          subtext="Processing Crashes"
        />
      </div>

      {/* 3. Source Logs Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center gap-2">
          <Layers className="h-4 w-4 text-gray-500" />
          <h3 className="font-semibold text-gray-900">Ingestion Source Logs</h3>
        </div>

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Source
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Jobs Found
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Jobs Filtered
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Message
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {exec.sourceLogs && exec.sourceLogs.length > 0 ? (
              exec.sourceLogs.map((log, idx) => (
                <tr key={idx} className="group hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {log.sourceName}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={clsx(
                        "inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border",
                        {
                          "bg-green-50 text-green-700 border-green-200":
                            log.success,
                          "bg-red-50 text-red-700 border-red-200": !log.success,
                          "bg-yellow-50 text-yellow-700 border-yellow-200":
                            log.success === false,
                        }
                      )}
                    >
                      {log.success ? "Success" : "Failed"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700 font-mono text-sm">
                    {log.jobsFound}
                  </td>
                  <td className="px-6 py-4 text-gray-700 font-mono text-sm">
                    {log.jobsFiltered}
                  </td>
                  <td
                    className="px-6 py-4 text-gray-500 text-sm max-w-md truncate"
                    title={log.error}
                  >
                    {log.error || "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-8 text-center text-gray-400 italic"
                >
                  No source logs available for this execution.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExecutionDetail;
