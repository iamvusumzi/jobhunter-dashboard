export type RecruitmentStatus =
  | "INCOMING"
  | "AUTO_REJECTED"
  | "NEW_MATCH"
  | "SAVED"
  | "APPLIED"
  | "INTERVIEWING"
  | "OFFER"
  | "REJECTED_BY_USER"
  | "REJECTED_BY_COMPANY";
export type AnalysisStatus = "PENDING" | "COMPLETED" | "FAILED";

export interface JobListing {
  id: number; // UUID
  title: string;
  company: string;
  location: string;
  url: string;
  source: string;
  recruitmentStatus: RecruitmentStatus;
  analysisStatus: AnalysisStatus;
  priorityScore?: number; // 0-100
  createdAt: string; // ISO Date
}

export interface AnalysisLog {
  compatibilityScore: number; // 0-100
  rationale: string;
  skills: string[];
  modelVersion: string;
  analyzedAt: string; // ISO Date
}

export interface JobDetail extends JobListing {
  description: string;
  analysisLog?: AnalysisLog;
}

export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number; // Current Page (0-indexed)
  size: number;
}

export interface JobFilters {
  status?: RecruitmentStatus;
  search?: string;
  page?: number;
}
