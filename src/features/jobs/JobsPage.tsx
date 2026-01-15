import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchJobs } from "./jobsSlice";
import JobFilters, { type FilterValues } from "./JobFilters";
import type { RecruitmentStatus } from "../../types/job";

import JobsHeader from "../../components/ui/JobsHeader";
import JobsTable from "../../components/ui/JobsTable";
import JobsPagination from "../../components/ui/JobsPagination";

const JobsPage = () => {
  const dispatch = useAppDispatch();
  const { items, loading, pagination } = useAppSelector((state) => state.jobs);

  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterValues>({
    status: "" as RecruitmentStatus | "",
    search: "",
  });

  useEffect(() => {
    dispatch(fetchJobs({ page: 0 }));
  }, [dispatch]);

  const fetchPage = (page: number, filters: FilterValues = activeFilters) => {
    dispatch(
      fetchJobs({
        page,
        status: filters.status || undefined,
        search: filters.search || undefined,
      })
    );
  };

  const handleFilterChange = (newFilters: FilterValues) => {
    setActiveFilters(newFilters);
    fetchPage(0, newFilters);
  };

  const handlePageChange = (newPage: number) => {
    fetchPage(newPage);
  };

  const hasActiveFilters = Boolean(
    activeFilters.status || activeFilters.search
  );

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
