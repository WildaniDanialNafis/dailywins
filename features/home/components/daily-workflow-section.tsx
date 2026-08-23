import { CalendarClock, Check, CheckCircle2 } from "lucide-react";

import { workflowPreview } from "../data/home-data";

export function DailyWorkflowSection() {
  return (
    <section className="mt-5 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm sm:rounded-[28px]">
      <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-slate-950 p-5 text-white sm:p-7 lg:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-300">
            <CalendarClock className="h-3.5 w-3.5" />
            Daily workflow
          </div>

          <h2 className="mt-4 text-xl font-bold tracking-tight sm:text-2xl">
            Ritme harian yang lebih terstruktur.
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
            Atur aktivitas berdasarkan waktu dan prioritaskan apa yang perlu
            dilakukan sepanjang hari.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1.5 text-[10px] font-semibold text-slate-300 ring-1 ring-white/10">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              Time-based
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1.5 text-[10px] font-semibold text-slate-300 ring-1 ring-white/10">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              Ordered
            </span>
          </div>
        </div>

        <div className="bg-slate-50 p-4 sm:p-6">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3.5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-indigo-500">
                  Today
                </p>

                <p className="mt-1 text-sm font-bold text-slate-900">
                  Daily Schedule
                </p>
              </div>

              <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-semibold text-indigo-700">
                3 / 6
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {workflowPreview.map((item) => (
                <div
                  key={item.time}
                  className="flex items-center gap-3 px-4 py-3"
                >
                  <span className="w-11 shrink-0 text-xs font-semibold tabular-nums text-slate-500">
                    {item.time}
                  </span>

                  <span className="h-7 w-1 shrink-0 rounded-full bg-indigo-500" />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {item.title}
                    </p>

                    <span
                      className={[
                        "mt-1 inline-flex items-center rounded-full px-2 py-1 text-[9px] font-semibold",
                        item.tone,
                      ].join(" ")}
                    >
                      {item.type}
                    </span>
                  </div>

                  <span className="grid h-8 w-8 place-items-center rounded-full border border-emerald-500 bg-emerald-500 text-white">
                    <Check className="h-4 w-4" />
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 bg-slate-50/60 px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] text-slate-400">
                  Simulasi status selesai
                </span>

                <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full w-1/2 rounded-full bg-indigo-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
