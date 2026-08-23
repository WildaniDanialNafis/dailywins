import { CalendarDays, Plus, Search, X } from "lucide-react";

import { ButtonContent } from "@/components/ui/button-content";
import type { WeeklyItem, WeekDay } from "../types";

import { ScheduleEmptyState } from "./schedule-empty-state";
import { ScheduleItem } from "./schedule-item";

type ScheduleListProps = {
  activeDay: WeekDay;
  currentItemsCount: number;
  visibleItems: WeeklyItem[];
  canManage: boolean;
  saving: boolean;
  deletingId: number | null;
  duplicatingId: number | null;
  editingId: number | null;
  editingName: string;
  menuId: number | null;
  search: string;
  newActivity: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  onNewActivityChange: (value: string) => void;
  onAddActivity: () => void;
  onEditingNameChange: (value: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onStartEdit: (item: WeeklyItem) => void;
  onDuplicate: (item: WeeklyItem) => void;
  onRequestDelete: (item: WeeklyItem) => void;
  onToggleMenu: (id: number) => void;
  onAdd: () => void;
};

export function ScheduleList({
  activeDay,
  currentItemsCount,
  visibleItems,
  canManage,
  saving,
  deletingId,
  duplicatingId,
  editingId,
  editingName,
  menuId,
  search,
  newActivity,
  onSearchChange,
  onClearSearch,
  onNewActivityChange,
  onAddActivity,
  onEditingNameChange,
  onSaveEdit,
  onCancelEdit,
  onStartEdit,
  onDuplicate,
  onRequestDelete,
  onToggleMenu,
  onAdd,
}: ScheduleListProps) {
  return (
    <section className="min-w-0 overflow-visible rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-4 py-4 sm:px-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-semibold text-indigo-700">
                <CalendarDays className="h-3 w-3" />
                Selected day
              </span>

              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-500">
                {currentItemsCount} aktivitas
              </span>
            </div>

            <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900">
              {activeDay}
            </h2>
          </div>

          <div className="relative w-full lg:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="search"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Cari aktivitas..."
              className="ui-input w-full pl-10 pr-10"
            />

            {search && (
              <button
                type="button"
                onClick={onClearSearch}
                className="absolute right-1.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                aria-label="Bersihkan pencarian"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {canManage && (
        <div className="border-b border-slate-100 bg-slate-50/60 px-4 py-4 sm:px-5">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                Tambah aktivitas
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Aktivitas baru akan masuk ke{" "}
                <span className="font-semibold text-slate-700">
                  {activeDay}
                </span>
                .
              </p>
            </div>

            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              <input
                value={newActivity}
                onChange={(event) => onNewActivityChange(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    onAddActivity();
                  }
                }}
                placeholder="Contoh: Weekly Review"
                disabled={saving}
                className="ui-input min-h-11 min-w-0 flex-1 sm:w-64"
              />

              <button
                type="button"
                onClick={onAddActivity}
                disabled={saving}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ButtonContent loading={saving} loadingText="Menyimpan...">
                  <Plus className="h-4 w-4 text-white" />
                  <span className="text-white">Tambah</span>
                </ButtonContent>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="divide-y divide-slate-100">
        {visibleItems.map((item, index) => (
          <ScheduleItem
            key={item.id}
            item={item}
            index={index}
            activeDay={activeDay}
            canManage={canManage}
            editing={editingId === item.id}
            editingName={editingName}
            menuOpen={menuId === item.id}
            deleting={deletingId === item.id}
            duplicating={duplicatingId === item.id}
            saving={saving}
            onEditingNameChange={onEditingNameChange}
            onSaveEdit={onSaveEdit}
            onCancelEdit={onCancelEdit}
            onStartEdit={() => onStartEdit(item)}
            onDuplicate={() => onDuplicate(item)}
            onRequestDelete={() => onRequestDelete(item)}
            onToggleMenu={() => onToggleMenu(menuId === item.id ? 0 : item.id)}
          />
        ))}

        {visibleItems.length === 0 && (
          <ScheduleEmptyState
            search={search}
            canManage={canManage}
            activeDay={activeDay}
            onClear={onClearSearch}
            onAdd={onAdd}
          />
        )}
      </div>
    </section>
  );
}
