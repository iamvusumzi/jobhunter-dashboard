import { Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout";
import RequireAuth from "../features/auth/RequireAuth";

import PublicLanding from "../features/public/PublicLanding";
import LoginPage from "../features/auth/LoginPage";
import DashboardHome from "../features/dashboard/DashboardHome";
import JobsList from "../features/jobs/JobsList";
import JobDetail from "../features/jobs/JobDetail";
import ExecutionsList from "../features/executions/ExecutionsList";
import SearchSettings from "../features/settings/SearchSettings";
import ExecutionDetail from "../features/executions/ExecutionDetail";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicLanding />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<RequireAuth />}>
        <Route element={<DashboardLayout />}>
          <Route path="/app" element={<DashboardHome />} />

          <Route path="/app/jobs" element={<JobsList />} />
          <Route path="/app/jobs/:id" element={<JobDetail />} />

          <Route path="/app/executions" element={<ExecutionsList />} />
          <Route path="/app/executions/:id" element={<ExecutionDetail />} />

          <Route path="/app/settings/search" element={<SearchSettings />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
