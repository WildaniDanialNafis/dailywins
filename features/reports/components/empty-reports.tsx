import { Search, X } from "lucide-react";

type EmptyReportsProps = {
  hasFilters: boolean;
  onReset: () => void;
};

export function EmptyReports({ hasFilters, onReset }: EmptyReportsProps) {
  return (
    <div className="px-5 py-16 text-center sm:py-20">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-50 text-slate-300">
        <Search className="h-7 w-7" />
      </div>

      <p className="mt-5 text-base font-bold text-slate-900">
        Tidak ada laporan
      </p>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        {hasFilters
          ? "Tidak ada laporan yang cocok dengan pencarian atau filter saat ini."
          : "Belum ada riwayat laporan di workspace."}
      </p>

      {hasFilters && (
        <button
          type="button"
          onClick={onReset}
          className="mt-6 inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100"
        >
          <X className="h-4 w-4" />
          Reset filter
        </button>
      )}
    </div>
  );
}
