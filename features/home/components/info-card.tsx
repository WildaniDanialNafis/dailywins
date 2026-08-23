import type { InfoCardData } from "../types";

export function InfoCard({ icon: Icon, title, description }: InfoCardData) {
  return (
    <article className="min-w-0 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-50 text-indigo-600 ring-1 ring-slate-200">
        <Icon className="h-5 w-5" />
      </div>

      <h3 className="mt-4 text-sm font-bold text-slate-900">{title}</h3>

      <p className="mt-1.5 text-xs leading-5 text-slate-500">{description}</p>
    </article>
  );
}
