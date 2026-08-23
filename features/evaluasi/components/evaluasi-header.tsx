import { ListChecks, RefreshCw, Send } from "lucide-react";

import { LoadingSpinner } from "@/components/ui/loading-spinner";

import { DeliveryStatus } from "./delivery-status";
import type { DeliveryState } from "../types";

type EvaluasiHeaderProps = {
  canSend: boolean;
  readyForSend: boolean;
  deliveryBusy: boolean;
  deliveryState: DeliveryState;
  onSend: () => void;
  onResetDelivery: () => void;
};

export function EvaluasiHeader({
  canSend,
  readyForSend,
  deliveryBusy,
  deliveryState,
  onSend,
  onResetDelivery,
}: EvaluasiHeaderProps) {
  return (
    <header className="mb-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div className="min-w-0">
          <div className="mb-3 inline-flex max-w-full items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700">
            <ListChecks className="h-3.5 w-3.5 shrink-0" />

            <span className="truncate">DailyWins · Evaluation Builder</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Evaluasi
            </h1>

            <DeliveryStatus state={deliveryState} />
          </div>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Bangun evaluasi dari activity library, susun urutannya, lalu kirim
            ketika siap.
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          {deliveryState === "sent" && (
            <button
              type="button"
              onClick={onResetDelivery}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <RefreshCw className="h-4 w-4" />
              Kirim lagi
            </button>
          )}

          {canSend && (
            <button
              type="button"
              onClick={onSend}
              disabled={deliveryBusy || !readyForSend}
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
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
              ) : deliveryState === "failed" ? (
                <>
                  <RefreshCw className="h-4 w-4 text-white" />
                  <span className="text-white">Coba lagi</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 text-white" />
                  <span className="text-white">Kirim Evaluasi</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
