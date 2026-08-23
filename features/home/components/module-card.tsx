import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { HomeModule } from "../types";

export function ModuleCard({ module }: { module: HomeModule }) {
  const Icon = module.icon;

  return (
    <Link
      href={module.href}
      className={[
        "group min-w-0 rounded-2xl border bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-100 sm:p-5",
        module.accent,
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className={[
            "grid h-11 w-11 shrink-0 place-items-center rounded-2xl",
            module.tone,
          ].join(" ")}
        >
          <Icon className="h-5 w-5" />
        </div>

        <ArrowRight className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-slate-500" />
      </div>

      <h3 className="mt-5 text-sm font-bold text-slate-900">{module.title}</h3>

      <p className="mt-1.5 text-xs leading-5 text-slate-500">
        {module.description}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-full bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-500">
          {module.detail}
        </span>
      </div>

      <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold text-indigo-600">
        Buka modul
        <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
}
