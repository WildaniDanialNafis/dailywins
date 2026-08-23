import { CalendarDays, CheckCircle2, RefreshCw, Send } from "lucide-react";

import { LoadingSpinner } from "@/components/ui/loading-spinner";

import { ScheduleDeliveryStatus } from "./schedule-delivery-status";

import type { DeliveryState } from "../types";

type ScheduleHeaderProps = {
  canSend: boolean;
  totalActivities: number;
  deliveryState: DeliveryState;
  deliveryBusy: boolean;
  onSend: () => void;
};

export function ScheduleHeader({
  canSend,
  totalActivities,
  deliveryState,
  deliveryBusy,
  onSend,
}: ScheduleHeaderProps) {
  return (
    <header className="mb-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div className="min-w-0">
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-sky-700 sm:text-xs">
            <CalendarDays className="h-3.5 w-3.5 shrink-0" />

            <span className="truncate">DailyWins · Weekly Planner</span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <h1 className="text-[2rem] font-bold tracking-[-0.04em] text-slate-950 sm:text-4xl">
              Schedule
            </h1>

            <ScheduleDeliveryStatus state={deliveryState} />
          </div>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Susun aktivitas berdasarkan hari dalam satu tampilan yang sederhana
            dan mudah dipantau.
          </p>
        </div>

        {canSend && (
          <button
            type="button"
            onClick={onSend}
            disabled={deliveryBusy || totalActivities === 0}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-lg shadow-indigo-100 transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {deliveryBusy ? (
              <>
                <LoadingSpinner />

                <span className="text-white">
                  {deliveryState === "preparing"
                    ? "Menyiapkan..."
                    : "Mengirim..."}
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
        )}
      </div>
    </header>
  );
}
