import { Routes, Route, Navigate } from "react-router-dom";

// Layouts & Guards
import DashboardLayout from "../components/layout/DashboardLayout";
import RequireAuth from "../features/auth/RequireAuth";

// Pages (Placeholders for now)
import PublicLanding from "../features/public/PublicLanding";
import LoginPage from "../features/auth/LoginPage";
import DashboardHome from "../features/dashboard/DashboardHome";
import JobsList from "../features/jobs/JobsList";
import JobDetail from "../features/jobs/JobDetail";
import ExecutionsList from "../features/executions/ExecutionsList";
import SearchSettings from "../features/settings/SearchSettings";

const AppRouter = () => {
  return (
    <Routes>
      {/* --- PUBLIC ROUTES --- */}
      <Route path="/" element={<PublicLanding />} />
      <Route path="/login" element={<LoginPage />} />

      {/* --- PROTECTED ROUTES --- */}
      {/* Wrap everything in RequireAuth */}
      <Route element={<RequireAuth />}>
        {/* Wrap everything in the Dashboard Layout */}
        <Route element={<DashboardLayout />}>
          <Route path="/app" element={<DashboardHome />} />

          {/* Job Routes */}
          <Route path="/app/jobs" element={<JobsList />} />
          <Route path="/app/jobs/:id" element={<JobDetail />} />

          {/* Execution Routes */}
          <Route path="/app/executions" element={<ExecutionsList />} />

          {/* Settings Routes */}
          <Route path="/app/settings/search" element={<SearchSettings />} />
        </Route>
      </Route>

      {/* Fallback: Catch all unknown routes and redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
