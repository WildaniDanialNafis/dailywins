import Link from "next/link";
import { ArrowRight, CalendarClock, Check } from "lucide-react";

import { CompletionRing } from "./completion-ring";
import { ScheduleTypePill } from "./schedule-type-pill";

import type { ScheduleItem } from "../types";

type TodayScheduleProps = {
  items: ScheduleItem[];
  completedItems: Set<string>;
  completionCount: number;
  completionPercentage: number;
  nextActivity?: ScheduleItem;
  canViewDailySchedule: boolean;
  onToggle: (time: string, activity: string) => void;
};

export function TodaySchedule({
  items,
  completedItems,
  completionCount,
  completionPercentage,
  nextActivity,
  canViewDailySchedule,
  onToggle,
}: TodayScheduleProps) {
  return (
    <article className="min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-4 py-4 sm:px-5 sm:py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-semibold text-indigo-700">
                <CalendarClock className="h-3 w-3" />
                Today
              </span>

              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-500">
                {completionCount}/{items.length}
              </span>
            </div>

            <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900">
              Daily Schedule
            </h2>

            <p className="mt-1 text-xs leading-5 text-slate-400">
              {nextActivity
                ? `Berikutnya: ${nextActivity.activity} · ${nextActivity.time}`
                : "Semua aktivitas hari ini selesai."}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <CompletionRing percentage={completionPercentage} />

            {canViewDailySchedule && (
              <Link
                href="/daily-schedule"
                className="hidden min-h-9 items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-50 sm:inline-flex"
              >
                Lihat semua
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>

        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-indigo-500 transition-all duration-500"
            style={{
              width: `${completionPercentage}%`,
            }}
          />
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {items.map((item) => {
          const key = `${item.time}-${item.activity}`;

          const completed = completedItems.has(key);

          const isNext =
            nextActivity?.time === item.time &&
            nextActivity.activity === item.activity;

          const lineTone = {
            routine: "bg-emerald-500",
            focus: "bg-indigo-500",
            learning: "bg-violet-500",
          }[item.type];

          return (
            <button
              key={key}
              type="button"
              onClick={() => onToggle(item.time, item.activity)}
              className={[
                "group flex w-full items-center gap-3 px-4 py-3.5 text-left transition hover:bg-slate-50 sm:px-5",
                completed ? "bg-slate-50/70" : "",
              ].join(" ")}
            >
              <span className="w-12 shrink-0 text-xs font-semibold tabular-nums text-slate-500">
                {item.time}
              </span>

              <span
                className={[
                  "h-8 w-1 shrink-0 rounded-full transition",
                  lineTone,
                  completed ? "opacity-30" : "",
                ].join(" ")}
              />

              <div className="min-w-0 flex-1">
                <div className="flex min-w-0 flex-wrap items-center gap-2">
                  <p
                    className={[
                      "min-w-0 truncate text-sm font-semibold",
                      completed
                        ? "text-slate-400 line-through"
                        : "text-slate-800",
                    ].join(" ")}
                  >
                    {item.activity}
                  </p>

                  {isNext && !completed && (
                    <span className="rounded-full bg-indigo-50 px-2 py-1 text-[9px] font-semibold text-indigo-700">
                      Next
                    </span>
                  )}
                </div>

                <div className="mt-1.5">
                  <ScheduleTypePill type={item.type} />
                </div>
              </div>

              <span
                className={[
                  "grid h-8 w-8 shrink-0 place-items-center rounded-full border transition",
                  completed
                    ? "border-emerald-500 bg-emerald-500 text-white"
                    : "border-slate-200 bg-white text-slate-300 group-hover:border-indigo-200 group-hover:text-indigo-300",
                ].join(" ")}
                aria-hidden="true"
              >
                {completed && <Check className="h-4 w-4" />}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <p className="text-[11px] leading-5 text-slate-400">
          Klik aktivitas untuk mensimulasikan status selesai.
        </p>

        {canViewDailySchedule && (
          <Link
            href="/daily-schedule"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 transition hover:text-indigo-600"
          >
            <CalendarClock className="h-4 w-4" />
            Atur waktu & urutan
          </Link>
        )}
      </div>
    </article>
  );
}
