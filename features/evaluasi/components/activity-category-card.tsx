import {
  BarChart3,
  Check,
  ChevronDown,
  MoreHorizontal,
  Pencil,
  Plus,
  Trash2,
  ListChecks,
} from "lucide-react";

import { ButtonContent } from "@/components/ui/button-content";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

import type { Activity, Category } from "../types";

type ActivityCategoryCardProps = {
  category: Category;
  expanded: boolean;
  editing: boolean;
  deletingCategory: boolean;
  selectedCount: number;
  selectedActivityIds: Set<number>;
  canManage: boolean;

  saving: boolean;
  deletingActivityId: number | null;

  categoryMenuOpen: boolean;

  editingCategoryName: string;
  editingActivityId: number | null;
  editingActivityName: string;

  activityCategoryId: number | null;
  newActivityName: string;

  onToggle: () => void;
  onToggleMenu: () => void;

  onStartEditCategory: () => void;
  onSaveCategory: () => void;
  onCancelEditCategory: () => void;
  onChangeCategoryName: (value: string) => void;
  onDeleteCategory: () => void;

  onStartEditActivity: (activity: Activity) => void;
  onSaveActivity: (activityId: number) => void;
  onCancelEditActivity: () => void;
  onChangeActivityName: (value: string) => void;
  onDeleteActivity: (activity: Activity) => void;

  onSelectActivityCategory: () => void;
  onChangeNewActivity: (value: string) => void;
  onAddActivity: () => void;
  onAddToEvaluation: (activityId: number) => void;
};

