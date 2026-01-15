import { Link } from "react-router-dom";
import { ExternalLink, Loader2, Search } from "lucide-react";
import StatusBadge from "./StatusBadge";
import type { JobListing } from "../../types/job";

interface JobsTableProps {
  items: JobListing[];
  loading: boolean;
}

const formatDate = (value: string | Date) =>
  new Date(value).toLocaleDateString();

const JobsTable = ({ items, loading }: JobsTableProps) => {
  const isEmpty = items.length === 0 && !loading;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {loading && items.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
        </div>
      ) : (
        <>
          {/* MOBILE */}
          <div className="sm:hidden divide-y divide-gray-200">
            {items.map((job) => (
              <div key={job.id} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Link
                      to={`/app/jobs/${job.id}`}
                      className="block text-sm font-semibold text-gray-900 hover:text-blue-600 truncate"
                    >
                      {job.title}
                    </Link>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(job.createdAt)}
                    </p>
                  </div>

                  <a
                    href={job.url}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 text-gray-400 hover:text-blue-600 inline-flex p-2 -m-2"
                    aria-label="Open job link"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>

                <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm text-gray-900 truncate">
                      {job.company}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {job.location}
                    </p>
                  </div>

                  <div className="shrink-0">
                    <StatusBadge status={job.recruitmentStatus} />
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex items-center">
                    <div className="flex-1 bg-gray-200 rounded-full h-1.5 mr-2">
                      <div
                        className="bg-blue-600 h-1.5 rounded-full"
                        style={{ width: `${job.priorityScore}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600 font-medium w-12 text-right">
                      {job.priorityScore}%
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {isEmpty && (
              <div className="px-6 py-12 text-center text-gray-500">
                <div className="flex flex-col items-center">
                  <Search className="h-10 w-10 text-gray-300 mb-2" />
                  <p>
                    No jobs found. Adjust your filters or wait for the next
                    ingestion run.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* DESKTOP */}
          <div className="hidden sm:block">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Match
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {items.map((job) => (
                  <tr
                    key={job.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <Link
                          to={`/app/jobs/${job.id}`}
                          className="text-sm font-medium text-gray-900 hover:text-blue-600"
                        >
                          {job.title}
                        </Link>
                        <span className="text-xs text-gray-500">
                          {formatDate(job.createdAt)}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-900">
                          {job.company}
                        </span>
                        <span className="text-xs text-gray-500">
                          {job.location}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={job.recruitmentStatus} />
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-1.5 mr-2">
                          <div
                            className="bg-blue-600 h-1.5 rounded-full"
                            style={{ width: `${job.priorityScore}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600 font-medium">
                          {job.priorityScore}%
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-400 hover:text-blue-600 inline-block p-1"
                        aria-label="Open job link"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </td>
                  </tr>
                ))}

                {isEmpty && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center">
                        <Search className="h-10 w-10 text-gray-300 mb-2" />
                        <p>
                          No jobs found. Adjust your filters or wait for the
                          next ingestion run.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default JobsTable;
