type ReportsPaginationProps = {
  page: number;
  totalPages: number;
  pageStart: number;
  pageEnd: number;
  totalResults: number;
  onPageChange: (page: number) => void;
};

export function ReportsPagination({
  page,
  totalPages,
  pageStart,
  pageEnd,
  totalResults,
  onPageChange,
}: ReportsPaginationProps) {
  return (
    <div className="flex flex-col gap-3 border-t border-slate-100 px-4 py-4 sm:px-5 md:flex-row md:items-center md:justify-between">
      <p className="text-xs text-slate-500">
        Menampilkan{" "}
        <span className="font-semibold text-slate-700">{pageStart}</span>–
        <span className="font-semibold text-slate-700">{pageEnd}</span> dari{" "}
        <span className="font-semibold text-slate-700">{totalResults}</span>
      </p>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page <= 1}
          className="inline-flex min-h-9 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span className="hidden sm:inline">Sebelumnya</span>

          <span className="sm:hidden">Prev</span>
        </button>

        <div className="flex items-center justify-center gap-1">
          {Array.from(
            {
              length: totalPages,
            },
            (_, index) => index + 1,
          ).map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              onClick={() => onPageChange(pageNumber)}
              className={[
                "grid h-9 min-w-9 place-items-center rounded-lg px-2 text-xs font-semibold transition",
                pageNumber === page
                  ? "bg-indigo-600 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
              ].join(" ")}
              aria-current={pageNumber === page ? "page" : undefined}
            >
              {pageNumber}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page >= totalPages}
          className="inline-flex min-h-9 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span className="hidden sm:inline">Berikutnya</span>

          <span className="sm:hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
