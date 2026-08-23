import { CalendarClock, Plus } from "lucide-react";

type ScheduleEmptyStateProps = {
  canManage: boolean;
  busy: boolean;
  onCreate: () => void;
};

export function ScheduleEmptyState({
  canManage,
  busy,
  onCreate,
}: ScheduleEmptyStateProps) {
  return (
    <div className="px-5 py-16 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-50 text-slate-300">
        <CalendarClock className="h-7 w-7" />
      </div>

      <p className="mt-4 text-sm font-semibold text-slate-700">
        Daily Schedule masih kosong
      </p>

      <p className="mx-auto mt-1 max-w-md text-xs leading-5 text-slate-400">
        {canManage
          ? "Buat jadwal pertama untuk menyusun ritme aktivitas harian."
          : "Belum ada jadwal yang tersedia di workspace ini."}
      </p>

      {canManage && (
        <button
          type="button"
          onClick={onCreate}
          disabled={busy}
          className="mt-5 inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 text-xs font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
        >
          <Plus className="h-4 w-4 text-white" />
          <span className="text-white">Tambah Jadwal</span>
        </button>
      )}
    </div>
  );
}
