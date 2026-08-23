import type { StatCardProps } from "../types";

export function ReportStatCard({
  label,
  value,
  description,
  icon: Icon,
  tone,
}: StatCardProps) {
  return (
    <article className="min-w-0 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition duration-200 hover:shadow-md sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
            {label}
          </p>

          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            {value}
          </p>

          <p className="mt-1 truncate text-xs text-slate-500">{description}</p>
        </div>

        <div
          className={[
            "grid h-10 w-10 shrink-0 place-items-center rounded-xl sm:h-11 sm:w-11 sm:rounded-2xl",
            tone,
          ].join(" ")}
        >
          <Icon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
        </div>
      </div>
    </article>
  );
}
