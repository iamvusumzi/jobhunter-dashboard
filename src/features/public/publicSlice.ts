import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import type { RootState } from "../../store";

export interface PublicStats {
  totalJobsAnalysed: number;
  lastRunTime: string;
  systemStatus: "OPERATIONAL" | "DEGRADED" | "MAINTENANCE";
  version: string;
  matchRate: number;
}

export const fetchPublicStats = createAsyncThunk<PublicStats>(
  "public/fetchStats",
  async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";
      const response = await axios.get<PublicStats>(
        `${baseUrl}/api/public/stats`
      );
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      console.warn("Public API offline, using fallback data", error.message);
      return {
        totalJobsAnalysed: 1240,
        lastRunTime: new Date().toISOString(),
        systemStatus: "OPERATIONAL",
        version: "v1.0.0",
        matchRate: 12.5,
      };
    }
  }
);

interface PublicState {
  stats: PublicStats | null;
  loading: boolean;
}

const initialState: PublicState = {
  stats: null,
  loading: false,
};

const publicSlice = createSlice({
  name: "public",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublicStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPublicStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchPublicStats.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const selectPublicStats = (state: RootState) => state.public;
export default publicSlice.reducer;
