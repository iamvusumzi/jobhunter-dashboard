import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosConfig";
import { type SearchCriteria } from "../../types/settings";
import type { AxiosError } from "axios";

// --- Thunks ---

export const fetchSearchConfigs = createAsyncThunk<SearchCriteria[]>(
  "searchConfig/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<SearchCriteria[]>("/api/v1/config/search");
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch configs"
      );
    }
  }
);

export const saveSearchConfig = createAsyncThunk<
  SearchCriteria,
  SearchCriteria
>("searchConfig/save", async (config, { rejectWithValue }) => {
  try {
    // If ID exists, it's an UPDATE (PUT), else CREATE (POST)
    if (config.id) {
      const response = await api.put<SearchCriteria>(
        `/api/v1/config/search/${config.id}`,
        config
      );
      return response.data;
    } else {
      const response = await api.post<SearchCriteria>(
        "/api/v1/config/search",
        config
      );
      return response.data;
    }
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error.response?.data?.message || "Failed to save config"
    );
  }
});

export const deleteSearchConfig = createAsyncThunk<number, number>(
  "searchConfig/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/v1/config/search/${id}`);
      return id;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete config"
      );
    }
  }
);

export const toggleSearchStatus = createAsyncThunk<
  { id: number; isActive: boolean },
  { id: number; isActive: boolean }
>("searchConfig/toggle", async ({ id, isActive }, { rejectWithValue }) => {
  try {
    // PATCH /api/v1/config/search/{id}/toggle
    await api.patch(`/api/v1/config/search/${id}/toggle`, null);
    return { id, isActive };
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error.response?.data?.message || "Failed to update status"
    );
  }
});

// --- Slice ---

interface SearchConfigState {
  items: SearchCriteria[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchConfigState = {
  items: [],
  loading: false,
  error: null,
};

const searchConfigSlice = createSlice({
  name: "searchConfig",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchSearchConfigs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSearchConfigs.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })

      // Save (Add/Update)
      .addCase(saveSearchConfig.fulfilled, (state, action) => {
        const index = state.items.findIndex((i) => i.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload; // Update
        } else {
          state.items.push(action.payload); // Add
        }
      })

      // Delete
      .addCase(deleteSearchConfig.fulfilled, (state, action) => {
        state.items = state.items.filter((i) => i.id !== action.payload);
      })

      // Toggle
      .addCase(toggleSearchStatus.fulfilled, (state, action) => {
        const item = state.items.find((i) => i.id === action.payload.id);
        if (item) item.isActive = action.payload.isActive;
      });
  },
});

export default searchConfigSlice.reducer;
