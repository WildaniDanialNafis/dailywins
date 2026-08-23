import Link from "next/link";
import { ArrowRight, LockKeyhole, Sparkles } from "lucide-react";

import { APP_NAME, APP_SUBTITLE } from "../data/home-data";

export function HomeHeader() {
  return (
    <header className="flex min-h-16 items-center justify-between gap-3 py-4 sm:min-h-19">
      <Link
        href="/"
        className="group flex min-w-0 items-center gap-2.5 sm:gap-3"
        aria-label={`${APP_NAME} home`}
      >
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-indigo-600 shadow-sm ring-1 ring-indigo-100 transition duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md sm:h-10 sm:w-10 sm:rounded-2xl">
          <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-bold tracking-tight text-slate-950 sm:text-[15px]">
            {APP_NAME}
          </p>

          <p className="truncate text-[9px] font-medium uppercase tracking-[0.12em] text-slate-400 sm:text-[10px] sm:tracking-[0.14em]">
            {APP_SUBTITLE}
          </p>
        </div>
      </Link>

      <Link
        href="/login"
        className="inline-flex min-h-10 shrink-0 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 shadow-sm transition duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-100 sm:gap-2 sm:px-4 sm:text-sm"
      >
        <LockKeyhole className="h-3.5 w-3.5 text-slate-400 sm:h-4 sm:w-4" />

        <span>Sign in</span>

        <ArrowRight className="h-3.5 w-3.5 text-slate-400 sm:h-4 sm:w-4" />
      </Link>
    </header>
  );
}
