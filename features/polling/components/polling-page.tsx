"use client";

import {
  BarChart3,
  CheckCircle2,
  ListChecks,
  Plus,
  Search,
  Users,
  X,
} from "lucide-react";

import { ReadOnlyBanner } from "@/components/auth/read-only-banner";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { usePageLoading } from "@/components/ui/loading-state";
import { PageSkeleton } from "@/components/ui/skeleton";
import { Toast } from "@/components/ui/toast";
import { DeliveryGate } from "@/components/whatsapp/delivery-gate";

import { EmptyState } from "./empty-state";
import { PollingCard } from "./polling-card";
import { PollingHeader } from "./polling-header";
import { StatCard } from "./stat-card";
import { usePolling } from "../hooks/use-polling";

export function PollingPage() {
  const pageLoading = usePageLoading();

  const polling = usePolling();

  if (pageLoading) {
    return <PageSkeleton />;
  }

  const deleteDialogCopy =
    polling.deleteTarget?.type === "polling"
      ? {
          title: "Hapus polling?",
          description: `"${polling.deleteTarget.label}" dan seluruh pilihan jawabannya akan dihapus.`,
          confirmLabel: "Hapus polling",
        }
      : {
          title: "Hapus opsi?",
          description: `"${polling.deleteTarget?.label ?? "Pilihan ini"}" akan dihapus dari polling.`,
          confirmLabel: "Hapus opsi",
        };

  return (
    <div className="min-h-svh">
      <ConfirmDialog
        open={Boolean(polling.deleteTarget)}
        title={deleteDialogCopy.title}
        description={deleteDialogCopy.description}
        confirmLabel={deleteDialogCopy.confirmLabel}
        loading={polling.confirmingDelete}
        onCancel={polling.closeDeleteDialog}
        onConfirm={() => void polling.confirmDelete()}
      />

      <Toast
        open={Boolean(polling.toast)}
        type={polling.toast?.type}
        title={polling.toast?.title}
        message={polling.toast?.message ?? ""}
        onClose={polling.clearToast}
      />

      <DeliveryGate
        open={polling.deliveryGateOpen}
        onClose={() => polling.setDeliveryGateOpen(false)}
      />

      <div className="mx-auto w-full max-w-370 px-4 py-5 sm:px-6 sm:py-7 xl:px-8">
        <PollingHeader
          canSend={polling.canSend}
          readyCount={polling.readyPollings.length}
          sendingAll={polling.sendingAll}
          sendingAllProgress={polling.sendingAllProgress}
          sendingAllTotal={polling.sendingAllTotal}
          deliveredCount={polling.deliveredPollings}
          onSendAll={() => void polling.requestSendAll()}
        />

        <ReadOnlyBanner />

        <section className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard
            label="Polling"
            value={String(polling.pollings.length)}
            description="Pertanyaan tersimpan"
            icon={BarChart3}
            tone="bg-indigo-50 text-indigo-600"
          />

          <StatCard
            label="Opsi"
            value={String(polling.totalOptions)}
            description="Pilihan jawaban"
            icon={ListChecks}
            tone="bg-violet-50 text-violet-600"
          />

          <StatCard
            label="Siap dikirim"
            value={`${polling.readyPollings.length}/${polling.pollings.length}`}
            description="Minimal 2 opsi"
            icon={CheckCircle2}
            tone="bg-emerald-50 text-emerald-600"
          />

          <StatCard
            label="WhatsApp"
            value={polling.whatsappConnected ? "Ready" : "Optional"}
            description={
              polling.whatsappConnected
                ? (polling.activeGroup?.name ?? "Pilih grup")
                : "Connect saat send"
            }
            icon={Users}
            tone={
              polling.whatsappConnected
                ? "bg-emerald-50 text-emerald-600"
                : "bg-slate-100 text-slate-500"
            }
          />
        </section>

        <section className="mb-6">
          <div
            className={[
              "grid gap-4",
              polling.canManage ? "lg:grid-cols-[0.95fr_1.05fr]" : "",
            ].join(" ")}
          >
            {polling.canManage && (
              <article className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-50 text-violet-600">
                    <Plus className="h-4.5 w-4.5" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-violet-500">
                      Quick create
                    </p>

                    <h2 className="mt-1 text-sm font-bold text-slate-900">
                      Buat polling
                    </h2>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Mulai dari pertanyaan, lalu tambahkan pilihan jawaban.
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <input
                    value={polling.newTitle}
                    onChange={(event) =>
                      polling.setNewTitle(event.target.value)
                    }
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        void polling.addPolling();
                      }
                    }}
                    placeholder="Contoh: Apa fokus utama hari ini?"
                    disabled={polling.saving}
                    className="ui-input min-w-0 flex-1"
                  />

                  <button
                    type="button"
                    onClick={() => void polling.addPolling()}
                    disabled={polling.saving}
                    className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
                  >
                    <Plus className="h-4 w-4 text-white" />
                    <span className="text-white">
                      {polling.saving ? "Menyimpan..." : "Buat"}
                    </span>
                  </button>
                </div>
              </article>
            )}

            <article className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-violet-500">
                Search library
              </p>

              <h2 className="mt-1 text-sm font-bold text-slate-900">
                Cari polling
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Cari berdasarkan pertanyaan ataupun pilihan jawaban.
              </p>

              <div className="relative mt-4">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="search"
                  value={polling.search}
                  onChange={(event) => polling.setSearch(event.target.value)}
                  placeholder="Cari pertanyaan atau opsi..."
                  className="ui-input w-full pl-10 pr-11"
                />

                {polling.search && (
                  <button
                    type="button"
                    onClick={polling.clearSearch}
                    className="absolute right-1.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                    aria-label="Bersihkan pencarian"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </article>
          </div>
        </section>

        <section>
          {polling.libraryIsEmpty ? (
            <EmptyState
              type="empty"
              search={polling.search}
              canManage={polling.canManage}
              onClearSearch={polling.clearSearch}
              onCreate={polling.createFromEmpty}
            />
          ) : polling.searchHasNoResults ? (
            <EmptyState
              type="search"
              search={polling.search}
              canManage={polling.canManage}
              onClearSearch={polling.clearSearch}
              onCreate={polling.createFromEmpty}
            />
          ) : (
            <div className="space-y-3">
              {polling.filteredPollings.map((item) => {
                const expanded = polling.selectedPollingId === item.id;

                const editing = polling.editingPollingId === item.id;

                const ready = item.options.length >= 2;

                const deletingPolling = polling.deletingPollingId === item.id;

                const deliveryState = polling.getDeliveryState(item.id);

                const deliveryBusy =
                  deliveryState === "preparing" || deliveryState === "sending";

                const deliveryError = polling.getDeliveryError(item.id);

                return (
                  <PollingCard
                    key={item.id}
                    polling={item}
                    expanded={expanded}
                    editing={editing}
                    ready={ready}
                    deletingPolling={deletingPolling}
                    menuOpen={polling.menuPollingId === item.id}
                    canManage={polling.canManage}
                    canSend={polling.canSend}
                    saving={polling.saving}
                    editingTitle={polling.editingTitle}
                    editingOption={polling.editingOption}
                    editingOptionValue={polling.editingOptionValue}
                    deletingOption={polling.deletingOption}
                    newOption={polling.newOption}
                    selectedPollingId={polling.selectedPollingId}
                    deliveryState={deliveryState}
                    deliveryBusy={deliveryBusy}
                    deliveryError={deliveryError}
                    whatsappConnected={polling.whatsappConnected}
                    activeGroupName={polling.activeGroup?.name}
                    sendingAll={polling.sendingAll}
                    onToggle={() => polling.selectPolling(item.id)}
                    onToggleMenu={() =>
                      polling.setMenuPollingId(
                        polling.menuPollingId === item.id ? null : item.id,
                      )
                    }
                    onStartEditPolling={() => polling.startEditPolling(item)}
                    onSavePollingTitle={() => void polling.savePollingTitle()}
                    onCancelEditPolling={polling.cancelEditPolling}
                    onChangeTitle={polling.setEditingTitle}
                    onDeletePolling={() => polling.requestDeletePolling(item)}
                    onStartEditOption={(index, value) =>
                      polling.startEditOption(item.id, index, value)
                    }
                    onChangeEditingOption={polling.setEditingOptionValue}
                    onSaveOption={() => void polling.saveOption()}
                    onCancelOption={polling.cancelEditOption}
                    onDeleteOption={(index, value) =>
                      polling.requestDeleteOption(item.id, index, value)
                    }
                    onSelectPolling={() =>
                      polling.setSelectedPollingId(item.id)
                    }
                    onChangeNewOption={(value) => {
                      polling.setSelectedPollingId(item.id);

                      polling.setNewOption(value);
                    }}
                    onAddOption={() => {
                      polling.setSelectedPollingId(item.id);

                      void polling.addOption();
                    }}
                    onSend={() => void polling.requestSend(item)}
                    onResetDelivery={() => polling.resetDelivery(item.id)}
                  />
                );
              })}
            </div>
          )}
        </section>

        <footer className="mt-8 border-t border-slate-200/80 py-5 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} DailyWins. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
