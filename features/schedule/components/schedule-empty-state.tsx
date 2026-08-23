import { CalendarDays, Plus, Search, X } from "lucide-react";

import type { WeekDay } from "../types";

type ScheduleEmptyStateProps = {
  search: string;
  canManage: boolean;
  activeDay: WeekDay;
  onClear: () => void;
  onAdd: () => void;
};

export function ScheduleEmptyState({
  search,
  canManage,
  activeDay,
  onClear,
  onAdd,
}: ScheduleEmptyStateProps) {
  const isSearch = Boolean(search.trim());

  return (
    <div className="px-5 py-16 text-center sm:px-8">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-50 text-slate-300">
        {isSearch ? (
          <Search className="h-7 w-7" />
        ) : (
          <CalendarDays className="h-7 w-7" />
        )}
      </div>

      <h3 className="mt-5 text-sm font-bold text-slate-800">
        {isSearch ? "Aktivitas tidak ditemukan" : "Belum ada aktivitas"}
      </h3>

      <p className="mx-auto mt-1.5 max-w-md text-xs leading-5 text-slate-400">
        {isSearch
          ? `Tidak ada aktivitas yang cocok dengan "${search.trim()}".`
          : canManage
            ? `Belum ada aktivitas untuk ${activeDay}. Tambahkan aktivitas pertama untuk mulai menyusun minggu ini.`
            : `Belum ada aktivitas untuk ${activeDay}.`}
      </p>

      {isSearch ? (
        <button
          type="button"
          onClick={onClear}
          className="mt-5 inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100"
        >
          <X className="h-4 w-4" />
          Bersihkan pencarian
        </button>
      ) : (
        canManage && (
          <button
            type="button"
            onClick={onAdd}
            className="mt-5 inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 text-xs font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100"
          >
            <Plus className="h-4 w-4 text-white" />
            Tambah aktivitas
          </button>
        )
      )}
    </div>
  );
}
