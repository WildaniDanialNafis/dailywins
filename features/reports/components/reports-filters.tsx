import { Filter, X } from "lucide-react";

import { SortButton } from "./sort-button";

import type {
  ReportStatus,
  ReportType,
  SortDirection,
  SortKey,
} from "../types";

type ReportsFiltersProps = {
  search: string;
  typeFilter: "Semua" | ReportType;
  statusFilter: "Semua" | ReportStatus;
  sortKey: SortKey;
  sortDirection: SortDirection;
  resultCount: number;
  pageStart: number;
  pageEnd: number;
  hasActiveFilters: boolean;
  onSearchChange: (value: string) => void;
  onTypeChange: (value: "Semua" | ReportType) => void;
  onStatusChange: (value: "Semua" | ReportStatus) => void;
  onSortChange: (value: SortKey) => void;
  onReset: () => void;
};

export function ReportsFilters({
  search,
  typeFilter,
  statusFilter,
  sortKey,
  sortDirection,
  resultCount,
  pageStart,
  pageEnd,
  hasActiveFilters,
  onSearchChange,
  onTypeChange,
  onStatusChange,
  onSortChange,
  onReset,
}: ReportsFiltersProps) {
  return (
    <section className="mb-6 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-600">
            <Filter className="h-4 w-4" />
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Reports
            </p>

            <h2 className="mt-1 text-sm font-bold text-slate-900">
              Cari & filter
            </h2>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Gunakan filter seperlunya, lalu urutkan sesuai kebutuhan.
            </p>
          </div>
        </div>

        <div className="text-xs text-slate-400">
          {resultCount > 0
            ? `${pageStart}-${pageEnd} dari ${resultCount}`
            : "Tidak ada laporan"}
        </div>
      </div>

      <div className="mt-4 grid gap-2.5 md:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_180px_180px_auto]">
        <div className="relative">
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Cari laporan atau target..."
            className="ui-input w-full pl-9 pr-11"
          />

          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-1.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              aria-label="Bersihkan pencarian"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <select
          value={typeFilter}
          onChange={(event) =>
            onTypeChange(event.target.value as "Semua" | ReportType)
          }
          className="ui-input"
        >
          <option value="Semua">Semua tipe</option>
          <option value="Evaluasi">Evaluasi</option>
          <option value="Polling">Polling</option>
          <option value="Schedule">Schedule</option>
        </select>

        <select
          value={statusFilter}
          onChange={(event) =>
            onStatusChange(event.target.value as "Semua" | ReportStatus)
          }
          className="ui-input"
        >
          <option value="Semua">Semua status</option>
          <option value="Terkirim">Terkirim</option>
          <option value="Terjadwal">Terjadwal</option>
          <option value="Draft">Draft</option>
        </select>

        <button
          type="button"
          onClick={onReset}
          disabled={!hasActiveFilters}
          className="ui-button ui-button-secondary disabled:cursor-not-allowed disabled:opacity-50"
        >
          Reset
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
            Urutkan
          </span>

          <SortButton
            label="Waktu"
            active={sortKey === "date"}
            direction={sortDirection}
            onClick={() => onSortChange("date")}
          />

          <SortButton
            label="Nama"
            active={sortKey === "title"}
            direction={sortDirection}
            onClick={() => onSortChange("title")}
          />

          <SortButton
            label="Tipe"
            active={sortKey === "type"}
            direction={sortDirection}
            onClick={() => onSortChange("type")}
          />

          <SortButton
            label="Status"
            active={sortKey === "status"}
            direction={sortDirection}
            onClick={() => onSortChange("status")}
          />
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg px-2.5 text-[11px] font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-3.5 w-3.5" />
            Bersihkan semua
          </button>
        )}
      </div>
    </section>
  );
}
