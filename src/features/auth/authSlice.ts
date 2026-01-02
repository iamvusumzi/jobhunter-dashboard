import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import api from "../../api/axiosConfig";
import { AxiosError } from "axios";

// --- Types ---

// 1. What the Backend sends us on successful login
interface User {
  username: string;
  role: string;
  // Add other fields like 'email' or 'id' if your backend sends them
}

interface AuthResponse {
  token: string;
  user: User;
}

// 2. What the Form sends to the Thunk
interface LoginCredentials {
  username: string;
  password: string;
}

// 3. The shape of our Redux State
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// --- Initial State ---

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// --- Thunks ---

// <Return Type, Argument Type, Thunk Config>
export const loginUser = createAsyncThunk<
  AuthResponse,
  LoginCredentials,
  { rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    // We use the generic <AuthResponse> to tell Axios what the data looks like
    const response = await api.post<AuthResponse>(
      "/api/v1/auth/login",
      credentials
    );
    return response.data;
  } catch (err) {
    // Handle generic errors or specific backend error messages
    const error = err as AxiosError<{ message: string }>;
    const message =
      error.response?.data?.message ||
      "Login failed. Please check your credentials.";
    return rejectWithValue(message);
  }
});

// --- Slice ---

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Pending
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Fulfilled
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.loading = false;
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      )
      // Rejected
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        // action.payload is the string we returned from rejectWithValue
        state.error = action.payload || "An unexpected error occurred";
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
