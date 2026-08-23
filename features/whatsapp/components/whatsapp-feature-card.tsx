import type { FeatureCardData } from "../types";

type WhatsAppFeatureCardProps = FeatureCardData;

export function WhatsAppFeatureCard({
  icon: Icon,
  title,
  description,
}: WhatsAppFeatureCardProps) {
  return (
    <div className="flex min-w-0 items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-slate-500 ring-1 ring-slate-200">
        <Icon className="h-4 w-4" />
      </span>

      <div className="min-w-0">
        <p className="text-xs font-semibold text-slate-700">{title}</p>

        <p className="mt-0.5 text-[11px] leading-5 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}
