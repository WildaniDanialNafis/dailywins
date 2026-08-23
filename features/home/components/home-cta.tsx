import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

import { APP_NAME } from "../data/home-data";

export function HomeCta() {
  return (
    <section className="mt-5 overflow-hidden rounded-3xl bg-slate-950 p-5 text-white shadow-xl sm:rounded-[28px] sm:p-7 lg:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-300">
            <ShieldCheck className="h-3.5 w-3.5" />
            Private access
          </div>

          <h2 className="mt-4 text-xl font-bold tracking-tight sm:text-2xl">
            Masuk untuk mulai menggunakan {APP_NAME}.
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Kelola workflow dari satu tempat. Hubungkan WhatsApp kemudian ketika
            memang diperlukan untuk delivery.
          </p>

          <div className="mt-5 grid gap-2 text-xs text-slate-400 sm:flex sm:flex-wrap sm:gap-x-5 sm:gap-y-2">
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              Role-aware
            </span>

            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              Structured workflow
            </span>

            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              Delivery optional
            </span>
          </div>
        </div>

        <Link
          href="/login"
          className="inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-slate-900 transition duration-200 hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-white/10 sm:w-auto"
        >
          <span>Sign in</span>

          <ArrowRight className="h-4 w-4 text-slate-700" />
        </Link>
      </div>
    </section>
  );
}
