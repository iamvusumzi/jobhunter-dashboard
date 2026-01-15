import StatusBadge from "./StatusBadge";
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  MapPin,
  Building,
  RefreshCw,
} from "lucide-react";
import type { RecruitmentStatus } from "../../types/job";

type JobHeaderJob = {
  id: number;
  title: string;
  company: string;
  location: string;
  createdAt: string;
  url: string;
  recruitmentStatus: RecruitmentStatus;
};

interface JobHeaderCardProps {
  job: JobHeaderJob;
  loading: boolean;
  onBack: () => void;
  onStatusChange: (status: RecruitmentStatus) => void;
  onReAnalyse: () => void;
}

const JobHeaderCard = ({
  job,
  loading,
  onBack,
  onStatusChange,
  onReAnalyse,
}: JobHeaderCardProps) => {
  return (
    <>
      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Listings
      </button>

      {/* Header Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 wrap-break-word">
              {job.title}
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center">
                <Building className="h-4 w-4 mr-1.5 text-gray-400" />
                {job.company}
              </span>
              <span className="flex items-center">
                <MapPin className="h-4 w-4 mr-1.5 text-gray-400" />
                {job.location}
              </span>
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1.5 text-gray-400" />
                {new Date(job.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Mobile-friendly */}
          <div className="flex flex-col items-end gap-3 w-full md:w-auto">
            <StatusBadge status={job.recruitmentStatus} />

            <a
              href={job.url}
              target="_blank"
              rel="noreferrer"
              className="w-full md:w-auto inline-flex justify-center md:justify-start items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Original Post
            </a>
          </div>
        </div>

        {/* Action Bar */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3">
          <span className="text-sm font-medium text-gray-700 sm:mr-2">
            Move to:
          </span>

          <div className="flex flex-col sm:flex-row flex-wrap gap-2">
            <button
              onClick={() => onStatusChange("SAVED")}
              className="w-full sm:w-auto px-3 py-2 sm:py-1.5 text-sm font-medium text-indigo-700 bg-indigo-50 rounded-lg hover:bg-indigo-100"
            >
              Shortlist
            </button>

            <button
              onClick={() => onStatusChange("APPLIED")}
              className="w-full sm:w-auto px-3 py-2 sm:py-1.5 text-sm font-medium text-yellow-700 bg-yellow-50 rounded-lg hover:bg-yellow-100"
            >
              Applied
            </button>

            <button
              onClick={() => onStatusChange("REJECTED_BY_USER")}
              className="w-full sm:w-auto px-3 py-2 sm:py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Dismiss
            </button>
          </div>

          <div className="relative group sm:ml-auto">
            <button
              onClick={onReAnalyse}
              disabled={loading}
              className="w-full sm:w-auto inline-flex justify-center items-center px-3 py-2 sm:py-1.5 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50"
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
              />
              Re-analyse
            </button>

            {/* Avoid hover tooltips on touch devices */}
            <div className="hidden sm:block absolute bottom-full right-0 mb-2 w-56 px-2 py-1.5 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 text-center">
              Re-run AI analysis to refresh the compatibility score and
              rationale.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobHeaderCard;
