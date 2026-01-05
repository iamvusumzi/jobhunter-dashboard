import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/axiosConfig";
import type { AIAnalysisConfig } from "../../../types/aiConfig";
import type { AxiosError } from "axios";

export const fetchAIConfig = createAsyncThunk<AIAnalysisConfig>(
  "aiConfig/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<AIAnalysisConfig>(
        "/api/v1/settings/ai-config"
      );
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error.response?.data?.message || "Failed to load AI config"
      );
    }
  }
);

export const updateAIConfig = createAsyncThunk<
  AIAnalysisConfig,
  AIAnalysisConfig
>("aiConfig/update", async (config, { rejectWithValue }) => {
  try {
    const response = await api.put<AIAnalysisConfig>(
      "/api/v1/settings/ai-config",
      config
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error.response?.data?.message || "Failed to save AI config"
    );
  }
});

interface AIConfigState {
  data: AIAnalysisConfig | null;
  loading: boolean;
  saving: boolean;
  error: string | null;
}

const initialState: AIConfigState = {
  data: null,
  loading: false,
  saving: false,
  error: null,
};

const aiConfigSlice = createSlice({
  name: "aiConfig",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAIConfig.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAIConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateAIConfig.pending, (state) => {
        state.saving = true;
      })
      .addCase(updateAIConfig.fulfilled, (state, action) => {
        state.saving = false;
        state.data = action.payload;
      });
  },
});

export default aiConfigSlice.reducer;
