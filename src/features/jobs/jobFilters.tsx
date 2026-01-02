import { useForm } from "react-hook-form";
import { X, Search as SearchIcon } from "lucide-react";
import type { RecruitmentStatus } from "../../types/job";

// The shape of data coming from this form
export interface FilterValues {
  status: RecruitmentStatus | "";
  search: string;
}

interface JobFiltersProps {
  onFilter: (values: FilterValues) => void;
  onClose: () => void;
  currentFilters: FilterValues;
}

const JobFilters = ({ onFilter, onClose, currentFilters }: JobFiltersProps) => {
  const { register, handleSubmit, reset } = useForm<FilterValues>({
    defaultValues: currentFilters,
  });

  const onSubmit = (data: FilterValues) => {
    onFilter(data);
  };

  const handleClear = () => {
    const emptyValues = { status: "" as const, search: "" };
    reset(emptyValues);
    onFilter(emptyValues);
  };

  return (
    <div className="bg-white border-b border-gray-200 p-4 mb-4 rounded-lg shadow-inner">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Input */}
          <div className="relative">
            <label className="block text-xs font-medium text-gray-500 mb-1 uppercase">
              Keywords
            </label>
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="React, Remote, Amazon..."
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                {...register("search")}
              />
            </div>
          </div>

          {/* Status Dropdown */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1 uppercase">
              Pipeline Status
            </label>
            <select
              className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
              {...register("status")}
            >
              <option value="">All Jobs</option>
              <option value="NEW_MATCH">New Match (Inbox)</option>
              <option value="SAVED">Saved</option>
              <option value="APPLIED">Applied</option>
              <option value="INTERVIEWING">Interviewing</option>
              <option value="OFFER">Offer</option>
              <option value="AUTO_REJECTED">Auto Rejected</option>
              <option value="REJECTED_BY_COMPANY">Rejected by Company</option>
              <option value="REJECTED_BY_USER">Dismissed by Me</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex items-end gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm"
            >
              Apply Filters
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Close Button (Mobile friendly) */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
};

export default JobFilters;
