import type { WeekDay } from "../types";

type ScheduleDayPillProps = {
  day: WeekDay;
  count: number;
  active: boolean;
  onClick: () => void;
};

export function ScheduleDayPill({
  day,
  count,
  active,
  onClick,
}: ScheduleDayPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "group relative min-w-23 flex-1 rounded-2xl border px-3 py-3 text-left transition duration-150",
        "focus:outline-none focus:ring-4 focus:ring-indigo-100",
        "sm:min-w-0",
        active
          ? "border-indigo-200 bg-indigo-50 shadow-sm"
          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50",
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={[
            "text-[10px] font-bold uppercase tracking-[0.12em]",
            active
              ? "text-indigo-600"
              : "text-slate-400 group-hover:text-slate-500",
          ].join(" ")}
        >
          {day.slice(0, 3)}
        </span>

        {active && <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />}
      </div>

      <div className="mt-2 flex items-end justify-between gap-2">
        <span
          className={[
            "text-xl font-bold tracking-tight",
            active ? "text-indigo-700" : "text-slate-900",
          ].join(" ")}
        >
          {count}
        </span>

        <span
          className={[
            "text-[10px] font-medium",
            active ? "text-indigo-400" : "text-slate-400",
          ].join(" ")}
        >
          aktivitas
        </span>
      </div>
    </button>
  );
}
