import {
  AlertCircle,
  BarChart3,
  Check,
  ChevronDown,
  Edit3,
  MoreHorizontal,
  RefreshCw,
  Send,
  Trash2,
  CheckCircle2,
} from "lucide-react";

import { ButtonContent } from "@/components/ui/button-content";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

import { DeliveryStatus } from "./delivery-status";
import { PollingOptions } from "./polling-options";
import { ReadinessBadge } from "./readiness-badge";

import type {
  DeletingOption,
  DeliveryState,
  EditingOption,
  Polling,
} from "../types";

type PollingCardProps = {
  polling: Polling;

  expanded: boolean;
  editing: boolean;
  ready: boolean;
  deletingPolling: boolean;

  menuOpen: boolean;

  canManage: boolean;
  canSend: boolean;

  saving: boolean;

  editingTitle: string;
  editingOption: EditingOption;
  editingOptionValue: string;

  deletingOption: DeletingOption;

  newOption: string;
  selectedPollingId: number | null;

  deliveryState: DeliveryState;
  deliveryBusy: boolean;
  deliveryError?: string;

  whatsappConnected: boolean;
  activeGroupName?: string;

  sendingAll: boolean;

  onToggle: () => void;
  onToggleMenu: () => void;

  onStartEditPolling: () => void;
  onSavePollingTitle: () => void;
  onCancelEditPolling: () => void;
  onChangeTitle: (value: string) => void;

  onDeletePolling: () => void;

  onStartEditOption: (index: number, value: string) => void;
  onChangeEditingOption: (value: string) => void;
  onSaveOption: () => void;
  onCancelOption: () => void;
  onDeleteOption: (index: number, value: string) => void;

  onSelectPolling: () => void;
  onChangeNewOption: (value: string) => void;
  onAddOption: () => void;

  onSend: () => void;
  onResetDelivery: () => void;
};

