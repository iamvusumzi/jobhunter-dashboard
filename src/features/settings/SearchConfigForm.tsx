import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { SearchCriteria, SearchCriteriaForm } from "../../types/settings";
import { X } from "lucide-react";

interface Props {
  initialData?: SearchCriteria | null;
  onSave: (data: SearchCriteria) => void;
  onCancel: () => void;
}

const SearchConfigForm = ({ initialData, onSave, onCancel }: Props) => {
  const { register, handleSubmit, reset } = useForm<SearchCriteriaForm>();

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        // Convert Arrays to Comma-Separated Strings for editing
        excludedKeywords: initialData.excludedKeywords.join(", "),
        excludedSkills: initialData.excludedSkills.join(", "),
      });
    } else {
      reset({
        searchName: "",
        query: "",
        location: "Remote",
        excludedKeywords: "",
        excludedSkills: "",
        maxDaysOld: 14,
        id: undefined,
      });
    }
  }, [initialData, reset]);

  const onSubmit = (data: SearchCriteriaForm) => {
    // Convert Strings back to Arrays
    const payload: SearchCriteria = {
      ...data,
      id: initialData?.id,
      isActive: initialData?.isActive ?? true,
      excludedKeywords: data.excludedKeywords
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      excludedSkills: data.excludedSkills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    onSave(payload);
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6 relative">
      <button
        onClick={onCancel}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
      >
        <X className="h-5 w-5" />
      </button>

      <h3 className="text-lg font-medium text-gray-900 mb-4">
        {initialData ? "Edit Search Rule" : "Add New Search Rule"}
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rule Name
            </label>
            <input
              {...register("searchName", { required: true })}
              placeholder="e.g. Remote Java Jobs"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Max Days Old
            </label>
            <input
              type="number"
              {...register("maxDaysOld", { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Query (What to type in search bar)
            </label>
            <input
              {...register("query", { required: true })}
              placeholder="e.g. Software Engineer"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              {...register("location", { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Excluded Titles (Scraper Filter)
            </label>
            <input
              {...register("excludedKeywords")}
              placeholder="Manager, Intern, Senior..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
            />
            <p className="mt-1 text-xs text-gray-500">
              Jobs with these words in the title will be skipped immediately.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Excluded Skills (AI Filter)
            </label>
            <input
              {...register("excludedSkills")}
              placeholder="PHP, WordPress, C++..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
            />
            <p className="mt-1 text-xs text-gray-500">
              The AI will reject jobs requiring these technologies.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Save Rule
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchConfigForm;
