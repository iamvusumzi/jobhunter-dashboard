import { Layers } from "lucide-react";
import clsx from "clsx";

type SourceLog = {
  sourceName: string;
  success: boolean;
  jobsFound: number;
  jobsFiltered: number;
  error?: string | null;
};

interface ExecutionSourceLogsProps {
  sourceLogs?: SourceLog[] | null;
}

const StatusPill = ({ success }: { success: boolean }) => {
  return (
    <span
      className={clsx(
        "inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border",
        success
          ? "bg-green-50 text-green-700 border-green-200"
          : "bg-red-50 text-red-700 border-red-200"
      )}
    >
      {success ? "Success" : "Failed"}
    </span>
  );
};

const ExecutionSourceLogs = ({ sourceLogs }: ExecutionSourceLogsProps) => {
  const hasLogs = Boolean(sourceLogs && sourceLogs.length > 0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center gap-2">
        <Layers className="h-4 w-4 text-gray-500" />
        <h3 className="font-semibold text-gray-900">Ingestion Source Logs</h3>
      </div>

      {/* MOBILE: cards */}
      <div className="sm:hidden divide-y divide-gray-200">
        {hasLogs ? (
          sourceLogs!.map((log, idx) => (
            <div key={idx} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {log.sourceName}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Message:{" "}
                    <span
                      className={clsx(
                        log.error ? "text-gray-700" : "text-gray-400"
                      )}
                    >
                      {log.error || "-"}
                    </span>
                  </p>
                </div>

                <div className="shrink-0">
                  <StatusPill success={log.success} />
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-500">Jobs Found</p>
                  <p className="text-sm font-mono text-gray-900">
                    {log.jobsFound}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Jobs Filtered</p>
                  <p className="text-sm font-mono text-gray-900">
                    {log.jobsFiltered}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="px-6 py-8 text-center text-gray-400 italic">
            No source logs available for this execution.
          </div>
        )}
      </div>

      {/* DESKTOP: table */}
      <div className="hidden sm:block">
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
            {hasLogs ? (
              sourceLogs!.map((log, idx) => (
                <tr key={idx} className="group hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {log.sourceName}
                  </td>
                  <td className="px-6 py-4">
                    <StatusPill success={log.success} />
                  </td>
                  <td className="px-6 py-4 text-gray-700 font-mono text-sm">
                    {log.jobsFound}
                  </td>
                  <td className="px-6 py-4 text-gray-700 font-mono text-sm">
                    {log.jobsFiltered}
                  </td>
                  <td
                    className="px-6 py-4 text-gray-500 text-sm max-w-md truncate"
                    title={log.error || ""}
                  >
                    {log.error || "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
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

export default ExecutionSourceLogs;
