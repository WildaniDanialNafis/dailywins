import { CheckCircle2 } from "lucide-react";

import { WhatsAppStatusPill } from "./whatsapp-status-pill";

type WhatsAppConnectedCardProps = {
  activeGroupName?: string;
};

export function WhatsAppConnectedCard({
  activeGroupName,
}: WhatsAppConnectedCardProps) {
  return (
    <article className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-5 shadow-sm sm:p-6">
      <div className="flex items-start gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-emerald-600 ring-1 ring-emerald-100">
          <CheckCircle2 className="h-6 w-6" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-600">
              Connection status
            </p>

            <WhatsAppStatusPill connected />
          </div>

          <h2 className="mt-2 text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
            WhatsApp siap digunakan
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Channel sudah aktif. Pilih active group agar delivery siap
            sepenuhnya.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        <div className="rounded-2xl bg-white px-4 py-3 ring-1 ring-emerald-100">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
            Connection
          </p>

          <p className="mt-1 text-sm font-semibold text-emerald-700">Active</p>
        </div>

        <div className="rounded-2xl bg-white px-4 py-3 ring-1 ring-emerald-100">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
            Active group
          </p>

          <p className="mt-1 truncate text-sm font-semibold text-slate-700">
            {activeGroupName ?? "Belum dipilih"}
          </p>
        </div>
      </div>
    </article>
  );
}
