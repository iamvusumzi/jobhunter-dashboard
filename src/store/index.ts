import {
  configureStore,
  type UnknownAction,
  type Reducer,
} from "@reduxjs/toolkit";
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

const appReducer = combineReducers({
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

const rootReducer: Reducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: UnknownAction
) => {
  if (action.type === "auth/logout") {
    // 1. Clear the storage engine (localStorage) to prevent stale data on reload
    storage.removeItem("persist:root");
    // 2. Reset the state to undefined. This forces all reducers to return their initial state.
    state = undefined;
  }
  return appReducer(state, action);
};

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
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
