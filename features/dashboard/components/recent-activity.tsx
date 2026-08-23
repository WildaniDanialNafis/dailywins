import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { RecentActivity as RecentActivityType } from "../types";

type RecentActivityProps = {
  items: RecentActivityType[];
  canViewReports: boolean;
};

export function RecentActivity({ items, canViewReports }: RecentActivityProps) {
  return (
    <article className="min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-4 sm:px-5">
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-indigo-500">
            Activity
          </p>

          <h2 className="mt-1 text-lg font-bold tracking-tight text-slate-900">
            Aktivitas terbaru
          </h2>
        </div>

        {canViewReports && (
          <Link
            href="/reports"
            className="inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-50 hover:text-indigo-700"
          >
            Laporan
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>

      <div className="divide-y divide-slate-100">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex min-w-0 items-start gap-3 px-4 py-4 sm:px-5"
            >
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-slate-50 text-slate-500">
                <Icon className="h-4 w-4" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <p className="min-w-0 text-sm font-semibold text-slate-800">
                    {item.title}
                  </p>

                  <span className="shrink-0 text-[10px] font-medium text-slate-400">
                    {item.time}
                  </span>
                </div>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}
