import {
  CheckCircle2,
  GripVertical,
  ListChecks,
  RefreshCw,
  Send,
  Trash2,
} from "lucide-react";

import { LoadingSpinner } from "@/components/ui/loading-spinner";

import { DeliveryStatus } from "./delivery-status";
import { EvaluationEmptyState } from "./evaluation-empty-state";

import type {
  ActivityLookupValue,
  DeliveryState,
  EvaluationItem,
} from "../types";

type EvaluationDraftProps = {
  canManage: boolean;
  canSend: boolean;

  evaluationItems: EvaluationItem[];
  evaluationPreview: ActivityLookupValue[];

  draggedEvaluationId: number | null;
  removingEvaluationId: number | null;

  deliveryState: DeliveryState;
  deliveryBusy: boolean;
  deliveryError: string | null;

  whatsappConnected: boolean;
  activeGroupName?: string;

  onSetDraggedId: (id: number | null) => void;
  onDrop: (targetId: number) => void;
  onRemove: (item: EvaluationItem) => void;

  onScrollToLibrary: () => void;
  onSend: () => void;
  onResetDelivery: () => void;
};

export function EvaluationDraft({
  canManage,
  canSend,
  evaluationItems,
  evaluationPreview,
  draggedEvaluationId,
  removingEvaluationId,
  deliveryState,
  deliveryBusy,
  deliveryError,
  whatsappConnected,
  activeGroupName,
  onSetDraggedId,
  onDrop,
  onRemove,
  onScrollToLibrary,
  onSend,
  onResetDelivery,
}: EvaluationDraftProps) {
  return (
    <section className="mt-8 overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-sm">
      <div className="border-b border-indigo-100 bg-indigo-50/60 px-4 py-4 sm:px-5 sm:py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-indigo-600 text-white">
              <ListChecks className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-indigo-600">
                02 · Evaluation Draft
              </p>

              <h2 className="mt-1 text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                Susunan Evaluasi
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Kegiatan yang tersusun di sini akan menjadi draft evaluasi.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-100">
              {evaluationPreview.length} kegiatan
            </span>

            {evaluationPreview.length > 0 && canManage && (
              <span className="hidden items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold text-slate-500 ring-1 ring-indigo-100 sm:inline-flex">
                <GripVertical className="h-3 w-3" />
                Drag untuk urut
              </span>
            )}
          </div>
        </div>
      </div>

      {evaluationPreview.length === 0 ? (
        <EvaluationEmptyState
          canManage={canManage}
          onScrollToLibrary={onScrollToLibrary}
        />
      ) : (
        <>
          <div className="divide-y divide-slate-100">
            {evaluationPreview.map((item, index) => {
              const evaluationItem = evaluationItems[index];

              if (!evaluationItem) {
                return null;
              }

              const removing = removingEvaluationId === evaluationItem.id;

              return (
                <div
                  key={evaluationItem.id}
                  draggable={canManage}
                  onDragStart={() =>
                    canManage && onSetDraggedId(evaluationItem.id)
                  }
                  onDragEnd={() => onSetDraggedId(null)}
                  onDragOver={(event) => {
                    if (canManage) {
                      event.preventDefault();
                    }
                  }}
                  onDrop={() => {
                    if (canManage) {
                      onDrop(evaluationItem.id);
                    }
                  }}
                  className={[
                    "flex min-w-0 items-center gap-3 px-4 py-3.5 transition sm:px-5",
                    draggedEvaluationId === evaluationItem.id
                      ? "bg-indigo-50/50 opacity-40"
                      : "hover:bg-slate-50",
                  ].join(" ")}
                >
                  {canManage ? (
                    <GripVertical className="h-4 w-4 shrink-0 cursor-grab text-slate-300 active:cursor-grabbing" />
                  ) : (
                    <span className="w-4 shrink-0" />
                  )}

                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-indigo-50 text-xs font-bold text-indigo-700">
                    {index + 1}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex min-w-0 flex-wrap items-center gap-2">
                      <p className="min-w-0 truncate text-sm font-semibold text-slate-800">
                        {item.activity.name}
                      </p>

                      <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-500">
                        {item.category.name}
                      </span>
                    </div>
                  </div>

                  {canManage && (
                    <button
                      type="button"
                      onClick={() => onRemove(evaluationItem)}
                      disabled={removing || removingEvaluationId !== null}
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-40"
                      aria-label="Hapus dari evaluasi"
                    >
                      {removing ? (
                        <LoadingSpinner />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {canSend && (
            <div className="border-t border-indigo-100 bg-slate-50/70 px-4 py-4 sm:px-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                      03 · Delivery
                    </p>

                    <DeliveryStatus state={deliveryState} />
                  </div>

                  <p className="mt-1 truncate text-sm font-semibold text-slate-800">
                    {whatsappConnected && activeGroupName
                      ? `Target: ${activeGroupName}`
                      : "WhatsApp akan diminta saat mengirim."}
                  </p>

                  {deliveryError && (
                    <p className="mt-2 text-xs text-red-600">{deliveryError}</p>
                  )}
                </div>

                <div className="flex w-full gap-2 sm:w-auto">
                  {deliveryState === "sent" && (
                    <button
                      type="button"
                      onClick={onResetDelivery}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Lagi
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={onSend}
                    disabled={deliveryBusy || deliveryState === "sent"}
                    className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
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
                    ) : deliveryState === "sent" ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-white" />
                        <span className="text-white">Terkirim</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 text-white" />
                        <span className="text-white">Kirim Evaluasi</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}
