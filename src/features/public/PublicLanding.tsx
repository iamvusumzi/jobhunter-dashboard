import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchPublicStats, selectPublicStats } from "./publicSlice";
import {
  Activity,
  LogIn,
  GitBranch,
  Database,
  ShieldCheck,
  Bot,
  Cpu,
} from "lucide-react";
import StatBox from "../../components/ui/StatBox";

const PublicLanding = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { stats, loading } = useAppSelector(selectPublicStats);

  useEffect(() => {
    dispatch(fetchPublicStats());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* 1. Navbar */}
      <nav className="w-full bg-white/70 backdrop-blur-md border-b border-gray-200 fixed top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900 tracking-tight">
                JobHunter
              </span>
            </div>
            <button
              onClick={() => navigate("/login")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gray-900 hover:bg-gray-800 transition-colors shadow-sm"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Console Login
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wide mb-6">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
              System Operational • {stats?.version || "v1.0.0"}
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
              Automated Intelligence for{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
                Career Mobility
              </span>
              .
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              An autonomous orchestration engine that ingests job listings from
              across the web, uses LLMs to analyze compatibility against my
              resume, and curates a high-signal pipeline.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() =>
                  window.open("https://github.com/iamvusumzi", "_blank")
                }
                className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors flex items-center shadow-sm"
              >
                <GitBranch className="h-5 w-5 mr-2" />
                View Architecture
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-full bg-linear-to-r from-blue-200/30 to-purple-200/30 blur-3xl rounded-full -z-10" />

            <StatBox
              label="Jobs Analyzed"
              value={stats?.totalJobsAnalysed?.toLocaleString()}
              icon={Database}
              color="bg-blue-500"
              loading={loading}
            />
            <StatBox
              label="Match Rate"
              value={
                stats?.matchRate !== undefined
                  ? `${stats.matchRate.toFixed(2)}%`
                  : undefined
              }
              icon={ShieldCheck}
              color="bg-green-500"
              loading={loading}
            />
            <StatBox
              label="AI Model"
              value="Gemini 2.5"
              icon={Bot}
              color="bg-purple-500"
              loading={loading}
            />
            <StatBox
              label="Last Run"
              value={
                stats?.lastRunTime
                  ? new Date(stats.lastRunTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : undefined
              }
              icon={Activity}
              color="bg-orange-500"
              loading={loading}
            />
          </div>

          <div className="border-t border-gray-200 pt-24">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">
              The Pipeline Architecture
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              <div className="hidden md:block absolute top-12 left-1/3 w-1/3 h-0.5 bg-linear-to-r from-gray-200 to-gray-200 border-t-2 border-dashed border-gray-300 z-0" />

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="h-24 w-24 bg-white rounded-2xl border border-gray-200 shadow-sm flex items-center justify-center mb-6">
                  <Database className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  1. Serverless Ingestion
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Python scripts running on AWS Lambda scrape multiple sources
                  (Adzuna, Google Jobs) and normalize data into a structured
                  format.
                </p>
              </div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="h-24 w-24 bg-white rounded-2xl border border-blue-100 shadow-lg shadow-blue-100 flex items-center justify-center mb-6">
                  <Bot className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  2. Cognitive Analysis
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  A Spring Boot service dispatches jobs to Gemini 2.5 for
                  analysis. The AI compares skills, seniority, and domain
                  against my specific profile.
                </p>
              </div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="h-24 w-24 bg-white rounded-2xl border border-gray-200 shadow-sm flex items-center justify-center mb-6">
                  <Cpu className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  3. Decision Engine
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Jobs scoring &gt;75% are flagged for review. Rejections are
                  categorized. The system learns from my manual feedback.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-gray-400" />
            <span className="font-semibold text-gray-500">
              JobHunter System
            </span>
          </div>
          <div className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Vusumzi Msengana. All rights
            reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLanding;
