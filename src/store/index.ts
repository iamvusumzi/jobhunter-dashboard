import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// We will create these slices shortly
import authReducer from "../features/auth/authSlice";
import jobsReducer from "../features/jobs/jobsSlice";
import uiReducer from "../components/ui/uiSlice";
import executionsReducer from "../features/executions/executionsSlice";
import searchConfigReducer from "../features/settings/searchConfigSlice";
import profileReducer from "../features/settings/profile/profileSlice";
import aiConfigReducer from "../features/settings/ai/aiConfigSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import publicReducer from "../features/public/publicSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  jobs: jobsReducer,
  ui: uiReducer,
  executions: executionsReducer,
  searchConfig: searchConfigReducer,
  profile: profileReducer,
  aiConfig: aiConfigReducer,
  dashboard: dashboardReducer,
  public: publicReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Redux-persist actions are not serializable, so ignore them to prevent console warnings
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/FLUSH",
          "persist/REGISTER",
        ],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
