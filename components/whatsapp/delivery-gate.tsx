"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle, X } from "lucide-react";

import { useWorkspace } from "@/components/workspace/workspace-context";

type DeliveryGateProps = {
  open: boolean;
  onClose: () => void;
};

export function DeliveryGate({ open, onClose }: DeliveryGateProps) {
  const { whatsappConnected, activeGroup } = useWorkspace();

  if (!open) {
    return null;
  }

  const connected = whatsappConnected;

  const hasGroup = Boolean(activeGroup);

  const ready = connected && hasGroup;

  const title = !connected ? "WhatsApp belum terhubung" : "Pilih active group";

  const description = !connected
    ? "Hubungkan WhatsApp terlebih dahulu sebelum mengirim."
    : "WhatsApp sudah terhubung, tetapi belum ada grup yang dipilih sebagai target.";

  const actionLabel = !connected ? "Hubungkan WhatsApp" : "Pilih Active Group";

  return (
    <div
      className="fixed inset-0 z-90 flex items-end justify-center bg-slate-950/35 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delivery-gate-title"
        aria-describedby="delivery-gate-description"
        className="w-full max-w-md rounded-t-3xl border border-slate-200 bg-white shadow-2xl sm:rounded-3xl"
      >
        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <div
              className={[
                "grid h-11 w-11 shrink-0 place-items-center rounded-2xl",
                ready
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-amber-50 text-amber-600",
              ].join(" ")}
            >
              {ready ? (
                <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
              ) : (
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-indigo-500">
                Delivery
              </p>

              <h2
                id="delivery-gate-title"
                className="mt-1 text-lg font-bold tracking-tight text-slate-900"
              >
                {title}
              </h2>

              <p
                id="delivery-gate-description"
                className="mt-2 text-sm leading-6 text-slate-500"
              >
                {description}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              aria-label="Tutup"
              title="Tutup"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-5 rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold text-slate-600">
                WhatsApp
              </span>

              <span
                className={[
                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold",
                  connected
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-700",
                ].join(" ")}
              >
                <span
                  aria-hidden="true"
                  className={[
                    "h-1.5 w-1.5 rounded-full",
                    connected ? "bg-emerald-500" : "bg-amber-500",
                  ].join(" ")}
                />

                {connected ? "Connected" : "Not connected"}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="text-xs font-semibold text-slate-600">
                Active group
              </span>

              <span className="max-w-[55%] truncate text-right text-xs text-slate-500">
                {activeGroup?.name ?? "Belum dipilih"}
              </span>
            </div>
          </div>

          <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="ui-button ui-button-secondary w-full sm:w-auto"
            >
              Batal
            </button>

            <Link
              href="/whatsapp"
              onClick={onClose}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 sm:w-auto"
            >
              <span className="text-white">{actionLabel}</span>

              <ArrowRight className="h-4 w-4 shrink-0 text-white" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
