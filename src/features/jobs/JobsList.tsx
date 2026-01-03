import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchJobs } from "./jobsSlice";
import { Link } from "react-router-dom"; // Assuming react-router-dom is used
import StatusBadge from "../../components/ui/StatusBadge";
import JobFilters, { type FilterValues } from "./jobFilters";
import { ExternalLink, Search, Filter, Loader2 } from "lucide-react";
import type { RecruitmentStatus } from "../../types/job";

const JobsList = () => {
  const dispatch = useAppDispatch();
  const { items, loading, pagination } = useAppSelector((state) => state.jobs);
  const [showFilters, setShowFilters] = useState(false);

  const [activeFilters, setActiveFilters] = useState<FilterValues>({
    status: "" as RecruitmentStatus | "",
    search: "",
  });

  useEffect(() => {
    // Initial fetch
    dispatch(fetchJobs({ page: 0 }));
  }, [dispatch]);

  const handleFilterChange = (newFilters: FilterValues) => {
    setActiveFilters(newFilters);
    dispatch(
      fetchJobs({
        page: 0,
        status: newFilters.status || undefined,
        search: newFilters.search || undefined,
      })
    );
  };

  const handlePageChange = (newPage: number) => {
    dispatch(
      fetchJobs({
        page: newPage,
        status: activeFilters.status || undefined,
        search: activeFilters.search || undefined,
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. Page Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Listings</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your application pipeline
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Simple Search Input Placeholder */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              name="saerch"
              type="text"
              placeholder="Search jobs..."
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
              showFilters || activeFilters.status || activeFilters.search
                ? "bg-blue-50 border-blue-200 text-blue-700"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {/* Show a dot if filters are active */}
            {(activeFilters.status || activeFilters.search) && (
              <span className="ml-2 flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Conditionally Render Filters */}
      {showFilters && (
        <JobFilters
          onFilter={handleFilterChange}
          onClose={() => setShowFilters(false)}
          currentFilters={activeFilters}
        />
      )}

      {/* 2. Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading && items.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
          </div>
        ) : (
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
                <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                  {/* Title & Date */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col group">
                      <Link
                        to={`/app/jobs/${job.id}`}
                        className="text-sm font-medium text-gray-900 hover:text-blue-600"
                      >
                        <span>{job.title}</span>
                      </Link>
                      <span className="text-xs text-gray-500">
                        {new Date(job.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </td>

                  {/* Company & Location */}
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

                  {/* Status Badge */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={job.recruitmentStatus} />
                  </td>

                  {/* Priority / Match Score */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {/* Simple progress bar logic */}
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

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-400 hover:text-blue-600 inline-block p-1"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </td>
                </tr>
              ))}

              {/* Empty State */}
              {items.length === 0 && !loading && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center">
                      <Search className="h-10 w-10 text-gray-300 mb-2" />
                      <p>
                        No jobs found. Adjust your filters or wait for the next
                        ingestion run.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* 3. Pagination Footer (Simplified) */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-lg shadow-sm">
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing page{" "}
              <span className="font-medium">{pagination.page + 1}</span> of{" "}
              <span className="font-medium">{pagination.totalPages}</span>
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button
                onClick={() =>
                  handlePageChange(Math.max(0, pagination.page - 1))
                }
                disabled={pagination.page === 0}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page >= pagination.totalPages - 1}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsList;
