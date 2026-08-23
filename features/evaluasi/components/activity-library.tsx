import { Plus, Search, X } from "lucide-react";

import { EmptyLibrary } from "./empty-library";
import { SectionHeading } from "./section-heading";
import { ActivityCategoryCard } from "./activity-category-card";

import type { Activity, Category } from "../types";

type ActivityLibraryProps = {
  canManage: boolean;

  categories: Category[];
  filteredCategories: Category[];
  selectedActivityIds: Set<number>;

  expandedCategoryIds: Set<number>;
  categoryMenuId: number | null;

  editingCategoryId: number | null;
  editingCategoryName: string;

  editingActivityId: number | null;
  editingActivityName: string;

  activityCategoryId: number | null;
  newCategoryName: string;
  newActivityName: string;

  search: string;
  searchActive: boolean;
  libraryIsEmpty: boolean;
  searchHasNoResults: boolean;

  saving: boolean;
  deletingCategoryId: number | null;
  deletingActivityId: number | null;

  onSearchChange: (value: string) => void;
  onClearSearch: () => void;

  onExpandAll: () => void;
  onCollapseAll: () => void;

  onNewCategoryChange: (value: string) => void;
  onAddCategory: () => void;

  onToggleCategory: (id: number) => void;
  onToggleCategoryMenu: (id: number) => void;

  onStartEditCategory: (category: Category) => void;
  onSaveCategory: () => void;
  onCancelEditCategory: () => void;
  onChangeCategoryName: (value: string) => void;
  onDeleteCategory: (category: Category) => void;

  onStartEditActivity: (activity: Activity) => void;
  onSaveActivity: (id: number) => void;
  onCancelEditActivity: () => void;
  onChangeActivityName: (value: string) => void;
  onDeleteActivity: (activity: Activity) => void;

  onSelectActivityCategory: (id: number) => void;
  onChangeNewActivity: (value: string) => void;
  onAddActivity: () => void;

  onAddToEvaluation: (activityId: number) => void;

  onCreateFirstCategory: () => void;
};

export function ActivityLibrary({
  canManage,
  categories,
  filteredCategories,
  selectedActivityIds,
  expandedCategoryIds,
  categoryMenuId,
  editingCategoryId,
  editingCategoryName,
  editingActivityId,
  editingActivityName,
  activityCategoryId,
  newCategoryName,
  newActivityName,
  search,
  searchActive,
  libraryIsEmpty,
  searchHasNoResults,
  saving,
  deletingCategoryId,
  deletingActivityId,
  onSearchChange,
  onClearSearch,
  onExpandAll,
  onCollapseAll,
  onNewCategoryChange,
  onAddCategory,
  onToggleCategory,
  onToggleCategoryMenu,
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
  onCreateFirstCategory,
}: ActivityLibraryProps) {
  return (
    <section id="activity-library" className="scroll-mt-24">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="01 · Activity Library"
          title="Bangun sumber kegiatan"
          description="Kelola kategori dan kegiatan yang tersedia untuk dimasukkan ke evaluasi."
        />

        {canManage && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onExpandAll}
              disabled={filteredCategories.length === 0}
              className="rounded-lg px-2.5 py-2 text-[10px] font-semibold text-indigo-600 transition hover:bg-indigo-50 disabled:opacity-40"
            >
              Buka semua
            </button>

            <button
              type="button"
              onClick={onCollapseAll}
              disabled={filteredCategories.length === 0}
              className="rounded-lg px-2.5 py-2 text-[10px] font-semibold text-slate-500 transition hover:bg-slate-100 disabled:opacity-40"
            >
              Tutup semua
            </button>
          </div>
        )}
      </div>

      <div className="mb-4 grid gap-3 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        {canManage && (
          <article className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-indigo-600 ring-1 ring-indigo-100">
                <Plus className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-indigo-500">
                  New category
                </p>

                <h3 className="mt-1 text-sm font-bold text-slate-900">
                  Tambah kategori
                </h3>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <input
                value={newCategoryName}
                onChange={(event) => onNewCategoryChange(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    onAddCategory();
                  }
                }}
                placeholder="Contoh: Spiritual"
                disabled={saving}
                className="ui-input min-w-0 flex-1"
              />

              <button
                type="button"
                onClick={onAddCategory}
                disabled={saving}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
              >
                <Plus className="h-4 w-4 text-white" />

                <span className="text-white">
                  {saving ? "Menyimpan..." : "Tambah"}
                </span>
              </button>
            </div>
          </article>
        )}

        <article className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                Search
              </p>

              <h3 className="mt-1 text-sm font-bold text-slate-900">
                Cari activity library
              </h3>
            </div>

            {searchActive && (
              <span className="text-[10px] font-medium text-slate-400">
                {filteredCategories.length} kategori ditemukan
              </span>
            )}
          </div>

          <div className="relative mt-4">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="search"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Cari kategori atau kegiatan..."
              className="ui-input w-full pl-10 pr-11"
            />

            {search && (
              <button
                type="button"
                onClick={onClearSearch}
                className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                aria-label="Bersihkan pencarian"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </article>
      </div>

      {libraryIsEmpty || searchHasNoResults ? (
        <EmptyLibrary
          canManage={canManage}
          searchActive={searchActive}
          search={search}
          onClearSearch={onClearSearch}
          onCreate={onCreateFirstCategory}
        />
      ) : (
        <div className="space-y-3">
          {filteredCategories.map((category) => {
            const expanded = expandedCategoryIds.has(category.id);
            const editing = editingCategoryId === category.id;
            const deletingCategory = deletingCategoryId === category.id;

            const selectedCount = category.activities.filter((activity) =>
              selectedActivityIds.has(activity.id),
            ).length;

            return (
              <ActivityCategoryCard
                key={category.id}
                category={category}
                expanded={expanded}
                editing={editing}
                deletingCategory={deletingCategory}
                selectedCount={selectedCount}
                selectedActivityIds={selectedActivityIds}
                canManage={canManage}
                saving={saving}
                deletingActivityId={deletingActivityId}
                categoryMenuOpen={categoryMenuId === category.id}
                editingCategoryName={editingCategoryName}
                editingActivityId={editingActivityId}
                editingActivityName={editingActivityName}
                activityCategoryId={activityCategoryId}
                newActivityName={newActivityName}
                onToggle={() => onToggleCategory(category.id)}
                onToggleMenu={() => onToggleCategoryMenu(category.id)}
                onStartEditCategory={() => onStartEditCategory(category)}
                onSaveCategory={onSaveCategory}
                onCancelEditCategory={onCancelEditCategory}
                onChangeCategoryName={onChangeCategoryName}
                onDeleteCategory={() => onDeleteCategory(category)}
                onStartEditActivity={onStartEditActivity}
                onSaveActivity={onSaveActivity}
                onCancelEditActivity={onCancelEditActivity}
                onChangeActivityName={onChangeActivityName}
                onDeleteActivity={onDeleteActivity}
                onSelectActivityCategory={() =>
                  onSelectActivityCategory(category.id)
                }
                onChangeNewActivity={onChangeNewActivity}
                onAddActivity={onAddActivity}
                onAddToEvaluation={onAddToEvaluation}
              />
            );
          })}
        </div>
      )}

      {categories.length === 0 && canManage && (
        <button
          type="button"
          onClick={onCreateFirstCategory}
          className="sr-only"
          aria-hidden="true"
        >
          Buat kategori pertama
        </button>
      )}
    </section>
  );
}
