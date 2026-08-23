import Link from "next/link";
import { ArrowRight, LockKeyhole } from "lucide-react";

import { quickFacts } from "../data/home-data";

import { WorkflowPreview } from "./workflow-preview";

export function HeroSection() {
  return (
    <section
      id="main-content"
      className="scroll-mt-6 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24"
    >
      <div className="grid items-center gap-10 md:gap-12 lg:grid-cols-[1fr_0.94fr] lg:gap-14 xl:gap-20">
        <div className="min-w-0">
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-indigo-100 bg-white/85 px-3 py-1.5 text-[11px] font-semibold text-indigo-700 shadow-sm backdrop-blur sm:text-xs">
            <LockKeyhole className="h-3.5 w-3.5 shrink-0" />
            <span>Private operations workspace</span>
          </div>

          <h1 className="mt-5 max-w-3xl text-[2.35rem] font-bold leading-[1.03] tracking-tighter text-slate-950 sm:text-5xl md:text-[3.5rem] lg:text-6xl xl:text-[4.2rem]">
            Semua workflow DailyWins,
            <span className="block text-indigo-600">satu workspace.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base sm:leading-8">
            Kelola evaluasi, polling, schedule, aktivitas harian, dan distribusi
            WhatsApp dari satu workspace yang terstruktur.
          </p>

          <div className="mt-7 grid gap-2.5 sm:flex sm:flex-wrap">
            <Link
              href="/login"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100 sm:w-auto"
            >
              <span>Masuk ke Workspace</span>

              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href="#features"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition duration-200 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100 sm:w-auto"
            >
              Lihat fitur
            </a>
          </div>

          <div className="mt-8 grid gap-3 text-xs text-slate-500 sm:flex sm:flex-wrap sm:gap-x-5 sm:gap-y-3">
            {quickFacts.map((fact) => {
              const Icon = fact.icon;

              return (
                <span
                  key={fact.label}
                  className="inline-flex min-w-0 items-center gap-2"
                >
                  <Icon className="h-4 w-4 shrink-0 text-indigo-500" />
                  <span>{fact.label}</span>
                </span>
              );
            })}
          </div>
        </div>

        <WorkflowPreview />
      </div>
    </section>
  );
}
