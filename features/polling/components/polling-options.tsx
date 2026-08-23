import { Check, Edit3, ListChecks, Plus, Trash2 } from "lucide-react";

import { ButtonContent } from "@/components/ui/button-content";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

import type { EditingOption, DeletingOption } from "../types";

type PollingOptionsProps = {
  pollingId: number;
  options: string[];

  canManage: boolean;
  saving: boolean;

  newOption: string;
  selectedPollingId: number | null;

  editingOption: EditingOption;
  editingOptionValue: string;
  deletingOption: DeletingOption;

  onSetSelected: () => void;
  onChangeNewOption: (value: string) => void;
  onAddOption: () => void;

  onStartEdit: (index: number, value: string) => void;
  onChangeEditing: (value: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;

  onDelete: (index: number, value: string) => void;
};

export function PollingOptions({
  pollingId,
  options,
  canManage,
  saving,
  newOption,
  selectedPollingId,
  editingOption,
  editingOptionValue,
  deletingOption,
  onSetSelected,
  onChangeNewOption,
  onAddOption,
  onStartEdit,
  onChangeEditing,
  onSaveEdit,
  onCancelEdit,
  onDelete,
}: PollingOptionsProps) {
  return (
    <div className="border-t border-slate-100 px-3 pb-3 pt-1 sm:px-4">
      <div className="space-y-2">
        {options.map((option, index) => {
          const optionEditing =
            editingOption?.pollingId === pollingId &&
            editingOption.index === index;

          const deleting =
            deletingOption?.pollingId === pollingId &&
            deletingOption.index === index;

          return (
            <div
              key={`${pollingId}-${index}`}
              className={[
                "rounded-xl border bg-white p-3 transition",
                optionEditing
                  ? "border-indigo-200 ring-2 ring-indigo-50"
                  : "border-slate-200",
              ].join(" ")}
            >
              {optionEditing ? (
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    autoFocus
                    value={editingOptionValue}
                    onChange={(event) => onChangeEditing(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        onSaveEdit();
                      }

                      if (event.key === "Escape") {
                        onCancelEdit();
                      }
                    }}
                    disabled={saving}
                    className="ui-input min-w-0 flex-1"
                  />

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={onSaveEdit}
                      disabled={saving}
                      className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-3 text-xs font-semibold text-white disabled:opacity-50 sm:flex-none"
                    >
                      <ButtonContent
                        loading={saving}
                        loadingText="Menyimpan..."
                      >
                        <Check className="h-4 w-4 text-white" />
                        <span className="text-white">Simpan</span>
                      </ButtonContent>
                    </button>

                    <button
                      type="button"
                      onClick={onCancelEdit}
                      disabled={saving}
                      className="ui-button ui-button-secondary flex-1 sm:flex-none"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex min-w-0 items-start gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-violet-50 text-[10px] font-bold text-violet-600">
                    {String.fromCharCode(65 + index)}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="wrap-break-word pt-1 text-sm font-medium leading-5 text-slate-700">
                      {option}
                    </p>
                  </div>

                  {canManage && (
                    <div className="flex shrink-0 items-center gap-1">
                      <button
                        type="button"
                        onClick={() => onStartEdit(index, option)}
                        disabled={saving || deleting}
                        className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition hover:bg-amber-50 hover:text-amber-600 disabled:opacity-40"
                        aria-label="Edit opsi"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(index, option)}
                        disabled={deleting || deletingOption !== null}
                        className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-40"
                        aria-label="Hapus opsi"
                      >
                        {deleting ? (
                          <LoadingSpinner />
                        ) : (
                          <Trash2 className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {options.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-8 text-center">
          <ListChecks className="mx-auto h-6 w-6 text-slate-300" />

          <p className="mt-2 text-sm font-semibold text-slate-700">
            Belum ada opsi
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-400">
            Tambahkan minimal dua opsi agar polling siap dikirim.
          </p>
        </div>
      )}

      {canManage && (
        <div className="mt-3 border-t border-slate-100 pt-3">
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              value={selectedPollingId === pollingId ? newOption : ""}
              onFocus={onSetSelected}
              onChange={(event) => onChangeNewOption(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  onAddOption();
                }
              }}
              disabled={saving}
              placeholder="Tambah pilihan jawaban"
              className="ui-input min-w-0 flex-1"
            />

            <button
              type="button"
              onClick={onAddOption}
              disabled={saving}
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
            >
              {saving ? (
                <LoadingSpinner />
              ) : (
                <Plus className="h-4 w-4 text-slate-500" />
              )}

              {saving ? "Menyimpan..." : "Tambah opsi"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
