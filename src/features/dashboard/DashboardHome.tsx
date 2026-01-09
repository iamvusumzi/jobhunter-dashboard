import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchDashboardStats } from "./dashboardSlice";
import {
  Briefcase,
  CheckCircle,
  Zap,
  BrainCircuit,
  Filter,
  Clock,
} from "lucide-react";
import StatCard from "../../components/ui/StatsCard";
import ProgressBar from "../../components/ui/ProgressBar";
import Loader from "../../components/ui/Loader";

const DashboardHome = () => {
  const dispatch = useAppDispatch();
  const { stats, loading } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  if (loading && !stats)
    return <Loader message="Loading dashboard statistics..." />;
  if (!stats) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="New Matches"
          value={stats.newMatchesCount}
          icon={Briefcase}
          color="bg-blue-600"
          subtext="Jobs waiting for review"
        />

        <StatCard
          title="Avg Compatibility"
          value={`${stats.avgCompatibilityScore.toFixed(2)}%`}
          icon={CheckCircle}
          color={
            stats.avgCompatibilityScore > 70 ? "bg-green-500" : "bg-yellow-500"
          }
          subtext="Match quality trend"
        />

        <StatCard
          title="Tokens Today"
          value={(stats.geminiTokenCountToday / 1000).toFixed(1) + "k"}
          icon={Zap}
          color="bg-purple-500"
          subtext="Gemini consumption"
        />

        <StatCard
          title="Avg Latency"
          value={`${(stats.avgLatencyMs / 1000).toFixed(1)}s`}
          icon={Clock}
          color="bg-gray-500"
          subtext="Per job analysis"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-6">
            <Filter className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-bold text-gray-900">
              Pipeline Efficiency (Last 24h)
            </h2>
          </div>

          <div className="space-y-5">
            <div className="relative">
              <div className="flex justify-between text-sm font-medium mb-1">
                <span>Jobs Scraped</span>
                <span>{stats.pipelineStats.totalFound}</span>
              </div>
              <div className="w-full bg-gray-100 h-8 rounded-md overflow-hidden relative">
                <div className="bg-gray-300 h-full w-full" />
              </div>
            </div>

            <div className="relative pl-4">
              <div className="flex justify-between text-sm font-medium mb-1">
                <span className="text-gray-600">Passed Keyword Filter</span>
                <span>
                  {stats.pipelineStats.totalFound -
                    stats.pipelineStats.totalFiltered}
                </span>
              </div>
              <div className="w-full bg-gray-100 h-8 rounded-md overflow-hidden relative">
                <div
                  className="bg-blue-300 h-full transition-all duration-500"
                  style={{
                    width: `${
                      ((stats.pipelineStats.totalFound -
                        stats.pipelineStats.totalFiltered) /
                        (stats.pipelineStats.totalFound || 1)) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>

            <div className="relative pl-8">
              <div className="flex justify-between text-sm font-medium mb-1">
                <span className="text-blue-700">Analyzed by AI</span>
                <span>{stats.pipelineStats.totalAnalysed}</span>
              </div>
              <div className="w-full bg-gray-100 h-8 rounded-md overflow-hidden relative">
                <div
                  className="bg-blue-500 h-full transition-all duration-500"
                  style={{
                    width: `${
                      (stats.pipelineStats.totalAnalysed /
                        (stats.pipelineStats.totalFound || 1)) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>

            <div className="relative pl-12">
              <div className="flex justify-between text-sm font-medium mb-1">
                <span className="text-green-700 font-bold">New Matches</span>
                <span>{stats.pipelineStats.totalAccepted}</span>
              </div>
              <div className="w-full bg-gray-100 h-8 rounded-md overflow-hidden relative">
                <div
                  className="bg-green-500 h-full transition-all duration-500"
                  style={{
                    width: `${
                      (stats.pipelineStats.totalAccepted /
                        (stats.pipelineStats.totalFound || 1)) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 text-xs text-gray-500 text-center">
            Allows you to visualize where jobs are being dropped. If "Passed
            Keyword Filter" is too low, your Search Config scraper settings are
            too strict.
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BrainCircuit className="h-5 w-5 text-purple-600" />
              <h2 className="text-lg font-bold text-gray-900">Gemini Quota</h2>
            </div>
            <p className="text-sm text-gray-500">
              Usage tracking for the current 24-hour window. Exceeding limits
              will pause ingestion.
            </p>

            <div className="mt-8 space-y-6">
              <ProgressBar
                label="Daily Requests"
                current={stats.geminiRequestsToday}
                max={stats.geminiDailyLimit}
                colorClass={
                  stats.geminiRequestsToday > stats.geminiDailyLimit * 0.9
                    ? "bg-red-500"
                    : "bg-purple-500"
                }
              />

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500 uppercase">
                    System Status
                  </span>
                  {stats.geminiRequestsToday < stats.geminiDailyLimit ? (
                    <span className="flex items-center text-xs font-bold text-green-600">
                      <div className="h-2 w-2 bg-green-500 rounded-full mr-1 animate-pulse" />
                      Operational
                    </span>
                  ) : (
                    <span className="flex items-center text-xs font-bold text-red-600">
                      <div className="h-2 w-2 bg-red-500 rounded-full mr-1" />
                      Paused
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
