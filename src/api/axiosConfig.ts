import axios from "axios";
import { sha256 } from "js-sha256";
import { store } from "../store";

const EMPTY_BODY_SHA256 =
  "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers["X-Auth-Token"] = `Bearer ${token}`;
      delete config.headers["Authorization"];
    }

    if (["post", "put", "patch"].includes(config.method || "")) {
      if (config.data) {
        const dataString =
          typeof config.data === "string"
            ? config.data
            : JSON.stringify(config.data);

        config.headers["x-amz-content-sha256"] = sha256(dataString);
        config.data = dataString;
      } else {
        config.headers["x-amz-content-sha256"] = EMPTY_BODY_SHA256;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
