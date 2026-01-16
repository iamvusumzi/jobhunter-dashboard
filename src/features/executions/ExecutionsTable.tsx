import { Loader2 } from "lucide-react";
import ExecutionStatusBadge from "./ExecutionStatus";
import type { ExecutionResponse } from "../../types/observations";
import { formatDateTimeSAST } from "../../utils/date";

interface ExecutionsTableProps {
  items: ExecutionResponse[];
  loading: boolean;
  getDuration: (start: string, end: string | null) => string;
  onSelectExecution: (id: number | string) => void;
}

const ExecutionsTable = ({
  items,
  loading,
  getDuration,
  onSelectExecution,
}: ExecutionsTableProps) => {
  const isEmpty = items.length === 0 && !loading;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {loading && items.length === 0 ? (
        <div className="py-12 text-center">
          <Loader2 className="h-8 w-8 text-blue-600 animate-spin mx-auto" />
        </div>
      ) : (
        <>
          {/* MOBILE: cards */}
          <div className="sm:hidden divide-y divide-gray-200">
            {items.map((exec) => (
              <button
                key={exec.id}
                onClick={() => onSelectExecution(exec.id)}
                className="w-full text-left p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <ExecutionStatusBadge status={exec.status} />
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {formatDateTimeSAST(exec.startedAt)}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500">Jobs Scanned</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {exec.totalJobsReceived}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="text-sm font-mono text-gray-700">
                      {getDuration(exec.startedAt, exec.finishedAt)}
                    </p>
                  </div>

                  <div className="col-span-2">
                    <p className="text-xs text-gray-500">Jobs Approved</p>
                    {exec.totalJobsAccepted > 0 ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        {exec.totalJobsAccepted}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">-</span>
                    )}
                  </div>
                </div>
              </button>
            ))}

            {isEmpty && (
              <div className="p-6 text-center text-gray-500 text-sm">
                No executions found yet.
              </div>
            )}
          </div>

          {/* DESKTOP: table */}
          <div className="hidden sm:block">
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
                {items.map((exec) => (
                  <tr
                    key={exec.id}
                    onClick={() => onSelectExecution(exec.id)}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <ExecutionStatusBadge status={exec.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDateTimeSAST(exec.startedAt)}
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
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ExecutionsTable;
