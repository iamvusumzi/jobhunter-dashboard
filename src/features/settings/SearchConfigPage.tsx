import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchSearchConfigs,
  saveSearchConfig,
  deleteSearchConfig,
  toggleSearchStatus,
} from "./searchConfigSlice";
import type { SearchCriteria } from "../../types/settings";
import SearchConfigForm from "./SearchConfigForm";
import { Plus, Trash2, Edit2, Globe, Calendar, Ban } from "lucide-react";
import clsx from "clsx";
import Loader from "../../components/ui/Loader";

const SearchConfigPage = () => {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((state) => state.searchConfig);

  const [isEditing, setIsEditing] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState<SearchCriteria | null>(
    null
  );

  useEffect(() => {
    dispatch(fetchSearchConfigs());
  }, [dispatch]);

  const handleEdit = (config: SearchCriteria) => {
    setSelectedConfig(config);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setSelectedConfig(null);
    setIsEditing(true);
  };

  const handleSave = async (data: SearchCriteria) => {
    await dispatch(saveSearchConfig(data));
    setIsEditing(false);
    setSelectedConfig(null);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this rule?")) {
      dispatch(deleteSearchConfig(id));
    }
  };

  const handleToggle = (id: number, currentStatus: boolean) => {
    dispatch(toggleSearchStatus({ id, isActive: !currentStatus }));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Search Configuration
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage ingestion sources and filtering rules
          </p>
        </div>
        <button
          onClick={handleAddNew}
          disabled={isEditing}
          className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Rule
        </button>
      </div>

      {isEditing && (
        <SearchConfigForm
          initialData={selectedConfig}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      )}

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 gap-6">
        {loading && items.length === 0 ? (
          <Loader message="Loading search configurations..." />
        ) : (
          items.map((config) => (
            <div
              key={config.id}
              className={clsx(
                "bg-white rounded-xl shadow-sm border p-6 transition-all",
                config.isActive
                  ? "border-gray-200"
                  : "border-gray-200 opacity-60 bg-gray-50"
              )}
            >
              <div className="flex justify-between items-start">
                {/* Left Info */}
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {config.searchName}
                    </h3>
                    <span
                      className={clsx(
                        "px-2 py-0.5 rounded text-xs font-medium border",
                        config.isActive
                          ? "bg-green-100 text-green-700 border-green-200"
                          : "bg-gray-200 text-gray-600 border-gray-300"
                      )}
                    >
                      {config.isActive ? "Active" : "Paused"}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Globe className="h-4 w-4 mr-1.5" />
                      {config.query} ({config.location})
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1.5" />
                      Max {config.maxDaysOld} days old
                    </span>
                  </div>

                  {/* Chips for Filters */}
                  <div className="mt-4 space-y-2">
                    {config.excludedKeywords.length > 0 && (
                      <div className="flex items-center gap-2 text-sm">
                        <Ban className="h-4 w-4 text-red-400" />
                        <span className="text-gray-500">Titles excluding:</span>
                        <div className="flex flex-wrap gap-1">
                          {config.excludedKeywords.map((k) => (
                            <span
                              key={k}
                              className="px-2 py-0.5 bg-red-50 text-red-700 rounded text-xs border border-red-100"
                            >
                              {k}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {config.excludedSkills.length > 0 && (
                      <div className="flex items-center gap-2 text-sm">
                        <Ban className="h-4 w-4 text-orange-400" />
                        <span className="text-gray-500">Skills excluding:</span>
                        <div className="flex flex-wrap gap-1">
                          {config.excludedSkills.map((k) => (
                            <span
                              key={k}
                              className="px-2 py-0.5 bg-orange-50 text-orange-700 rounded text-xs border border-orange-100"
                            >
                              {k}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggle(config.id!, config.isActive)}
                    className={clsx(
                      "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                      config.isActive ? "bg-green-500" : "bg-gray-200"
                    )}
                  >
                    <span
                      className={clsx(
                        "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                        config.isActive ? "translate-x-5" : "translate-x-0"
                      )}
                    />
                  </button>
                  <div className="h-6 w-px bg-gray-300 mx-2"></div>
                  <button
                    onClick={() => handleEdit(config)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(config.id!)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchConfigPage;
