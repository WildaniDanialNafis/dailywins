"use client";

import {
  Copy,
  GripVertical,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import type { DragEvent } from "react";

import { LoadingSpinner } from "@/components/ui/loading-spinner";

import { formatDuration, getDuration } from "../utils";
import type { ScheduleBlock } from "../types";

type ScheduleItemProps = {
  item: ScheduleBlock;
  index: number;
  canManage: boolean;

  selected: boolean;
  menuOpen: boolean;

  deleting: boolean;
  duplicating: boolean;
  disabled: boolean;

  onToggleSelected: () => void;
  onDragStart: () => void;
  onDragEnd: () => void;
  onDragOver: (event: DragEvent<HTMLDivElement>) => void;
  onDrop: () => void;

  onToggleMenu: () => void;
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
};

export function ScheduleItem({
  item,
  index,
  canManage,
  selected,
  menuOpen,
  deleting,
  duplicating,
  disabled,
  onToggleSelected,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  onToggleMenu,
  onEdit,
  onDuplicate,
  onDelete,
}: ScheduleItemProps) {
  const duration = getDuration(item.start, item.end);

  return (
    <div
      draggable={canManage && !disabled}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={[
        "group flex min-w-0 items-center gap-2.5 px-4 py-4 transition sm:gap-3 sm:px-5",
        selected ? "bg-indigo-50/40" : "hover:bg-slate-50",
      ].join(" ")}
    >
      {canManage && (
        <input
          type="checkbox"
          checked={selected}
          onChange={onToggleSelected}
          disabled={disabled}
          className="h-4 w-4 shrink-0 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          aria-label={`Pilih ${item.activity}`}
        />
      )}

      {canManage && (
        <GripVertical
          className={[
            "hidden h-4 w-4 shrink-0 text-slate-300 sm:block",
            disabled
              ? "cursor-not-allowed opacity-40"
              : "cursor-grab transition group-hover:text-slate-400 active:cursor-grabbing",
          ].join(" ")}
          aria-hidden="true"
        />
      )}

      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-indigo-50 text-xs font-bold text-indigo-600">
        {index + 1}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-2">
          <div className="flex shrink-0 items-center gap-2">
            <span className="text-xs font-semibold tabular-nums text-slate-600">
              {item.start}
            </span>

            <span className="text-slate-300" aria-hidden="true">
              –
            </span>

            <span className="text-xs font-semibold tabular-nums text-slate-600">
              {item.end}
            </span>
          </div>

          <span className="hidden text-slate-300 sm:inline" aria-hidden="true">
            /
          </span>

          <p
            className="min-w-0 truncate text-sm font-semibold text-slate-800"
            title={item.activity}
          >
            {item.activity}
          </p>
        </div>

        <div className="mt-1 flex flex-wrap items-center gap-1.5">
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-semibold text-slate-500">
            {formatDuration(duration)}
          </span>

          {selected && (
            <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[9px] font-semibold text-indigo-700">
              Dipilih
            </span>
          )}
        </div>
      </div>

      {canManage && (
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={onToggleMenu}
            disabled={disabled}
            className="grid h-9 w-9 place-items-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-4 focus:ring-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label={`Menu ${item.activity}`}
            aria-expanded={menuOpen}
            aria-haspopup="menu"
          >
            {deleting || duplicating ? (
              <LoadingSpinner />
            ) : (
              <MoreHorizontal className="h-4 w-4" />
            )}
          </button>

          {menuOpen && (
            <div
              role="menu"
              className="absolute right-0 top-10 z-50 w-[min(12rem,calc(100vw-2rem))] rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-900/10"
            >
              <button
                type="button"
                role="menuitem"
                onClick={onEdit}
                disabled={disabled}
                className="flex min-h-10 w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-medium text-slate-700 transition hover:bg-amber-50 hover:text-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Pencil className="h-4 w-4 text-amber-500" />
                Edit
              </button>

              <button
                type="button"
                role="menuitem"
                onClick={onDuplicate}
                disabled={disabled}
                className="flex min-h-10 w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-40"
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
                role="menuitem"
                onClick={onDelete}
                disabled={disabled}
                className="flex min-h-10 w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-medium text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {deleting ? <LoadingSpinner /> : <Trash2 className="h-4 w-4" />}

                {deleting ? "Menghapus..." : "Hapus"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
