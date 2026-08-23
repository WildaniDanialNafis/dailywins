import { Trash2 } from "lucide-react";

type ScheduleToolbarProps = {
  canManage: boolean;
  scheduleLength: number;
  allSelected: boolean;
  selectedCount: number;
  deletingSelected: boolean;
  confirmingDelete: boolean;
  onToggleAll: () => void;
  onDeleteSelected: () => void;
  onClearSelection: () => void;
};

export function ScheduleToolbar({
  canManage,
  scheduleLength,
  allSelected,
  selectedCount,
  deletingSelected,
  confirmingDelete,
  onToggleAll,
  onDeleteSelected,
  onClearSelection,
}: ScheduleToolbarProps) {
  if (!canManage || scheduleLength === 0) {
    return null;
  }

  return (
    <div className="border-b border-slate-100 bg-slate-50/70 px-4 py-3 sm:px-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="inline-flex min-h-9 w-fit cursor-pointer items-center gap-2 text-xs font-semibold text-slate-600">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={onToggleAll}
            disabled={deletingSelected || confirmingDelete}
            className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />

          <span>{allSelected ? "Semua dipilih" : "Pilih semua"}</span>
        </label>

        {selectedCount > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onDeleteSelected}
              disabled={deletingSelected || confirmingDelete}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-xl bg-red-50 px-3 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Hapus {selectedCount}
            </button>

            <button
              type="button"
              onClick={onClearSelection}
              disabled={deletingSelected || confirmingDelete}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-xl bg-white px-3 text-xs font-semibold text-slate-600 ring-1 ring-slate-200 transition hover:bg-slate-50 disabled:opacity-50"
            >
              Batal pilih
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
