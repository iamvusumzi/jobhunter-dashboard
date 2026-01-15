import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchJobById, reAnalyseJob, updateJobStatus } from "./jobsSlice";
import { showToast } from "../../components/ui/uiSlice";
import Loader from "../../components/ui/Loader";
import type { RecruitmentStatus } from "../../types/job";

import JobHeaderCard from "../../components/ui/JobHeaderCard";
import JobAnalysisCard from "../../components/ui/JobAnalysisCard";
import JobDescriptionCard from "../../components/ui/JobDescriptionCard";

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
    if (id) dispatch(fetchJobById(Number(id)));
  }, [dispatch, id]);

  const handleStatusChange = async (newStatus: RecruitmentStatus) => {
    if (!job) return;

    try {
      await dispatch(
        updateJobStatus({ id: job.id, status: newStatus })
      ).unwrap();
      dispatch(
        showToast({
          message: `Status updated to ${newStatus}`,
          type: "success",
        })
      );
    } catch (err) {
      dispatch(showToast({ message: err as string, type: "error" }));
    }
  };

  const handleReAnalyse = async () => {
    if (!job || !id) return;

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
  };

  if (loading && !job) return <Loader message="Loading job details..." />;

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
      <JobHeaderCard
        job={job}
        loading={loading}
        onBack={() => navigate("/app/jobs")}
        onStatusChange={handleStatusChange}
        onReAnalyse={handleReAnalyse}
      />

      {/* Mobile: AI first. Desktop: Description left, AI right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="order-1 lg:order-2 lg:col-span-1 space-y-6">
          <JobAnalysisCard analysisLog={job.analysisLog} />
        </div>

        <div className="order-2 lg:order-1 lg:col-span-2 space-y-6">
          <JobDescriptionCard description={job.description} />
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
