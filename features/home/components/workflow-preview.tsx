"use client";

import { BarChart3, Check, Play } from "lucide-react";

import {
  APP_NAME,
  APP_SUBTITLE,
  stats,
  workflowSteps,
} from "../data/home-data";
import { useWorkflowPreview } from "../hooks/use-workflow-preview";

export function WorkflowPreview() {
  const {
    activeStep,
    setActiveStep,
    setIsPaused,
    currentWorkflow,
    currentWorkflowProgress,
  } = useWorkflowPreview();

  return (
    <div
      className="relative mx-auto w-full max-w-155 lg:max-w-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        aria-hidden="true"
        className="absolute -inset-3 rounded-[28px] bg-linear-to-br from-indigo-100/80 via-white/20 to-violet-100/70 blur-2xl sm:-inset-4 sm:rounded-[36px]"
      />

      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 shadow-2xl shadow-slate-200/70 sm:rounded-[28px]">
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3.5 sm:px-5 sm:py-4">
          <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-indigo-50 text-indigo-600 sm:h-10 sm:w-10">
              <BarChart3 className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-slate-900">
                {APP_NAME}
              </p>

              <p className="mt-0.5 truncate text-[9px] uppercase tracking-[0.13em] text-slate-400 sm:text-[10px]">
                {APP_SUBTITLE}
              </p>
            </div>
          </div>

          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            Ready
          </span>
        </div>

        <div className="grid gap-3.5 p-4 sm:gap-4 sm:p-5">
          <div className="grid gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-3.5 sm:p-4 md:grid-cols-[auto_1fr_auto] md:items-center">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-emerald-600 ring-1 ring-emerald-100">
              <BarChart3 className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-600">
                  Delivery
                </p>
              </div>

              <p className="mt-1 text-sm font-bold text-slate-900">
                WhatsApp optional
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Connect hanya ketika siap mengirim.
              </p>
            </div>

            <div className="hidden rounded-xl bg-white px-3 py-2 text-right ring-1 ring-emerald-100 md:block">
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">
                Status
              </p>

              <p className="mt-1 text-xs font-semibold text-emerald-700">
                Ready
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="min-w-0 rounded-2xl border border-slate-100 bg-slate-50 p-3.5 sm:p-4"
              >
                <p className="truncate text-[9px] font-bold uppercase tracking-[0.13em] text-slate-400 sm:text-[10px]">
                  {stat.label}
                </p>

                <p className="mt-1.5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {stat.value}
                </p>

                <p className="mt-0.5 text-xs text-slate-400">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs font-semibold text-slate-800">
                    Workflow
                  </p>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2 py-1 text-[10px] font-semibold text-indigo-700">
                    <Play className="h-2.5 w-2.5 fill-current" />
                    Simulated
                  </span>
                </div>

                <p className="mt-1 text-[11px] text-slate-400">
                  Create → Plan → Connect → Send
                </p>
              </div>

              <span className="shrink-0 text-xs font-semibold text-indigo-600">
                {activeStep + 1}/{workflowSteps.length}
              </span>
            </div>

            <div className="mt-3 grid gap-1.5 sm:mt-4 sm:gap-2">
              {workflowSteps.map((step, index) => {
                const Icon = step.icon;
                const active = index === activeStep;
                const complete = index < activeStep;

                return (
                  <button
                    key={step.label}
                    type="button"
                    onClick={() => setActiveStep(index)}
                    className={[
                      "flex min-w-0 items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left transition duration-200 sm:gap-3",
                      active
                        ? "border-indigo-100 bg-indigo-50/70"
                        : "border-transparent bg-slate-50 hover:border-slate-200 hover:bg-white",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "grid h-8 w-8 shrink-0 place-items-center rounded-lg",
                        complete
                          ? "bg-emerald-50 text-emerald-600"
                          : active
                            ? "bg-white text-indigo-600 ring-1 ring-indigo-100"
                            : "bg-white text-slate-400 ring-1 ring-slate-200",
                      ].join(" ")}
                    >
                      {complete ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Icon className="h-4 w-4" />
                      )}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span
                        className={[
                          "block truncate text-xs font-semibold",
                          active ? "text-slate-900" : "text-slate-700",
                        ].join(" ")}
                      >
                        {step.label}
                      </span>

                      <span className="mt-0.5 block truncate text-[10px] text-slate-400 sm:text-[11px]">
                        {step.description}
                      </span>
                    </span>

                    {active && (
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-3 overflow-hidden rounded-full bg-slate-100 sm:mt-4">
              <div
                className="h-1.5 rounded-full bg-indigo-500 transition-all duration-500"
                style={{
                  width: `${currentWorkflowProgress}%`,
                }}
              />
            </div>

            <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
              <p className="truncate text-xs font-semibold text-slate-700">
                {currentWorkflow.label}
              </p>

              <p className="truncate text-[10px] text-slate-400 sm:text-right">
                {currentWorkflow.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
