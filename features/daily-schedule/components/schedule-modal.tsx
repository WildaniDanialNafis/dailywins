import { CalendarClock, Check, X } from "lucide-react";

import { ButtonContent } from "@/components/ui/button-content";

import { formatDuration, getDuration, isValidTime } from "../utils";
import type { DraftState } from "../types";

type ScheduleModalProps = {
  open: boolean;
  editing: boolean;
  draft: DraftState;
  saving: boolean;
  onClose: () => void;
  onChange: (field: keyof DraftState, value: string) => void;
  onSave: () => void;
};

export function ScheduleModal({
  open,
  editing,
  draft,
  saving,
  onClose,
  onChange,
  onSave,
}: ScheduleModalProps) {
  if (!open) {
    return null;
  }

  const duration =
    isValidTime(draft.start) && isValidTime(draft.end)
      ? getDuration(draft.start, draft.end)
      : null;

  return (
    <div
      className="fixed inset-0 z-80 flex items-end justify-center bg-slate-950/35 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !saving) {
          onClose();
        }
      }}
    >
      <div
        className="flex max-h-[92svh] w-full flex-col overflow-hidden rounded-t-3xl border border-slate-200 bg-white shadow-2xl sm:max-w-xl sm:rounded-3xl"
        role="dialog"
        aria-modal="true"
        aria-label={editing ? "Edit jadwal" : "Tambah jadwal"}
      >
        <div className="shrink-0 border-b border-slate-100 px-5 py-4 sm:px-6">
          <div className="flex items-start gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-indigo-50 text-indigo-600">
              <CalendarClock className="h-5 w-5" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-indigo-500">
                DailyWins · Time Builder
              </p>

              <h2 className="mt-1 text-lg font-bold tracking-tight text-slate-900">
                {editing ? "Edit Jadwal" : "Tambah Jadwal"}
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-400">
                Atur satu aktivitas dan rentang waktunya.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 disabled:opacity-40"
              aria-label="Tutup"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="min-h-0 overflow-y-auto overscroll-contain p-5 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="min-w-0">
              <span className="mb-2 block text-xs font-semibold text-slate-700">
                Mulai
              </span>

              <input
                type="text"
                inputMode="numeric"
                autoComplete="off"
                maxLength={5}
                value={draft.start}
                onChange={(event) => onChange("start", event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !saving) {
                    event.preventDefault();
                    onSave();
                  }
                }}
                disabled={saving}
                placeholder="05:30"
                className="ui-input w-full tabular-nums"
              />
            </label>

            <label className="min-w-0">
              <span className="mb-2 block text-xs font-semibold text-slate-700">
                Selesai
              </span>

              <input
                type="text"
                inputMode="numeric"
                autoComplete="off"
                maxLength={5}
                value={draft.end}
                onChange={(event) => onChange("end", event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !saving) {
                    event.preventDefault();
                    onSave();
                  }
                }}
                disabled={saving}
                placeholder="06:00"
                className="ui-input w-full tabular-nums"
              />
            </label>

            <label className="min-w-0 sm:col-span-2">
              <span className="mb-2 block text-xs font-semibold text-slate-700">
                Aktivitas
              </span>

              <input
                autoComplete="off"
                value={draft.activity}
                onChange={(event) => onChange("activity", event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !saving) {
                    event.preventDefault();
                    onSave();
                  }
                }}
                disabled={saving}
                placeholder="Contoh: Deep Work"
                className="ui-input w-full"
              />
            </label>
          </div>

          <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold text-slate-600">
                Preview
              </span>

              <span className="text-xs font-bold tabular-nums text-indigo-600">
                {isValidTime(draft.start) && isValidTime(draft.end)
                  ? `${draft.start} – ${draft.end}`
                  : "--:-- – --:--"}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="text-[11px] text-slate-400">Durasi</span>

              <span className="text-[11px] font-semibold text-slate-600">
                {formatDuration(duration)}
              </span>
            </div>

            <p className="mt-3 text-[11px] leading-5 text-slate-400">
              Waktu selesai harus lebih besar dari waktu mulai dan tidak boleh
              bertabrakan dengan jadwal lain.
            </p>
          </div>

          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="ui-button ui-button-secondary w-full sm:w-auto"
            >
              Batal
            </button>

            <button
              type="button"
              onClick={onSave}
              disabled={saving}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 disabled:opacity-50 sm:w-auto"
            >
              <ButtonContent loading={saving} loadingText="Menyimpan...">
                <Check className="h-4 w-4 text-white" />
                <span className="text-white">Simpan Jadwal</span>
              </ButtonContent>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
