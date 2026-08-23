import { CheckCircle2 } from "lucide-react";

import type { WorkflowStep } from "../types";

type WorkflowCardProps = {
  steps: WorkflowStep[];
};

export function WorkflowCard({ steps }: WorkflowCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
          <CheckCircle2 className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-indigo-500">
            Workflow
          </p>

          <h2 className="mt-1 text-lg font-bold tracking-tight text-slate-900">
            Cara kerja DailyWins
          </h2>
        </div>
      </div>

      <div className="mt-5 space-y-2.5">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className="group flex items-start gap-3 rounded-xl border border-transparent bg-slate-50 p-3 transition hover:border-slate-200 hover:bg-white"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-[10px] font-bold text-indigo-600 ring-1 ring-slate-200">
              {step.number}
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-xs font-semibold text-slate-800">
                  {step.title}
                </p>

                {index === 0 && (
                  <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[9px] font-semibold text-indigo-600">
                    Start
                  </span>
                )}
              </div>

              <p className="mt-1 text-[11px] leading-5 text-slate-500">
                {step.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-indigo-100 bg-indigo-50/60 px-3.5 py-3">
        <div className="flex items-start gap-2.5">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />

          <p className="text-[11px] leading-5 text-indigo-800">
            DailyWins memisahkan proses membuat konten dari proses delivery,
            sehingga WhatsApp tetap opsional.
          </p>
        </div>
      </div>
    </article>
  );
}
