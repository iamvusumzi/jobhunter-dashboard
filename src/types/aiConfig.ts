export interface AIAnalysisConfig {
  id: number;
  modelName: string;
  systemInstruction: string;
  userPromptTemplate: string;
  active: boolean;
}

export interface AIConfigFormValues {
  modelName: string;
  systemInstruction: string;
  userPromptTemplate: string;
}
