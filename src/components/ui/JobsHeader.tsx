import { Filter } from "lucide-react";

interface JobsHeaderProps {
  title: string;
  subtitle?: string;
  showFilters: boolean;
  hasActiveFilters: boolean;
  onToggleFilters: () => void;
}

const JobsHeader = ({
  title,
  subtitle,
  showFilters,
  hasActiveFilters,
  onToggleFilters,
}: JobsHeaderProps) => {
  const highlighted = showFilters || hasActiveFilters;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
      </div>

      <div className="flex w-full sm:w-auto items-center gap-2">
        <button
          onClick={onToggleFilters}
          className={`w-full sm:w-auto flex items-center justify-center px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
            highlighted
              ? "bg-blue-50 border-blue-200 text-blue-700"
              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {hasActiveFilters && (
            <span className="ml-2 flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default JobsHeader;
