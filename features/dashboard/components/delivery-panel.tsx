import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

import type { ActiveGroup } from "../types";

type DeliveryPanelProps = {
  connected: boolean;
  activeGroup: ActiveGroup;
  canViewWhatsApp: boolean;
};

export function DeliveryPanel({
  connected,
  activeGroup,
  canViewWhatsApp,
}: DeliveryPanelProps) {
  const ready = connected && Boolean(activeGroup);

  return (
    <article
      className={[
        "overflow-hidden rounded-2xl border shadow-sm",
        ready ? "border-emerald-200 bg-white" : "border-slate-200/80 bg-white",
      ].join(" ")}
    >
      <div
        className={[
          "border-b px-4 py-4 sm:px-5",
          ready
            ? "border-emerald-100 bg-emerald-50/60"
            : "border-slate-100 bg-slate-50/70",
        ].join(" ")}
      >
        <div className="flex items-start gap-3">
          <div
            className={[
              "grid h-10 w-10 shrink-0 place-items-center rounded-xl",
              ready
                ? "bg-white text-emerald-600 ring-1 ring-emerald-100"
                : "bg-white text-slate-500 ring-1 ring-slate-200",
            ].join(" ")}
          >
            <MessageCircle className="h-5 w-5" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                Delivery channel
              </p>

              <span
                className={[
                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold",
                  ready
                    ? "bg-emerald-100 text-emerald-700"
                    : connected
                      ? "bg-amber-100 text-amber-700"
                      : "bg-slate-100 text-slate-500",
                ].join(" ")}
              >
                <span
                  className={[
                    "h-1.5 w-1.5 rounded-full",
                    ready
                      ? "bg-emerald-500"
                      : connected
                        ? "bg-amber-500"
                        : "bg-slate-400",
                  ].join(" ")}
                />

                {ready ? "Ready" : connected ? "Connected" : "Optional"}
              </span>
            </div>

            <h2 className="mt-1 text-base font-bold tracking-tight text-slate-900">
              {ready ? "Siap untuk delivery" : "WhatsApp belum siap"}
            </h2>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="grid gap-2.5">
          <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3.5 py-3">
            <span className="text-xs font-semibold text-slate-600">
              Connection
            </span>

            <span className="text-xs font-medium text-slate-500">
              {connected ? "Connected" : "Not connected"}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3.5 py-3">
            <span className="text-xs font-semibold text-slate-600">
              Active group
            </span>

            <span className="max-w-[58%] truncate text-right text-xs font-medium text-slate-500">
              {activeGroup?.name ?? "Belum dipilih"}
            </span>
          </div>
        </div>

        <p className="mt-4 text-xs leading-5 text-slate-500">
          {ready
            ? `Konten siap diarahkan ke ${activeGroup?.name}.`
            : "Workspace tetap bisa digunakan tanpa WhatsApp. Hubungkan saat memang ingin mengirim."}
        </p>

        {canViewWhatsApp && (
          <Link
            href="/whatsapp"
            className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100"
          >
            <span className="text-white">
              {ready ? "Kelola WhatsApp" : "Hubungkan WhatsApp"}
            </span>

            <ArrowRight className="h-4 w-4 text-white" />
          </Link>
        )}
      </div>
    </article>
  );
}
