import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchJobs } from "./jobsSlice";
import JobFilters, { type FilterValues } from "./JobFilters";
import type { RecruitmentStatus } from "../../types/job";

import JobsHeader from "../../components/ui/JobsHeader";
import JobsTable from "../../components/ui/JobsTable";
import JobsPagination from "../../components/ui/JobsPagination";

const isRecruitmentStatus = (v: string | null): v is RecruitmentStatus => {
  return (
    v === "INCOMING" ||
    v === "AUTO_REJECTED" ||
    v === "NEW_MATCH" ||
    v === "SAVED" ||
    v === "APPLIED" ||
    v === "INTERVIEWING" ||
    v === "OFFER" ||
    v === "REJECTED_BY_USER" ||
    v === "REJECTED_BY_COMPANY"
  );
};

const JobsPage = () => {
  const dispatch = useAppDispatch();
  const { items, loading, pagination } = useAppSelector((state) => state.jobs);

  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const activeFilters = useMemo<FilterValues>(() => {
    const raw = searchParams.get("status");
    return {
      status: isRecruitmentStatus(raw) ? raw : "",
    };
  }, [searchParams]);

  useEffect(() => {
    const raw = searchParams.get("status");
    if (raw && !isRecruitmentStatus(raw)) {
      const next = new URLSearchParams(searchParams);
      next.delete("status");
      setSearchParams(next, { replace: true });
      return;
    }

    dispatch(
      fetchJobs({
        page: 0,
        status: activeFilters.status || undefined,
      })
    );
  }, [dispatch, searchParams, setSearchParams, activeFilters]);

  const fetchPage = (page: number, filters: FilterValues = activeFilters) => {
    dispatch(
      fetchJobs({
        page,
        status: filters.status || undefined,
      })
    );
  };

  const handleFilterChange = (newFilters: FilterValues) => {
    const next = new URLSearchParams(searchParams);
    if (newFilters.status) next.set("status", newFilters.status);
    else next.delete("status");
    setSearchParams(next, { replace: true });

    setShowFilters(false);

    fetchPage(0, newFilters);
  };

  const handlePageChange = (newPage: number) => {
    fetchPage(newPage);
  };

  const hasActiveFilters = Boolean(activeFilters.status);

  return (
    <div className="space-y-6">
      <JobsHeader
        title="Job Listings"
        subtitle="Manage your application pipeline"
        showFilters={showFilters}
        hasActiveFilters={hasActiveFilters}
        onToggleFilters={() => setShowFilters((v) => !v)}
      />

      {showFilters && (
        <JobFilters
          onFilter={handleFilterChange}
          onClose={() => setShowFilters(false)}
          currentFilters={activeFilters}
        />
      )}

      <JobsTable items={items} loading={loading} />

      <JobsPagination pagination={pagination} onPageChange={handlePageChange} />
    </div>
  );
};

export default JobsPage;
