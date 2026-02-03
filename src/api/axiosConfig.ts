import axios from "axios";
import { sha256 } from "js-sha256";
import { store } from "../store";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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
      config.headers["X-Auth-Token"] = `Bearer ${token}`;
      delete config.headers["Authorization"];
    }

    if (config.data && ["post", "put", "patch"].includes(config.method || "")) {
      const dataString =
        typeof config.data === "string"
          ? config.data
          : JSON.stringify(config.data);
      config.headers["x-amz-content-sha256"] = sha256(dataString);
      config.data = dataString;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
