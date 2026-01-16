import { useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchRecentExecutions } from "./executionsSlice";
import ExecutionsHeader from "./ExecutionsHeader";
import ExecutionsTable from "./ExecutionsTable";
import ExecutionsFooter from "./ExecutionsFooter";

const ExecutionsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, loading } = useAppSelector((state) => state.executions);

  useEffect(() => {
    dispatch(fetchRecentExecutions(10));
  }, [dispatch]);

  const hasActive = useMemo(() => {
    return items.some(
      (exec) =>
        exec.status === "RUNNING" || exec.status === "INGESTION_COMPLETE"
    );
  }, [items]);

  const hasActiveRef = useRef(false);

  useEffect(() => {
    hasActiveRef.current = hasActive;
  }, [hasActive]);

  const loadingRef = useRef(false);
  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (hasActiveRef.current && !loadingRef.current) {
        dispatch(fetchRecentExecutions(10));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const getDuration = (start: string, end: string | null) => {
    if (!end) return "Active...";
    const diff = new Date(end).getTime() - new Date(start).getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    return minutes > 0 ? `${minutes}m ${seconds % 60}s` : `${seconds}s`;
  };

  const handleRowClick = (id: number | string) => {
    navigate(`/app/executions/${id}`);
  };

  return (
    <div className="space-y-6">
      <ExecutionsHeader
        title="Ingestion History"
        subtitle="Recent activity log"
      />

      <ExecutionsTable
        items={items}
        loading={loading}
        getDuration={getDuration}
        onSelectExecution={handleRowClick}
      />

      <ExecutionsFooter
        onLoadLast20={() => dispatch(fetchRecentExecutions(20))}
      />
    </div>
  );
};

export default ExecutionsPage;
