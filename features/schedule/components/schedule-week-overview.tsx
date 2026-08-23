import { ChevronLeft, ChevronRight } from "lucide-react";

import { ScheduleDayPill } from "./schedule-day-pill";

import type { WeekDay } from "../types";

function Metric({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
        {value}
      </p>

      <p className="truncate text-[11px] text-slate-400">{description}</p>
    </div>
  );
}

type ScheduleWeekOverviewProps = {
  days: WeekDay[];
  counts: Record<WeekDay, number>;
  activeDay: WeekDay;
  currentDayIndex: number;
  currentItemsCount: number;
  totalActivities: number;
  activeDays: number;
  deliveryReady: boolean;
  onSelectDay: (day: WeekDay) => void;
  onPrevious: () => void;
  onNext: () => void;
};

export function ScheduleWeekOverview({
  days,
  counts,
  activeDay,
  currentDayIndex,
  currentItemsCount,
  totalActivities,
  activeDays,
  deliveryReady,
  onSelectDay,
  onPrevious,
  onNext,
}: ScheduleWeekOverviewProps) {
  return (
    <section className="mb-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-4 py-4 sm:px-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-indigo-500">
              Weekly overview
            </p>

            <div className="mt-1 flex flex-wrap items-end gap-x-3 gap-y-1">
              <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                {activeDay}
              </h2>

              <span className="text-xs text-slate-400">
                {currentItemsCount} aktivitas
              </span>
            </div>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Pilih hari untuk melihat dan mengatur aktivitas.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center sm:gap-4">
            <Metric
              label="Aktivitas"
              value={String(totalActivities)}
              description="Minggu ini"
            />

            <div className="hidden h-8 w-px bg-slate-200 sm:block" />

            <Metric
              label="Hari aktif"
              value={`${activeDays}/7`}
              description="Terisi"
            />

            <div className="hidden h-8 w-px bg-slate-200 sm:block" />

            <Metric
              label="Delivery"
              value={deliveryReady ? "Ready" : "Optional"}
              description={deliveryReady ? "Target tersedia" : "Saat send"}
            />
          </div>
        </div>
      </div>

      <div className="px-3 py-3 sm:px-4 sm:py-4">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {days.map((day) => (
            <ScheduleDayPill
              key={day}
              day={day}
              count={counts[day]}
              active={day === activeDay}
              onClick={() => onSelectDay(day)}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-3 py-2.5 sm:px-4">
        <button
          type="button"
          onClick={onPrevious}
          disabled={currentDayIndex === 0}
          className="inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold text-slate-500 transition hover:bg-white hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" />
          Sebelumnya
        </button>

        <span className="text-[10px] font-medium text-slate-400">
          {currentDayIndex + 1} / 7
        </span>

        <button
          type="button"
          onClick={onNext}
          disabled={currentDayIndex === days.length - 1}
          className="inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold text-slate-500 transition hover:bg-white hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-30"
        >
          Berikutnya
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
