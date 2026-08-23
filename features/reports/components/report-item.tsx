import {
  AlertCircle,
  CheckCircle2,
  CalendarDays,
  ListChecks,
  MoreHorizontal,
  RefreshCw,
} from "lucide-react";

import { LoadingSpinner } from "@/components/ui/loading-spinner";

import { getReportStatusTone, getReportTypeTone } from "../utils";
import type { DeliveryState, Report } from "../types";

import { DeliveryBadge } from "./delivery-badge";
import { ReportMenu } from "./report-menu";

type ReportItemProps = {
  report: Report;
  canSend: boolean;
  canManage: boolean;
  menuOpen: boolean;
  sending: boolean;
  deleting: boolean;
  deliveryState: DeliveryState;
  deliveryError?: string;
  busy: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  onSend: () => void;
  onDelete: () => void;
};

function ReportTypeIcon({ type }: { type: Report["type"] }) {
  if (type === "Evaluasi") {
    return <CheckCircle2 className="h-4 w-4" />;
  }

  if (type === "Polling") {
    return <ListChecks className="h-4 w-4" />;
  }

  return <CalendarDays className="h-4 w-4" />;
}

export function ReportItem({
  report,
  canSend,
  canManage,
  menuOpen,
  sending,
  deleting,
  deliveryState,
  deliveryError,
  busy,
  onToggleMenu,
  onCloseMenu,
  onSend,
  onDelete,
}: ReportItemProps) {
  return (
    <article
      className={[
        "px-4 py-4 transition sm:px-5 sm:py-5",
        deliveryState === "failed" ? "bg-red-50/20" : "hover:bg-slate-50/60",
      ].join(" ")}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div
          className={[
            "grid h-10 w-10 shrink-0 place-items-center rounded-xl sm:h-11 sm:w-11 sm:rounded-2xl",
            getReportTypeTone(report.type),
          ].join(" ")}
        >
          <ReportTypeIcon type={report.type} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <h3 className="min-w-0 text-sm font-bold text-slate-900 sm:text-base">
                  {report.title}
                </h3>

                <span
                  className={[
                    "inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold",
                    getReportTypeTone(report.type),
                  ].join(" ")}
                >
                  {report.type}
                </span>

                <span
                  className={[
                    "inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold",
                    getReportStatusTone(report.status),
                  ].join(" ")}
                >
                  {report.status}
                </span>

                <DeliveryBadge state={deliveryState} />
              </div>

              <div className="mt-2 grid gap-1.5 text-xs text-slate-500 sm:grid-cols-2 xl:grid-cols-3 xl:gap-3">
                <p className="min-w-0 truncate">
                  <span className="font-semibold text-slate-700">Target:</span>{" "}
                  {report.target}
                </p>

                <p className="tabular-nums">
                  <span className="font-semibold text-slate-700">Waktu:</span>{" "}
                  {report.date} · {report.time}
                </p>

                <p>
                  <span className="font-semibold text-slate-700">Isi:</span>{" "}
                  {report.count}
                </p>
              </div>
            </div>

            <div className="relative shrink-0 self-start">
              <button
                type="button"
                onClick={onToggleMenu}
                disabled={(busy && !menuOpen) || sending || deleting}
                className="grid h-9 w-9 place-items-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-4 focus:ring-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label={`Menu ${report.title}`}
                aria-expanded={menuOpen}
              >
                {sending || deleting ? (
                  <LoadingSpinner />
                ) : (
                  <MoreHorizontal className="h-4 w-4" />
                )}
              </button>

              {menuOpen && (
                <ReportMenu
                  report={report}
                  canSend={canSend}
                  canManage={canManage}
                  sending={sending}
                  deleting={deleting}
                  deliveryState={deliveryState}
                  disabled={busy}
                  onClose={onCloseMenu}
                  onSend={onSend}
                  onDelete={onDelete}
                />
              )}
            </div>
          </div>

          {deliveryError && (
            <div className="mt-3 flex flex-col gap-2 rounded-xl border border-red-100 bg-red-50 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-start gap-2">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />

                <p className="text-xs leading-5 text-red-700">
                  {deliveryError}
                </p>
              </div>

              {canSend && (
                <button
                  type="button"
                  onClick={onSend}
                  disabled={busy}
                  className="inline-flex min-h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-red-600 px-3 text-xs font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Coba lagi
                </button>
              )}
            </div>
          )}

          {(deliveryState === "preparing" || deliveryState === "sending") && (
            <div className="mt-3">
              <div className="mb-1.5 flex items-center justify-between text-[10px] font-semibold text-slate-400">
                <span>
                  {deliveryState === "preparing"
                    ? "Menyiapkan pengiriman..."
                    : "Mengirim laporan..."}
                </span>

                <span>{deliveryState === "preparing" ? "35%" : "80%"}</span>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={[
                    "h-full rounded-full transition-all duration-500",
                    deliveryState === "preparing"
                      ? "w-1/3 bg-amber-400"
                      : "w-4/5 bg-indigo-500",
                  ].join(" ")}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
