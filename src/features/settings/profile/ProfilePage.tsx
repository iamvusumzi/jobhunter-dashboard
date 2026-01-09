import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchProfile, updateProfile } from "./profileSlice";
import type {
  CandidateProfile,
  ProfileFormValues,
} from "../../../types/profile";
import { Save, User, FileText, Briefcase, Loader2, Award } from "lucide-react";
import Loader from "../../../components/ui/Loader";

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const {
    data: profile,
    loading,
    saving,
  } = useAppSelector((state) => state.profile);

  const { register, handleSubmit, reset } = useForm<ProfileFormValues>();

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  // Populate form when data arrives
  useEffect(() => {
    if (profile) {
      reset({
        bio: profile.bio || "",
        rawResume: profile.rawResume || "",
        experienceSummary: profile.experienceSummary || "",
        topSkills: profile.topSkills ? profile.topSkills.join(", ") : "",
      });
    }
  }, [profile, reset]);

  const onSubmit = (values: ProfileFormValues) => {
    const payload: CandidateProfile = {
      id: profile?.id, // Preserve ID if it exists
      bio: values.bio,
      rawResume: values.rawResume,
      experienceSummary: values.experienceSummary,
      topSkills: values.topSkills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    dispatch(updateProfile(payload));
  };

  if (loading && !profile) {
    return <Loader message="Loading profile..." />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Candidate Profile
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            This information is injected into the AI prompt to evaluate job fit.
          </p>
        </div>
        <button
          onClick={handleSubmit(onSubmit)}
          disabled={saving}
          className="flex items-center px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Save Changes
        </button>
      </div>

      <form className="space-y-6">
        {/* Section 1: Introduction */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4 text-gray-900 font-semibold border-b border-gray-100 pb-2">
            <User className="h-5 w-5 text-blue-600" />
            <h2>Professional Identity</h2>
          </div>

          <div className="grid gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Short Bio
              </label>
              <p className="text-xs text-gray-500 mb-2">
                How should the AI introduce you?
              </p>
              <textarea
                {...register("bio")}
                rows={3}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-3"
                placeholder="I am a Senior Backend Engineer with 6 years of experience in Java and AWS..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Top Skills (Comma Separated)
              </label>
              <div className="relative">
                <Award className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  {...register("topSkills")}
                  className="w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-3"
                  placeholder="Java, Spring Boot, React, AWS Lambda, PostgreSQL"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Resume Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4 text-gray-900 font-semibold border-b border-gray-100 pb-2">
            <FileText className="h-5 w-5 text-purple-600" />
            <h2>Resume Context</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Experience Summary
              </label>
              <textarea
                {...register("experienceSummary")}
                rows={4}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-3"
                placeholder="Summarize your career highlights. E.g., 'Led a team of 5 devs to migrate a monolith to microservices...'"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Raw Resume Text
              </label>
              <p className="text-xs text-gray-500 mb-2">
                Copy and paste the full text of your CV here. The AI uses this
                for deep comparison.
              </p>
              <div className="relative">
                <textarea
                  {...register("rawResume")}
                  rows={12}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-3 font-mono text-xs text-gray-600 leading-relaxed"
                  placeholder="[Paste parsed CV content here]"
                />
                <div className="absolute top-2 right-2">
                  <Briefcase className="h-5 w-5 text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
