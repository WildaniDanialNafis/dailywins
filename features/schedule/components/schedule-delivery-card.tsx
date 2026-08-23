import { CheckCircle2, RefreshCw, Send } from "lucide-react";

import { LoadingSpinner } from "@/components/ui/loading-spinner";

import { ScheduleDeliveryStatus } from "./schedule-delivery-status";

import type { DeliveryState } from "../types";

type ScheduleDeliveryCardProps = {
  canSend: boolean;
  whatsappConnected: boolean;
  activeGroupName?: string;
  deliveryState: DeliveryState;
  deliveryBusy: boolean;
  deliveryError: string | null;
  totalActivities: number;
  onSend: () => void;
  onReset: () => void;
};

export function ScheduleDeliveryCard({
  canSend,
  whatsappConnected,
  activeGroupName,
  deliveryState,
  deliveryBusy,
  deliveryError,
  totalActivities,
  onSend,
  onReset,
}: ScheduleDeliveryCardProps) {
  if (!canSend) {
    return null;
  }

  const ready = whatsappConnected && Boolean(activeGroupName);

  return (
    <section className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4 shadow-sm sm:p-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-indigo-600">
        Delivery
      </p>

      <h3 className="mt-1 text-base font-bold text-slate-900">
        {ready ? "Siap dikirim" : "WhatsApp optional"}
      </h3>

      <p className="mt-1.5 text-xs leading-5 text-slate-500">
        {ready
          ? `Target: ${activeGroupName}`
          : "Hubungkan WhatsApp hanya ketika ingin melakukan delivery."}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {deliveryState !== "idle" ? (
          <ScheduleDeliveryStatus state={deliveryState} />
        ) : (
          <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 ring-1 ring-slate-200">
            Ready
          </span>
        )}
      </div>

      {deliveryError && (
        <p className="mt-3 text-xs font-medium text-red-600">{deliveryError}</p>
      )}

      <button
        type="button"
        onClick={onSend}
        disabled={deliveryBusy || totalActivities === 0}
        className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {deliveryBusy ? (
          <>
            <LoadingSpinner />

            <span className="text-white">
              {deliveryState === "preparing" ? "Menyiapkan..." : "Mengirim..."}
            </span>
          </>
        ) : deliveryState === "sent" ? (
          <>
            <CheckCircle2 className="h-4 w-4 text-white" />
            <span className="text-white">Terkirim</span>
          </>
        ) : deliveryState === "failed" ? (
          <>
            <RefreshCw className="h-4 w-4 text-white" />
            <span className="text-white">Coba lagi</span>
          </>
        ) : (
          <>
            <Send className="h-4 w-4 text-white" />
            <span className="text-white">Kirim Schedule</span>
          </>
        )}
      </button>

      {deliveryState === "sent" && (
        <button
          type="button"
          onClick={onReset}
          className="mt-2 inline-flex min-h-9 w-full items-center justify-center gap-2 rounded-xl text-xs font-semibold text-slate-500 transition hover:bg-white hover:text-indigo-600"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Siapkan pengiriman berikutnya
        </button>
      )}
    </section>
  );
}
