import axios from "axios";
import { store } from "../store";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080", // Configure this in .env later
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach Token
api.interceptors.request.use(
  (config) => {
    // Access the token directly from the Redux store
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
