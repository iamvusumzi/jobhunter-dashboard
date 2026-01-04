import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/axiosConfig";
import type { CandidateProfile } from "../../../types/profile";
import type { AxiosError } from "axios";

// Fetch my profile
export const fetchProfile = createAsyncThunk<CandidateProfile>(
  "profile/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<CandidateProfile>(
        "/api/v1/settings/profile"
      );
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error.response?.data?.message || "Failed to load profile"
      );
    }
  }
);

export const updateProfile = createAsyncThunk<
  CandidateProfile,
  CandidateProfile
>("profile/update", async (profile, { rejectWithValue }) => {
  try {
    const response = await api.put<CandidateProfile>(
      "/api/v1/settings/profile",
      profile
    );
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error.response?.data?.message || "Failed to save profile"
    );
  }
});

interface ProfileState {
  data: CandidateProfile | null;
  loading: boolean;
  saving: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  data: null,
  loading: false,
  saving: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateProfile.pending, (state) => {
        state.saving = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.saving = false;
        state.data = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload as string;
      });
  },
});

export default profileSlice.reducer;
