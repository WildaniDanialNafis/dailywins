import {
  CalendarClock,
  CheckCircle2,
  Download,
  Plus,
  RefreshCw,
  RotateCcw,
  Send,
} from "lucide-react";

import { LoadingSpinner } from "@/components/ui/loading-spinner";

import { DeliveryStatus } from "./delivery-status";

import type { DeliveryState } from "../types";

type DailyScheduleHeaderProps = {
  canManage: boolean;
  canSend: boolean;

  scheduleLength: number;

  exporting: boolean;
  resetting: boolean;

  deliveryState: DeliveryState;
  deliveryBusy: boolean;
  readyForSend: boolean;

  onExport: () => void;
  onReset: () => void;
  onCreate: () => void;
  onSend: () => void;
  onResetDelivery: () => void;
};

export function DailyScheduleHeader({
  canManage,
  canSend,
  scheduleLength,
  exporting,
  resetting,
  deliveryState,
  deliveryBusy,
  readyForSend,
  onExport,
  onReset,
  onCreate,
  onSend,
  onResetDelivery,
}: DailyScheduleHeaderProps) {
  return (
    <>
      <header className="mb-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="min-w-0">
            <div className="mb-3 inline-flex max-w-full items-center gap-2 rounded-full border border-amber-100 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
              <CalendarClock className="h-3.5 w-3.5 shrink-0" />

              <span className="truncate">DailyWins · Time Builder</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                Daily Schedule
              </h1>

              <DeliveryStatus state={deliveryState} />
            </div>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Atur waktu, durasi, dan urutan aktivitas dalam satu hari.
            </p>
          </div>

          <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto">
            <button
              type="button"
              onClick={onExport}
              disabled={exporting || scheduleLength === 0}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-50"
            >
              {exporting ? (
                <LoadingSpinner />
              ) : (
                <Download className="h-4 w-4 text-slate-500" />
              )}

              {exporting ? "Exporting..." : "Export"}
            </button>

            {canManage && (
              <>
                <button
                  type="button"
                  onClick={onReset}
                  disabled={resetting || scheduleLength === 0}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                >
                  {resetting ? (
                    <LoadingSpinner />
                  ) : (
                    <RotateCcw className="h-4 w-4" />
                  )}

                  {resetting ? "Mereset..." : "Reset"}
                </button>

                <button
                  type="button"
                  onClick={onCreate}
                  disabled={resetting}
                  className="col-span-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 disabled:opacity-50 sm:col-span-1"
                >
                  <Plus className="h-4 w-4 text-white" />
                  <span className="text-white">Tambah Jadwal</span>
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {canSend && (
        <section className="mb-6 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-indigo-600">
                  Delivery
                </p>

                <DeliveryStatus state={deliveryState} />
              </div>

              <p className="mt-1 truncate text-sm font-semibold text-slate-900">
                Daily Schedule
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              {deliveryState === "sent" && (
                <button
                  type="button"
                  onClick={onResetDelivery}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <RefreshCw className="h-4 w-4" />
                  Siapkan lagi
                </button>
              )}

              <button
                type="button"
                onClick={onSend}
                disabled={deliveryBusy || !readyForSend}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 disabled:opacity-50"
              >
                {deliveryBusy ? (
                  <>
                    <LoadingSpinner />
                    <span className="text-white">Mengirim...</span>
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
            </div>
          </div>
        </section>
      )}
    </>
  );
}
