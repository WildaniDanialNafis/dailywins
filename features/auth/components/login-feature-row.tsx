import type { LoginFeature } from "../types";

export function LoginFeatureRow({
  icon: Icon,
  title,
  description,
}: LoginFeature) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/6 bg-white/4 p-3.5">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/6 text-slate-200 ring-1 ring-white/8">
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold text-slate-100">{title}</p>

        <p className="mt-0.5 text-[11px] leading-5 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}
