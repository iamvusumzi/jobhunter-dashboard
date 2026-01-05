export interface DashboardStats {
  newMatchesCount: number;
  totalActiveJobs: number;

  geminiRequestsToday: number;
  geminiDailyLimit: number;
  geminiTokenCountToday: number;

  pipelineStats: {
    totalFound: number;
    totalFiltered: number;
    totalAnalysed: number;
    totalAccepted: number;
    totalRejected: number;
  };

  avgCompatibilityScore: number;
  avgLatencyMs: number;
}
