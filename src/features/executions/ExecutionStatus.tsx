import { CheckCircle, XCircle, Loader2, Database, Clock } from "lucide-react";
import clsx from "clsx";
import type { ExecutionStatus } from "../../types/observations";

interface ExecutionStatusProps {
  status: ExecutionStatus;
}

const ExecutionStatusBadge = ({ status }: ExecutionStatusProps) => {
  const Icon = (() => {
    switch (status) {
      case "COMPLETED":
        return CheckCircle;
      case "FAILED":
        return XCircle;
      case "RUNNING":
        return Loader2;
      case "INGESTION_COMPLETE":
        return Database;
      default:
        return Clock;
    }
  })();

  const iconClass = clsx("h-5 w-5", {
    "text-green-500": status === "COMPLETED",
    "text-red-500": status === "FAILED",
    "text-blue-500 animate-spin": status === "RUNNING",
    "text-purple-500": status === "INGESTION_COMPLETE",
    "text-gray-400":
      status !== "COMPLETED" &&
      status !== "FAILED" &&
      status !== "RUNNING" &&
      status !== "INGESTION_COMPLETE",
  });

  const textClass = clsx("ml-2 text-sm font-medium", {
    "text-green-700": status === "COMPLETED",
    "text-red-700": status === "FAILED",
    "text-blue-700": status === "RUNNING",
    "text-purple-700": status === "INGESTION_COMPLETE",
    "text-gray-600":
      status !== "COMPLETED" &&
      status !== "FAILED" &&
      status !== "RUNNING" &&
      status !== "INGESTION_COMPLETE",
  });

  return (
    <div className="flex items-center">
      <Icon className={iconClass} />
      <span className={textClass}>{status.replace("_", " ")}</span>
    </div>
  );
};

export default ExecutionStatusBadge;
