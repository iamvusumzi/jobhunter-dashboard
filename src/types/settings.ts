export interface SearchCriteria {
  id?: number; // Optional for new items
  searchName: string;
  query: string;
  location: string;
  excludedKeywords: string[]; // "Scraper Filters"
  excludedSkills: string[]; // "AI Filters"
  maxDaysOld: number;
  isActive: boolean;
}

// Helper for the form (since inputs return strings)
export interface SearchCriteriaForm {
  id?: number;
  searchName: string;
  query: string;
  location: string;
  excludedKeywords: string; // "Manager, Intern" (Comma separated)
  excludedSkills: string; // "Angular, C#" (Comma separated)
  maxDaysOld: number;
}
