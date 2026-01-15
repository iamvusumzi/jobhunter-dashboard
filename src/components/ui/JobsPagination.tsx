type PaginationState = {
  page: number;
  totalPages: number;
};

interface JobsPaginationProps {
  pagination: PaginationState;
  onPageChange: (page: number) => void;
}

const JobsPagination = ({ pagination, onPageChange }: JobsPaginationProps) => {
  const { page, totalPages } = pagination;

  const goPrev = () => onPageChange(Math.max(0, page - 1));
  const goNext = () => onPageChange(page + 1);

  const isPrevDisabled = page === 0;
  const isNextDisabled = page >= totalPages - 1;

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-lg shadow-sm">
      {/* Mobile */}
      <div className="flex w-full sm:hidden items-center justify-between gap-2">
        <button
          onClick={goPrev}
          disabled={isPrevDisabled}
          className="flex-1 rounded-md px-3 py-2 text-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50"
        >
          Previous
        </button>

        <div className="text-xs text-gray-600 whitespace-nowrap">
          {page + 1} / {totalPages}
        </div>

        <button
          onClick={goNext}
          disabled={isNextDisabled}
          className="flex-1 rounded-md px-3 py-2 text-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Desktop */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <p className="text-sm text-gray-700">
          Showing page <span className="font-medium">{page + 1}</span> of{" "}
          <span className="font-medium">{totalPages}</span>
        </p>

        <nav
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <button
            onClick={goPrev}
            disabled={isPrevDisabled}
            className="relative inline-flex items-center rounded-l-md px-3 py-2 text-sm text-gray-600 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={goNext}
            disabled={isNextDisabled}
            className="relative inline-flex items-center rounded-r-md px-3 py-2 text-sm text-gray-600 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

export default JobsPagination;
