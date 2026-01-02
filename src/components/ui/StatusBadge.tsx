import clsx from "clsx";
import type { RecruitmentStatus, AnalysisStatus } from "../../types/job";

interface StatusBadgeProps {
  status: RecruitmentStatus | AnalysisStatus | string;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const styles: Record<string, string> = {
    // --- SYSTEM STATES ---
    INCOMING: "bg-gray-100 text-gray-600 border-gray-200", // Just arrived, processing
    AUTO_REJECTED:
      "bg-red-50 text-red-400 border-red-100 line-through decoration-red-300", // Dead

    // --- ACTION REQUIRED ---
    NEW_MATCH: "bg-blue-100 text-blue-700 border-blue-200 font-semibold", // "Inbox" - Look at me!

    // --- HUMAN PIPELINE ---
    SAVED: "bg-indigo-50 text-indigo-700 border-indigo-200", // Shortlisted
    APPLIED: "bg-yellow-50 text-yellow-700 border-yellow-200", // Waiting on them
    INTERVIEWING:
      "bg-purple-100 text-purple-700 border-purple-200 font-semibold", // Active engagement

    // --- OUTCOMES ---
    OFFER: "bg-green-100 text-green-800 border-green-200 font-bold", // Win
    REJECTED_BY_COMPANY: "bg-red-50 text-red-700 border-red-200", // Loss
    REJECTED_BY_USER: "bg-gray-100 text-gray-500 border-gray-200", // Not interested

    // --- ANALYSIS STATES (Fallback) ---
    PENDING: "bg-gray-50 text-gray-600",
    COMPLETED: "bg-green-50 text-green-600",
    FAILED: "bg-red-50 text-red-600",
  };

  const defaultStyle = "bg-gray-50 text-gray-600 border-gray-200";

  // Human-readable labels (optional transformations)
  const labels: Record<string, string> = {
    NEW_MATCH: "New Match",
    AUTO_REJECTED: "Auto Rejected",
    REJECTED_BY_USER: "Dismissed",
    REJECTED_BY_COMPANY: "Rejected",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        styles[status] || defaultStyle
      )}
    >
      {labels[status] || status}
    </span>
  );
};

export default StatusBadge;
