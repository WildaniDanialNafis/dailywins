import { ShieldCheck } from "lucide-react";

type WhatsAppDeliveryReadinessProps = {
  hasActiveGroup: boolean;
  activeGroupName?: string;
  progress: number;
};

export function WhatsAppDeliveryReadiness({
  hasActiveGroup,
  activeGroupName,
  progress,
}: WhatsAppDeliveryReadinessProps) {
  return (
    <article className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
          <ShieldCheck className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-indigo-500">
            Delivery readiness
          </p>

          <h2 className="mt-1 text-sm font-bold text-slate-900">
            {hasActiveGroup ? "Ready for delivery" : "Pilih active group"}
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            {hasActiveGroup
              ? `Konten DailyWins akan diarahkan ke ${activeGroupName}.`
              : "Pilih satu grup agar semua modul delivery memiliki target yang jelas."}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between gap-3 text-[10px] font-semibold text-slate-400">
          <span>Setup progress</span>
          <span>{progress}%</span>
        </div>

        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-indigo-500 transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>
    </article>
  );
}
