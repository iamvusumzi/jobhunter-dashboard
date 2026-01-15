import { Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout";
import RequireAuth from "../features/auth/RequireAuth";

import PublicLanding from "../features/public/PublicLanding";
import LoginPage from "../features/auth/LoginPage";
import DashboardHome from "../features/dashboard/DashboardHome";
import JobsPage from "../features/jobs/JobsPage";
import JobDetail from "../features/jobs/JobDetail";
import ExecutionsList from "../features/executions/ExecutionsList";
import SearchConfigPage from "../features/settings/SearchConfigPage";
import ExecutionDetail from "../features/executions/ExecutionDetail";
import ProfilePage from "../features/settings/profile/ProfilePage";
import AIConfigPage from "../features/settings/ai/AIConfigPage";
import NotFound from "../features/misc/NotFound";
import Forbidden from "../features/misc/Forbidden";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicLanding />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<RequireAuth />}>
        <Route element={<DashboardLayout />}>
          <Route path="/app" element={<DashboardHome />} />

          <Route path="/app/jobs" element={<JobsPage />} />
          <Route path="/app/jobs/:id" element={<JobDetail />} />

          <Route path="/app/executions" element={<ExecutionsList />} />
          <Route path="/app/executions/:id" element={<ExecutionDetail />} />

          <Route path="/app/settings/search" element={<SearchConfigPage />} />
          <Route path="/app/settings/profile" element={<ProfilePage />} />
          <Route path="/app/settings/ai-config" element={<AIConfigPage />} />
        </Route>
      </Route>
      <Route path="/403" element={<Forbidden />} />
      <Route path="/404" element={<NotFound />} />

      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRouter;
