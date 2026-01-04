export type ExecutionStatus =
  | "RUNNING"
  | "INGESTION_COMPLETE"
  | "COMPLETED"
  | "FAILED";

export interface ExecutionResponse {
  id: string;
  status: ExecutionStatus;
  startedAt: string;
  finishedAt: string | null;
  totalJobsReceived: number;
  totalJobsAccepted: number;
}

export interface SourceLog {
  sourceName: string;
  jobsFound: number;
  jobsFiltered: number;
  success: boolean;
  error?: string;
}

export interface ExecutionDetail extends ExecutionResponse {
  jobsSkipped: number;
  jobsAnalysed: number;
  jobsRejected: number;
  jobsFailed: number;
  totalTokensUsed: number;
  searchTerm: string;
  sourceLogs: SourceLog[];
  failureReason?: string;
}
