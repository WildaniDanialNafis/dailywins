import Link from "next/link";
import { RefreshCw, Send, X } from "lucide-react";

import { LoadingSpinner } from "@/components/ui/loading-spinner";

import { getReportHref } from "../utils";
import type { ReportMenuProps } from "../types";

export function ReportMenu({
  report,
  canSend,
  canManage,
  sending,
  deliveryState,
  disabled,
  onClose,
  onSend,
  onDelete,
}: ReportMenuProps) {
  const canDeliver =
    canSend && report.status !== "Terkirim" && deliveryState !== "sent";

  return (
    <div className="absolute right-0 top-11 z-50 w-[min(13rem,calc(100vw-2rem))] rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-900/10">
      <Link
        href={getReportHref(report.type)}
        onClick={onClose}
        className="flex min-h-10 items-center gap-2 rounded-lg px-3 py-2.5 text-xs font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700"
      >
        Lihat modul
      </Link>

      {canDeliver && (
        <button
          type="button"
          onClick={onSend}
          disabled={disabled}
          className="flex min-h-10 w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {sending ? (
            <LoadingSpinner />
          ) : deliveryState === "failed" ? (
            <RefreshCw className="h-4 w-4 text-emerald-500" />
          ) : (
            <Send className="h-4 w-4 text-emerald-500" />
          )}

          {sending
            ? "Mengirim..."
            : deliveryState === "failed"
              ? "Kirim ulang"
              : "Kirim sekarang"}
        </button>
      )}

      {canManage && (
        <>
          <div className="my-1 border-t border-slate-100" />

          <button
            type="button"
            onClick={onDelete}
            disabled={disabled}
            className="flex min-h-10 w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <X className="h-4 w-4 text-red-500" />
            Hapus laporan
          </button>
        </>
      )}
    </div>
  );
}
