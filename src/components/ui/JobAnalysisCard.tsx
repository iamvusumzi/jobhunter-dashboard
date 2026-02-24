import { BrainCircuit } from "lucide-react";
import type { AnalysisLog } from "../../types/job";

interface JobAnalysisCardProps {
  analysisLog?: AnalysisLog | null;
}

const JobAnalysisCard = ({ analysisLog }: JobAnalysisCardProps) => {
  if (!analysisLog) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
        <p className="text-gray-500 mb-1">Analysis Pending or Failed</p>
        <p className="text-xs text-gray-400">
          Re-analyse to generate a refreshed score and rationale.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden">
      <div className="bg-blue-50/50 p-4 border-b border-blue-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-blue-600" />
          <span className="font-semibold text-blue-900">AI Analysis</span>
        </div>
        <div className="text-2xl font-bold text-blue-700">
          {analysisLog.compatibilityScore}%
        </div>
      </div>

      <div className="p-5 space-y-6">
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Rationale
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            {analysisLog.rationale}
          </p>
        </div>

        {analysisLog.skills && analysisLog.skills.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Missing Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {analysisLog.skills.map((skill) => (
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
  );
};

export default JobAnalysisCard;
