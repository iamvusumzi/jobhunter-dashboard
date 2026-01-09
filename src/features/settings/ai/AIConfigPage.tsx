import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchAIConfig, updateAIConfig } from "./aiConfigSlice";
import type {
  AIConfigFormValues,
  AIAnalysisConfig,
} from "../../../types/aiConfig";
import { Save, Terminal, MessageSquare, Info } from "lucide-react";
import Loader from "../../../components/ui/Loader";

const AIConfigPage = () => {
  const dispatch = useAppDispatch();
  const {
    data: config,
    loading,
    saving,
  } = useAppSelector((state) => state.aiConfig);

  const { register, handleSubmit, reset } = useForm<AIConfigFormValues>();

  useEffect(() => {
    dispatch(fetchAIConfig());
  }, [dispatch]);

  useEffect(() => {
    if (config) {
      reset({
        modelName: config.modelName || "gemini-1.5-flash",
        systemInstruction: config.systemInstruction,
        userPromptTemplate: config.userPromptTemplate,
      });
    }
  }, [config, reset]);

  const onSubmit = (values: AIConfigFormValues) => {
    const payload: AIAnalysisConfig = {
      id: config?.id || 1, // Default singleton ID
      active: true,
      ...values,
    };
    dispatch(updateAIConfig(payload));
  };

  if (loading && !config)
    return <Loader message="Loading AI configuration..." />;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            AI Model Configuration
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Tune the persona and prompt engineering of your agent.
          </p>
        </div>
        <button
          onClick={handleSubmit(onSubmit)}
          disabled={saving}
          className="flex items-center px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm"
        >
          {saving ? (
            <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Update Configuration
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* 2. System Instruction */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4 text-gray-900 font-semibold border-b border-gray-100 pb-2">
              <Terminal className="h-5 w-5 text-gray-700" />
              <h2>System Instruction (Persona)</h2>
            </div>

            <p className="text-sm text-gray-500 mb-3">
              This defines the AI's behavior. Be specific about what "Success"
              looks like.
            </p>
            <textarea
              {...register("systemInstruction")}
              rows={6}
              className="w-full font-mono text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border bg-gray-50"
              placeholder="You are a strict technical recruiter. Your goal is to filter out jobs that match keywords but fail the depth test..."
            />
          </div>

          {/* 3. User Prompt Template */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4 text-gray-900 font-semibold border-b border-gray-100 pb-2">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              <h2>User Prompt Template</h2>
            </div>

            <textarea
              {...register("userPromptTemplate")}
              rows={10}
              className="w-full font-mono text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border bg-gray-50"
            />
          </div>
        </div>

        {/* Right Column: Cheat Sheet */}
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-100 p-5 rounded-xl">
            <div className="flex items-center gap-2 mb-3 text-blue-900 font-bold">
              <Info className="h-5 w-5" />
              Template Variables
            </div>
            <p className="text-xs text-blue-800 mb-4 leading-relaxed">
              Use these placeholders in your prompt template. The system will
              replace them with real data at runtime.
            </p>

            <ul className="space-y-3">
              <li className="bg-white p-2 rounded border border-blue-100">
                <code className="text-xs font-bold text-pink-600 block mb-1">
                  {"{{JOB_TITLE}}"}
                </code>
                <span className="text-xs text-gray-600">
                  The title from the listing source.
                </span>
              </li>
              <li className="bg-white p-2 rounded border border-blue-100">
                <code className="text-xs font-bold text-pink-600 block mb-1">
                  {"{{JOB_DESC}}"}
                </code>
                <span className="text-xs text-gray-600">
                  The full description text (HTML stripped).
                </span>
              </li>
              <li className="bg-white p-2 rounded border border-blue-100">
                <code className="text-xs font-bold text-pink-600 block mb-1">
                  {"{{BIO}}"}
                </code>
                <span className="text-xs text-gray-600">
                  Your short bio from the Profile settings.
                </span>
              </li>
              <li className="bg-white p-2 rounded border border-blue-100">
                <code className="text-xs font-bold text-pink-600 block mb-1">
                  {"{{RESUME}}"}
                </code>
                <span className="text-xs text-gray-600">
                  Your raw resume text.
                </span>
              </li>
              <li className="bg-white p-2 rounded border border-blue-100">
                <code className="text-xs font-bold text-pink-600 block mb-1">
                  {"{{EXCLUDED_SKILLS}}"}
                </code>
                <span className="text-xs text-gray-600">
                  The list of banned tech from Search Config.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIConfigPage;