export function ActivityCategoryCard({
  category,
  expanded,
  editing,
  deletingCategory,
  selectedCount,
  selectedActivityIds,
  canManage,
  saving,
  deletingActivityId,
  categoryMenuOpen,
  editingCategoryName,
  editingActivityId,
  editingActivityName,
  activityCategoryId,
  newActivityName,
  onToggle,
  onToggleMenu,
  onStartEditCategory,
  onSaveCategory,
  onCancelEditCategory,
  onChangeCategoryName,
  onDeleteCategory,
  onStartEditActivity,
  onSaveActivity,
  onCancelEditActivity,
  onChangeActivityName,
  onDeleteActivity,
  onSelectActivityCategory,
  onChangeNewActivity,
  onAddActivity,
  onAddToEvaluation,
}: ActivityCategoryCardProps) {
  return (
    <article
      className={[
        "overflow-visible rounded-2xl border bg-white shadow-sm transition",
        expanded ? "border-indigo-100" : "border-slate-200/80",
      ].join(" ")}
    >
      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={onToggle}
            className={[
              "grid h-10 w-10 shrink-0 place-items-center rounded-xl transition",
              expanded
                ? "bg-indigo-600 text-white"
                : "bg-indigo-50 text-indigo-600",
            ].join(" ")}
            aria-label={
              expanded ? `Tutup ${category.name}` : `Buka ${category.name}`
            }
          >
            <BarChart3 className="h-4.5 w-4.5" />
          </button>

          <div className="min-w-0 flex-1">
            {editing ? (
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  autoFocus
                  value={editingCategoryName}
                  onChange={(event) => onChangeCategoryName(event.target.value)}
                  disabled={saving}
                  className="ui-input min-w-0 flex-1"
                />

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={onSaveCategory}
                    disabled={saving}
                    className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-3 text-xs font-semibold text-white disabled:opacity-50 sm:flex-none"
                  >
                    <ButtonContent loading={saving} loadingText="Menyimpan...">
                      <Check className="h-4 w-4 text-white" />
                      <span className="text-white">Simpan</span>
                    </ButtonContent>
                  </button>

                  <button
                    type="button"
                    onClick={onCancelEditCategory}
                    disabled={saving}
                    className="ui-button ui-button-secondary flex-1 sm:flex-none"
                  >
                    Batal
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="min-w-0 truncate text-base font-bold text-slate-900 sm:text-lg">
                    {category.name}
                  </h3>

                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600">
                    {category.activities.length} kegiatan
                  </span>

                  {selectedCount > 0 && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-semibold text-indigo-700">
                      <Check className="h-3 w-3" />
                      {selectedCount} dipilih
                    </span>
                  )}
                </div>

                <p className="mt-1 text-xs text-slate-400">Activity category</p>
              </>
            )}
          </div>

          {canManage && !editing && (
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={onToggleMenu}
                disabled={deletingCategory}
                className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200 disabled:opacity-50"
                aria-label="Menu kategori"
              >
                {deletingCategory ? (
                  <LoadingSpinner />
                ) : (
                  <MoreHorizontal className="h-4 w-4" />
                )}
              </button>

              {categoryMenuOpen && (
                <div className="absolute right-0 top-11 z-40 w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                  <button
                    type="button"
                    onClick={onStartEditCategory}
                    disabled={saving || deletingCategory}
                    className="flex min-h-10 w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-medium transition hover:bg-amber-50 disabled:opacity-40"
                  >
                    <Pencil className="h-4 w-4 text-amber-500" />
                    Edit kategori
                  </button>

                  <div className="my-1 border-t border-slate-100" />

                  <button
                    type="button"
                    onClick={onDeleteCategory}
                    disabled={deletingCategory}
                    className="flex min-h-10 w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-40"
                  >
                    <Trash2 className="h-4 w-4" />
                    Hapus kategori
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/60">
          <button
            type="button"
            onClick={onToggle}
            className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
          >
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                Activities
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {category.activities.length} kegiatan tersedia
              </p>
            </div>

            <div className="flex items-center gap-2">
              {selectedCount > 0 && (
                <span className="hidden rounded-full bg-indigo-50 px-2 py-1 text-[9px] font-semibold text-indigo-700 sm:inline-flex">
                  {selectedCount} dipilih
                </span>
              )}

              <ChevronDown
                className={[
                  "h-4 w-4 text-slate-400 transition-transform duration-200",
                  expanded ? "rotate-180" : "",
                ].join(" ")}
              />
            </div>
          </button>

          {expanded && (
            <div className="border-t border-slate-100 px-3 pb-3 pt-1 sm:px-4">
              <div className="space-y-1.5">
                {category.activities.map((activity, index) => {
                  const selected = selectedActivityIds.has(activity.id);
                  const editingActivity = editingActivityId === activity.id;
                  const deletingActivity = deletingActivityId === activity.id;

                  return (
                    <div
                      key={activity.id}
                      className={[
                        "rounded-xl border px-3 py-2.5 transition",
                        selected
                          ? "border-indigo-100 bg-indigo-50/40"
                          : "border-slate-200 bg-white",
                      ].join(" ")}
                    >
                      {editingActivity ? (
                        <div className="flex flex-col gap-2 sm:flex-row">
                          <input
                            autoFocus
                            value={editingActivityName}
                            onChange={(event) =>
                              onChangeActivityName(event.target.value)
                            }
                            disabled={saving}
                            className="ui-input min-w-0 flex-1"
                          />

                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => onSaveActivity(activity.id)}
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
                              onClick={onCancelEditActivity}
                              disabled={saving}
                              className="ui-button ui-button-secondary flex-1 sm:flex-none"
                            >
                              Batal
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex min-w-0 items-center gap-2.5">
                          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-slate-100 text-[10px] font-bold text-slate-500">
                            {index + 1}
                          </span>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-slate-700">
                              {activity.name}
                            </p>

                            {selected && (
                              <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-indigo-100 px-2 py-1 text-[9px] font-semibold text-indigo-700 sm:hidden">
                                <Check className="h-2.5 w-2.5" />
                                Dipilih
                              </span>
                            )}
                          </div>

                          {selected && (
                            <span className="hidden shrink-0 items-center gap-1 rounded-full bg-indigo-100 px-2 py-1 text-[10px] font-semibold text-indigo-700 sm:inline-flex">
                              <Check className="h-3 w-3" />
                              Dipilih
                            </span>
                          )}

                          {canManage && (
                            <div className="flex shrink-0 items-center gap-1">
                              <button
                                type="button"
                                onClick={() => onStartEditActivity(activity)}
                                disabled={deletingActivity || saving}
                                className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition hover:bg-amber-50 hover:text-amber-600 disabled:opacity-40"
                                aria-label="Edit kegiatan"
                              >
                                <Pencil className="h-3.5 w-3.5" />
                              </button>

                              <button
                                type="button"
                                onClick={() => onDeleteActivity(activity)}
                                disabled={
                                  deletingActivity ||
                                  deletingActivityId !== null
                                }
                                className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-40"
                                aria-label="Hapus kegiatan"
                              >
                                {deletingActivity ? (
                                  <LoadingSpinner />
                                ) : (
                                  <Trash2 className="h-3.5 w-3.5" />
                                )}
                              </button>

                              <button
                                type="button"
                                onClick={() => onAddToEvaluation(activity.id)}
                                disabled={selected || saving}
                                className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-600 text-white transition hover:bg-indigo-700 disabled:bg-slate-100 disabled:text-slate-400"
                                aria-label={
                                  selected
                                    ? "Sudah ditambahkan"
                                    : "Tambah ke evaluasi"
                                }
                              >
                                {selected ? (
                                  <Check className="h-3.5 w-3.5 text-slate-400" />
                                ) : saving ? (
                                  <LoadingSpinner />
                                ) : (
                                  <Plus className="h-3.5 w-3.5 text-white" />
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

              {category.activities.length === 0 && (
                <div className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-8 text-center">
                  <ListChecks className="mx-auto h-6 w-6 text-slate-300" />

                  <p className="mt-2 text-sm font-semibold text-slate-700">
                    Belum ada kegiatan
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    {canManage
                      ? "Tambahkan kegiatan pertama untuk kategori ini."
                      : "Kategori ini belum memiliki kegiatan."}
                  </p>
                </div>
              )}

              {canManage && (
                <div className="mt-3 border-t border-slate-100 pt-3">
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <input
                      value={
                        activityCategoryId === category.id
                          ? newActivityName
                          : ""
                      }
                      onFocus={onSelectActivityCategory}
                      onChange={(event) =>
                        onChangeNewActivity(event.target.value)
                      }
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          onAddActivity();
                        }
                      }}
                      disabled={saving}
                      placeholder="Tambah kegiatan ke kategori ini"
                      className="ui-input min-w-0 flex-1"
                    />

                    <button
                      type="button"
                      onClick={onAddActivity}
                      disabled={saving}
                      className="ui-button ui-button-secondary shrink-0 disabled:opacity-50"
                    >
                      {saving ? (
                        <LoadingSpinner />
                      ) : (
                        <Plus className="h-4 w-4 text-slate-500" />
                      )}

                      {saving ? "Menyimpan..." : "Tambah kegiatan"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
