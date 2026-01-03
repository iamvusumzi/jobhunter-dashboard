import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchJobById, reAnalyseJob, updateJobStatus } from "./jobsSlice";
import { showToast } from "../../components/ui/uiSlice";
import StatusBadge from "../../components/ui/StatusBadge";
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  MapPin,
  Building,
  BrainCircuit,
  RefreshCw,
} from "lucide-react";
import { type RecruitmentStatus } from "../../types/job";

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    selectedJob: job,
    loading,
    error,
  } = useAppSelector((state) => state.jobs);

  useEffect(() => {
    if (id) {
      dispatch(fetchJobById(Number(id)));
    }
  }, [dispatch, id]);

  const handleStatusChange = async (newStatus: RecruitmentStatus) => {
    if (job) {
      console.log("Changing status to:", newStatus);
      try {
        await dispatch(
          updateJobStatus({ id: job.id, status: newStatus })
        ).unwrap();
        console.log("Status updated successfully");
        dispatch(
          showToast({
            message: `Status updated to ${newStatus}`,
            type: "success",
          })
        );
      } catch (err) {
        dispatch(showToast({ message: err as string, type: "error" }));
      }
    }
  };

  const handleReAnalyse = async () => {
    if (job) {
      try {
        await dispatch(reAnalyseJob(Number(id))).unwrap();
        dispatch(
          showToast({
            message: "Job analysis queued successfully!",
            type: "success",
          })
        );
      } catch (err) {
        dispatch(showToast({ message: err as string, type: "error" }));
      }
    }
  };

  if (loading && !job) {
    return (
      <div className="p-8 text-center text-gray-500">
        Loading job details...
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600 mb-4">{error || "Job not found"}</p>
        <button
          onClick={() => navigate("/app/jobs")}
          className="text-blue-600 hover:underline"
        >
          Back to Jobs
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* 1. Header & Navigation */}
      <button
        onClick={() => navigate("/app/jobs")}
        className="flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Listings
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
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

          <div className="flex flex-col items-end gap-3">
            <StatusBadge status={job.recruitmentStatus} />
            <a
              href={job.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Original Post
            </a>
          </div>
        </div>

        {/* Action Bar: Quick Status Changes */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-gray-700 mr-2">
            Move to:
          </span>

          <button
            onClick={() => handleStatusChange("SAVED")}
            className="px-3 py-1.5 text-sm font-medium text-indigo-700 bg-indigo-50 rounded-lg hover:bg-indigo-100"
          >
            Shortlist
          </button>

          <button
            onClick={() => handleStatusChange("APPLIED")}
            className="px-3 py-1.5 text-sm font-medium text-yellow-700 bg-yellow-50 rounded-lg hover:bg-yellow-100"
          >
            Applied
          </button>

          <button
            onClick={() => handleStatusChange("REJECTED_BY_USER")}
            className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Dismiss
          </button>

          <div className="relative group sm:ml-auto">
            <button
              onClick={handleReAnalyse}
              disabled={loading}
              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50"
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
              />
              Re-analyse
            </button>
            <div className="absolute bottom-full right-0 mb-2 w-48 px-2 py-1.5 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 text-center">
              Re-run AI analysis to refresh the compatibility score and
              rationale.
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2. Left Column: Job Description */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Description
            </h2>
            <div className="prose prose-sm max-w-none text-gray-600">
              {/* Ideally use a Markdown parser here later */}
              {job.description ? (
                <p className="whitespace-pre-wrap">{job.description}</p>
              ) : (
                <p className="italic text-gray-400">
                  No description available.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 3. Right Column: AI Analysis */}
        <div className="space-y-6">
          {job.analysisLog ? (
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden">
              <div className="bg-blue-50/50 p-4 border-b border-blue-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BrainCircuit className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold text-blue-900">
                    AI Analysis
                  </span>
                </div>
                <div className="text-2xl font-bold text-blue-700">
                  {job.analysisLog.compatibilityScore}%
                </div>
              </div>

              <div className="p-5 space-y-6">
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Rationale
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {job.analysisLog.rationale}
                  </p>
                </div>

                {job.analysisLog.skills &&
                  job.analysisLog.skills.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Key Skills Found
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {job.analysisLog.skills.map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <p className="text-gray-500 mb-4">Analysis Pending or Failed</p>
              {/* Future: Add 'Re-run Analysis' button here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
