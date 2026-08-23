import Link from "next/link";
import { ChevronRight } from "lucide-react";

import type { QuickAction as QuickActionType } from "../types";

export function QuickAction({
  href,
  title,
  description,
  icon: Icon,
  tone,
}: QuickActionType) {
  return (
    <Link
      href={href}
      className="group flex min-w-0 items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-100 sm:p-5"
    >
      <div
        className={[
          "grid h-10 w-10 shrink-0 place-items-center rounded-xl",
          tone,
        ].join(" ")}
      >
        <Icon className="h-5 w-5" />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-bold text-slate-900">{title}</h3>

        <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>

      <ChevronRight className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-indigo-500" />
    </Link>
  );
}
