import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import api from "../../api/axiosConfig";
import type {
  JobListing,
  Page,
  JobFilters,
  JobDetail,
  RecruitmentStatus,
} from "../../types/job";
import type { AxiosError } from "axios";

// --- Thunks ---

export const fetchJobs = createAsyncThunk<Page<JobListing>, JobFilters>(
  "jobs/fetchAll",
  async (filters, { rejectWithValue }) => {
    try {
      // filters might be { status: 'APPLIED', page: 0 }
      // We pass them as query params: /api/v1/jobs?status=APPLIED&page=0
      const response = await api.get<Page<JobListing>>("/api/v1/jobs", {
        params: filters,
      });
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const message =
        error.response?.data?.message ||
        "Login failed. Please check your credentials.";
      return rejectWithValue(message);
    }
  }
);

export const fetchJobById = createAsyncThunk<JobDetail, number>(
  "jobs/fetchById",
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await api.get<JobDetail>(`/api/v1/jobs/${jobId}`);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const message =
        error.response?.data?.message || "Failed to fetch job details.";
      return rejectWithValue(message);
    }
  }
);

export const updateJobStatus = createAsyncThunk<
  JobListing,
  { id: number; status: RecruitmentStatus }
>("jobs/updateStatus", async ({ id, status }, { rejectWithValue }) => {
  try {
    const response = await api.patch<JobListing>(`/api/v1/jobs/${id}/status`, {
      status,
    });
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    const message =
      error.response?.data?.message || "Failed to update job status.";
    return rejectWithValue(message);
  }
});

// --- State ---

interface JobsState {
  items: JobListing[];
  selectedJob: JobDetail | null;
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    totalPages: number;
    totalElements: number;
  };
}

const initialState: JobsState = {
  items: [],
  selectedJob: null,
  loading: false,
  error: null,
  pagination: {
    page: 0,
    totalPages: 0,
    totalElements: 0,
  },
};

// --- Slice ---

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    // We might need to manually update a job's status locally after an edit
    updateJobLocal: (state, action: PayloadAction<Partial<JobListing>>) => {
      const index = state.items.findIndex((j) => j.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.content;
        state.pagination = {
          page: action.payload.number,
          totalPages: action.payload.totalPages,
          totalElements: action.payload.totalElements,
        };
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchJobById.pending, (state) => {
        state.loading = true;
        state.selectedJob = null; // Clear previous selection
        state.error = null;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedJob = action.payload;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Status
      .addCase(updateJobStatus.fulfilled, (state, action) => {
        // 1. Update the list if the job exists there
        const index = state.items.findIndex((j) => j.id === action.payload.id);
        if (index !== -1) {
          state.items[index].recruitmentStatus =
            action.payload.recruitmentStatus;
        }
        // 2. Update the selected job if we are looking at it
        if (state.selectedJob && state.selectedJob.id === action.payload.id) {
          state.selectedJob.recruitmentStatus =
            action.payload.recruitmentStatus;
        }
      });
  },
});

export const { updateJobLocal } = jobsSlice.actions;
export default jobsSlice.reducer;