export function PollingCard({
  polling,
  expanded,
  editing,
  ready,
  deletingPolling,
  menuOpen,
  canManage,
  canSend,
  saving,
  editingTitle,
  editingOption,
  editingOptionValue,
  deletingOption,
  newOption,
  selectedPollingId,
  deliveryState,
  deliveryBusy,
  deliveryError,
  whatsappConnected,
  activeGroupName,
  sendingAll,
  onToggle,
  onToggleMenu,
  onStartEditPolling,
  onSavePollingTitle,
  onCancelEditPolling,
  onChangeTitle,
  onDeletePolling,
  onStartEditOption,
  onChangeEditingOption,
  onSaveOption,
  onCancelOption,
  onDeleteOption,
  onSelectPolling,
  onChangeNewOption,
  onAddOption,
  onSend,
  onResetDelivery,
}: PollingCardProps) {
  return (
    <article
      className={[
        "overflow-visible rounded-2xl border bg-white shadow-sm transition-all duration-200",
        expanded
          ? "border-violet-200 shadow-md ring-2 ring-violet-50"
          : "border-slate-200/80 hover:border-slate-300",
      ].join(" ")}
    >
      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={onToggle}
            className={[
              "grid h-10 w-10 shrink-0 place-items-center rounded-xl transition",
              expanded
                ? "bg-violet-600 text-white"
                : "bg-violet-50 text-violet-600 hover:bg-violet-100",
            ].join(" ")}
            aria-label={expanded ? "Tutup polling" : "Buka polling"}
            aria-expanded={expanded}
          >
            <BarChart3 className="h-4.5 w-4.5" />
          </button>

          <div className="min-w-0 flex-1">
            {editing ? (
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  autoFocus
                  value={editingTitle}
                  onChange={(event) => onChangeTitle(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      onSavePollingTitle();
                    }

                    if (event.key === "Escape") {
                      onCancelEditPolling();
                    }
                  }}
                  disabled={saving}
                  className="ui-input min-w-0 flex-1"
                />

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={onSavePollingTitle}
                    disabled={saving}
                    className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-3 text-xs font-semibold text-white disabled:opacity-50 sm:flex-none"
                  >
                    <ButtonContent loading={saving} loadingText="Menyimpan...">
                      <Check className="h-4 w-4 text-white" />
                      <span className="text-white">Simpan</span>
                    </ButtonContent>
                  </button>

                  <button
                    type="button"
                    onClick={onCancelEditPolling}
                    disabled={saving}
                    className="ui-button ui-button-secondary flex-1 sm:flex-none"
                  >
                    Batal
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <h3 className="min-w-0 text-base font-bold leading-6 text-slate-900 sm:text-lg">
                    {polling.title}
                  </h3>

                  <div className="flex shrink-0 flex-wrap gap-1.5">
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600">
                      {polling.options.length} opsi
                    </span>

                    <ReadinessBadge ready={ready} />
                  </div>
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <p className="text-xs text-slate-400">Polling workspace</p>

                  <DeliveryStatus state={deliveryState} />
                </div>
              </>
            )}
          </div>

          {canManage && !editing && (
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={onToggleMenu}
                disabled={deletingPolling || saving}
                className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200 disabled:opacity-50"
                aria-label="Menu polling"
                aria-expanded={menuOpen}
              >
                {deletingPolling ? (
                  <LoadingSpinner />
                ) : (
                  <MoreHorizontal className="h-4 w-4" />
                )}
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-11 z-50 w-[min(12rem,calc(100vw-2rem))] rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                  <button
                    type="button"
                    onClick={onStartEditPolling}
                    disabled={saving || deletingPolling}
                    className="flex min-h-10 w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-medium transition hover:bg-amber-50 disabled:opacity-40"
                  >
                    <Edit3 className="h-4 w-4 text-amber-500" />
                    Edit pertanyaan
                  </button>

                  <div className="my-1 border-t border-slate-100" />

                  <button
                    type="button"
                    onClick={onDeletePolling}
                    disabled={deletingPolling}
                    className="flex min-h-10 w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-40"
                  >
                    <Trash2 className="h-4 w-4" />
                    Hapus polling
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {deliveryError && (
          <div className="mt-3 flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 px-3 py-2.5 text-xs text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span className="min-w-0">{deliveryError}</span>
          </div>
        )}

        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/60">
          <button
            type="button"
            onClick={onToggle}
            className="flex min-h-14 w-full items-center justify-between gap-3 px-4 py-3 text-left sm:px-5"
          >
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                Pilihan jawaban
              </p>

              <p className="mt-1 truncate text-xs text-slate-500">
                {polling.options.length} pilihan tersedia
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <span className="hidden text-[10px] font-semibold text-violet-600 sm:block">
                {expanded ? "Tutup" : "Kelola"}
              </span>

              <span
                className={[
                  "grid h-8 w-8 place-items-center rounded-lg bg-white text-slate-400 ring-1 ring-slate-200 transition-transform",
                  expanded ? "rotate-180" : "",
                ].join(" ")}
              >
                <ChevronDown className="h-4 w-4" />
              </span>
            </div>
          </button>

          {expanded && (
            <PollingOptions
              pollingId={polling.id}
              options={polling.options}
              canManage={canManage}
              saving={saving}
              newOption={newOption}
              selectedPollingId={selectedPollingId}
              editingOption={editingOption}
              editingOptionValue={editingOptionValue}
              deletingOption={deletingOption}
              onSetSelected={onSelectPolling}
              onChangeNewOption={onChangeNewOption}
              onAddOption={onAddOption}
              onStartEdit={onStartEditOption}
              onChangeEditing={onChangeEditingOption}
              onSaveEdit={onSaveOption}
              onCancelEdit={onCancelOption}
              onDelete={onDeleteOption}
            />
          )}
        </div>

        {canSend && (
          <div className="mt-4 border-t border-slate-100 pt-4">
            <div className="rounded-xl bg-slate-50/80 p-3 sm:p-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                {/* Delivery information */}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <ReadinessBadge ready={ready} />
                    <DeliveryStatus state={deliveryState} />
                  </div>

                  <p className="mt-1.5 truncate text-[11px] leading-5 text-slate-400">
                    {whatsappConnected && activeGroupName
                      ? `Target: ${activeGroupName}`
                      : "WhatsApp akan diminta saat mengirim."}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto lg:shrink-0">
                  {deliveryState === "sent" && (
                    <button
                      type="button"
                      onClick={onResetDelivery}
                      disabled={sendingAll}
                      className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      Kirim lagi
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={onSend}
                    disabled={!ready || deliveryBusy || sendingAll}
                    className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-xs font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-50 sm:min-w-37.5 sm:flex-none"
                  >
                    {deliveryBusy ? (
                      <>
                        <LoadingSpinner />

                        <span>
                          {deliveryState === "preparing"
                            ? "Menyiapkan..."
                            : "Mengirim..."}
                        </span>
                      </>
                    ) : deliveryState === "sent" ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Terkirim</span>
                      </>
                    ) : deliveryState === "failed" ? (
                      <>
                        <RefreshCw className="h-3.5 w-3.5" />
                        <span>Coba lagi</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        <span>Kirim Polling</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
