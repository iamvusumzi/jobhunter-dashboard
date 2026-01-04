import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosConfig";
import type { AxiosError } from "axios";
import type {
  ExecutionResponse,
  ExecutionDetail,
} from "../../types/observations";

// --- Thunks ---

export const fetchRecentExecutions = createAsyncThunk<
  ExecutionResponse[],
  number | undefined
>("executions/fetchRecent", async (limit = 10, { rejectWithValue }) => {
  try {
    // Returns an Array [], not a Page object
    const response = await api.get<ExecutionResponse[]>(
      "/api/v1/observation/executions",
      {
        params: { limit },
      }
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch history"
    );
  }
});

// Thunk: Fetch Single Detail
export const fetchExecutionById = createAsyncThunk<ExecutionDetail, string>(
  "executions/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get<ExecutionDetail>(
        `/api/v1/observation/executions/${id}`
      );
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch execution details"
      );
    }
  }
);

// --- Slice ---
interface ExecutionsState {
  items: ExecutionResponse[];
  selectedExecution: ExecutionDetail | null;
  loading: boolean;
  error: string | null;
}

const initialState: ExecutionsState = {
  items: [],
  selectedExecution: null,
  loading: false,
  error: null,
};

const executionsSlice = createSlice({
  name: "executions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecentExecutions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecentExecutions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchRecentExecutions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchExecutionById.pending, (state) => {
        state.loading = true;
        state.selectedExecution = null;
        state.error = null;
      })
      .addCase(fetchExecutionById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedExecution = action.payload;
      })
      .addCase(fetchExecutionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default executionsSlice.reducer;
