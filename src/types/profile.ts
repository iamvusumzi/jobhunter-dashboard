export interface CandidateProfile {
  id?: string;
  bio: string;
  rawResume: string;
  topSkills: string[];
  experienceSummary: string;
}

export interface ProfileFormValues {
  bio: string;
  rawResume: string;
  topSkills: string;
  experienceSummary: string;
}
