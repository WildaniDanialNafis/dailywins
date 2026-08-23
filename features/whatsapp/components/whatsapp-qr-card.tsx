"use client";

import { Check, RefreshCw, X } from "lucide-react";

import { ButtonContent } from "@/components/ui/button-content";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

function FakeQrCode() {
  const cells = Array.from({ length: 169 }, (_, index) => {
    const row = Math.floor(index / 13);
    const column = index % 13;

    const finder = (startRow: number, startColumn: number) => {
      const relativeRow = row - startRow;
      const relativeColumn = column - startColumn;

      if (
        relativeRow < 0 ||
        relativeRow > 4 ||
        relativeColumn < 0 ||
        relativeColumn > 4
      ) {
        return null;
      }

      return (
        relativeRow === 0 ||
        relativeRow === 4 ||
        relativeColumn === 0 ||
        relativeColumn === 4 ||
        (relativeRow >= 1 &&
          relativeRow <= 3 &&
          relativeColumn >= 1 &&
          relativeColumn <= 3)
      );
    };

    const topLeft = finder(0, 0);
    const topRight = finder(0, 8);
    const bottomLeft = finder(8, 0);

    if (topLeft !== null || topRight !== null || bottomLeft !== null) {
      return Boolean(topLeft ?? topRight ?? bottomLeft);
    }

    return (row * 17 + column * 13 + row * column) % 7 === 0;
  });

  return (
    <div className="mx-auto grid aspect-square w-full max-w-60 grid-cols-13 gap-0.75 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:max-w-68">
      {cells.map((filled, index) => (
        <span
          key={index}
          aria-hidden="true"
          className={filled ? "bg-slate-950" : "bg-white"}
        />
      ))}
    </div>
  );
}

type WhatsAppQrCardProps = {
  refreshingQr: boolean;
  connecting: boolean;
  onRefresh: () => void;
  onSimulateScan: () => void;
  onCancel: () => void;
};

export function WhatsAppQrCard({
  refreshingQr,
  connecting,
  onRefresh,
  onSimulateScan,
  onCancel,
}: WhatsAppQrCardProps) {
  return (
    <div className="w-full max-w-sm">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-indigo-500">
              Scan QR Code
            </p>

            <h3 className="mt-1 text-sm font-bold text-slate-900">
              Menunggu pemindaian
            </h3>

            <p className="mt-1 text-xs leading-5 text-slate-400">
              Gunakan WhatsApp di ponsel untuk memindai.
            </p>
          </div>

          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-semibold text-amber-700">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
            Waiting
          </span>
        </div>

        <div className="mt-6">
          <FakeQrCode />
        </div>

        <div className="mt-5 rounded-2xl bg-slate-50 px-4 py-3 text-xs leading-5 text-slate-500">
          WhatsApp → Perangkat tertaut → Tautkan perangkat → pindai QR code.
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={onRefresh}
            disabled={refreshingQr || connecting}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {refreshingQr ? (
              <LoadingSpinner />
            ) : (
              <RefreshCw className="h-3.5 w-3.5" />
            )}

            {refreshingQr ? "Memuat..." : "Refresh QR"}
          </button>

          <button
            type="button"
            onClick={onSimulateScan}
            disabled={connecting || refreshingQr}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-3 text-xs font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ButtonContent loading={connecting} loadingText="Menghubungkan...">
              <Check className="h-3.5 w-3.5 text-white" />
              <span className="text-white">Simulasikan Scan</span>
            </ButtonContent>
          </button>
        </div>

        <button
          type="button"
          onClick={onCancel}
          disabled={connecting || refreshingQr}
          className="mt-2 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl text-xs font-semibold text-slate-500 transition hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <X className="h-4 w-4" />
          Batalkan
        </button>
      </div>
    </div>
  );
}
