import { Check, Copy, Edit3, MoreHorizontal, Trash2 } from "lucide-react";

import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ButtonContent } from "@/components/ui/button-content";

import type { WeeklyItem } from "../types";

type ScheduleItemProps = {
  item: WeeklyItem;
  index: number;
  activeDay: string;
  canManage: boolean;
  editing: boolean;
  editingName: string;
  menuOpen: boolean;
  deleting: boolean;
  duplicating: boolean;
  saving: boolean;
  onEditingNameChange: (value: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onStartEdit: () => void;
  onDuplicate: () => void;
  onRequestDelete: () => void;
  onToggleMenu: () => void;
};

export function ScheduleItem({
  item,
  index,
  activeDay,
  canManage,
  editing,
  editingName,
  menuOpen,
  deleting,
  duplicating,
  saving,
  onEditingNameChange,
  onSaveEdit,
  onCancelEdit,
  onStartEdit,
  onDuplicate,
  onRequestDelete,
  onToggleMenu,
}: ScheduleItemProps) {
  return (
    <div
      className={[
        "group relative flex min-w-0 items-center gap-3 px-4 py-4 transition sm:px-5",
        menuOpen ? "bg-slate-50" : "hover:bg-slate-50/70",
      ].join(" ")}
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-indigo-50 text-xs font-bold text-indigo-600">
        {index + 1}
      </span>

      {editing ? (
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              autoFocus
              value={editingName}
              onChange={(event) => onEditingNameChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !saving) {
                  onSaveEdit();
                }

                if (event.key === "Escape" && !saving) {
                  onCancelEdit();
                }
              }}
              disabled={saving}
              className="ui-input min-w-0 flex-1"
            />

            <div className="grid grid-cols-2 gap-2 sm:flex">
              <button
                type="button"
                onClick={onSaveEdit}
                disabled={saving}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-3 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ButtonContent loading={saving} loadingText="Menyimpan...">
                  <Check className="h-4 w-4 text-white" />
                  <span className="text-white">Simpan</span>
                </ButtonContent>
              </button>

              <button
                type="button"
                onClick={onCancelEdit}
                disabled={saving}
                className="ui-button ui-button-secondary"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-800">
              {item.activity}
            </p>

            <div className="mt-1 flex items-center gap-2">
              <span className="text-[10px] font-medium text-slate-400">
                {activeDay}
              </span>

              <span className="h-1 w-1 rounded-full bg-slate-300" />

              <span className="text-[10px] font-medium text-slate-400">
                Aktivitas #{index + 1}
              </span>
            </div>
          </div>

          {canManage && (
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={onToggleMenu}
                disabled={deleting || duplicating || saving}
                className={[
                  "grid h-9 w-9 place-items-center rounded-xl transition",
                  menuOpen
                    ? "bg-white text-slate-700 ring-1 ring-slate-200"
                    : "text-slate-400 hover:bg-white hover:text-slate-600",
                ].join(" ")}
                aria-label={`Menu ${item.activity}`}
                aria-expanded={menuOpen}
              >
                {deleting || duplicating ? (
                  <LoadingSpinner />
                ) : (
                  <MoreHorizontal className="h-4 w-4" />
                )}
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-11 z-50 w-[min(12rem,calc(100vw-2rem))] rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-900/10">
                  <button
                    type="button"
                    onClick={onStartEdit}
                    disabled={saving || deleting || duplicating}
                    className="flex min-h-10 w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-medium text-slate-700 transition hover:bg-amber-50 hover:text-amber-700 disabled:opacity-40"
                  >
                    <Edit3 className="h-4 w-4 text-amber-500" />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={onDuplicate}
                    disabled={saving || deleting || duplicating}
                    className="flex min-h-10 w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700 disabled:opacity-40"
                  >
                    {duplicating ? (
                      <LoadingSpinner />
                    ) : (
                      <Copy className="h-4 w-4 text-indigo-500" />
                    )}

                    {duplicating ? "Menduplikasi..." : "Duplikat"}
                  </button>

                  <div className="my-1 border-t border-slate-100" />

                  <button
                    type="button"
                    onClick={onRequestDelete}
                    disabled={deleting}
                    className="flex min-h-10 w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Trash2 className="h-4 w-4" />
                    Hapus
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
