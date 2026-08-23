"use client";

import { CalendarClock, Check, GripVertical, Users } from "lucide-react";

import { ReadOnlyBanner } from "@/components/auth/read-only-banner";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { usePageLoading } from "@/components/ui/loading-state";
import { PageSkeleton } from "@/components/ui/skeleton";
import { Toast } from "@/components/ui/toast";
import { DeliveryGate } from "@/components/whatsapp/delivery-gate";

import { DailyScheduleHeader } from "./daily-schedule-header";
import { ScheduleEmptyState } from "./schedule-empty-state";
import { ScheduleItem } from "./schedule-item";
import { ScheduleModal } from "./schedule-modal";
import { ScheduleStatCard } from "./schedule-stat-card";
import { ScheduleToolbar } from "./schedule-toolbar";

import { useDailySchedule } from "../hooks/use-daily-schedule";
import { formatDuration } from "../utils";

export function DailySchedulePage() {
  const pageLoading = usePageLoading();

  const schedule = useDailySchedule();

  if (pageLoading) {
    return <PageSkeleton />;
  }

  const deleteDialogCopy =
    schedule.deleteTarget?.type === "item"
      ? {
          title: "Hapus jadwal?",
          description: `"${schedule.deleteTarget.activity}" akan dihapus dari Daily Schedule.`,
          confirmLabel: "Hapus jadwal",
        }
      : schedule.deleteTarget?.type === "selected"
        ? {
            title: "Hapus jadwal terpilih?",
            description: `${schedule.deleteTarget.count} jadwal akan dihapus dari Daily Schedule.`,
            confirmLabel: `Hapus ${schedule.deleteTarget.count} jadwal`,
          }
        : {
            title: "Reset Daily Schedule?",
            description:
              "Semua perubahan pada Daily Schedule akan dikembalikan ke data awal.",
            confirmLabel: "Reset Schedule",
          };

  return (
    <div className="min-h-svh">
      <ConfirmDialog
        open={Boolean(schedule.deleteTarget)}
        title={deleteDialogCopy.title}
        description={deleteDialogCopy.description}
        confirmLabel={deleteDialogCopy.confirmLabel}
        loading={schedule.confirmingDelete}
        onCancel={schedule.closeDeleteDialog}
        onConfirm={() => void schedule.confirmDelete()}
      />

      <Toast
        open={Boolean(schedule.toast)}
        type={schedule.toast?.type}
        title={schedule.toast?.title}
        message={schedule.toast?.message ?? ""}
        onClose={schedule.clearToast}
      />

      <DeliveryGate
        open={schedule.deliveryGateOpen}
        onClose={() => schedule.setDeliveryGateOpen(false)}
      />

      <ScheduleModal
        open={schedule.modalOpen}
        editing={schedule.editingId !== null}
        draft={schedule.draft}
        saving={schedule.saving}
        onClose={schedule.closeModal}
        onChange={schedule.handleDraftChange}
        onSave={() => void schedule.saveSchedule()}
      />

      <div className="mx-auto w-full max-w-370 px-4 py-5 sm:px-6 sm:py-7 xl:px-8">
        <DailyScheduleHeader
          canManage={schedule.canManage}
          canSend={schedule.canSend}
          scheduleLength={schedule.schedule.length}
          exporting={schedule.exporting}
          resetting={schedule.resetting}
          deliveryState={schedule.deliveryState}
          deliveryBusy={schedule.deliveryBusy}
          readyForSend={schedule.canSendSchedule}
          onExport={() => void schedule.exportSchedule()}
          onReset={schedule.requestReset}
          onCreate={schedule.openCreate}
          onSend={() => void schedule.requestSend()}
          onResetDelivery={schedule.resetDeliveryState}
        />

        <ReadOnlyBanner />

        <section className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <ScheduleStatCard
            label="Aktivitas"
            value={String(schedule.schedule.length)}
            description="Dalam schedule"
            icon={CalendarClock}
            tone="bg-indigo-50 text-indigo-600"
          />

          <ScheduleStatCard
            label="Dipilih"
            value={String(schedule.selectedIds.length)}
            description={schedule.canManage ? "Bulk action" : "Read only"}
            icon={Check}
            tone="bg-violet-50 text-violet-600"
          />

          <ScheduleStatCard
            label="Total Durasi"
            value={
              schedule.totalDuration > 0
                ? formatDuration(schedule.totalDuration)
                : "0m"
            }
            description={`Rata-rata ${formatDuration(
              schedule.averageDuration,
            )}`}
            icon={CalendarClock}
            tone="bg-sky-50 text-sky-600"
          />

          <ScheduleStatCard
            label="WhatsApp"
            value={schedule.whatsappConnected ? "Ready" : "Optional"}
            description={
              schedule.whatsappConnected
                ? (schedule.activeGroup?.name ?? "Pilih grup")
                : "Connect saat send"
            }
            icon={Users}
            tone={
              schedule.whatsappConnected
                ? "bg-emerald-50 text-emerald-600"
                : "bg-slate-100 text-slate-500"
            }
          />
        </section>

        <section className="overflow-visible rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-4 py-4 sm:px-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-500">
                  Daily Plan
                </p>

                <h2 className="mt-1 text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                  Susunan Aktivitas
                </h2>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Atur urutan aktivitas dan rentang waktunya.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600">
                  {schedule.schedule.length} aktivitas
                </span>

                {schedule.canManage && schedule.schedule.length > 0 && (
                  <span className="hidden items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-semibold text-indigo-600 sm:inline-flex">
                    <GripVertical className="h-3 w-3" />
                    Drag untuk urut
                  </span>
                )}
              </div>
            </div>
          </div>

          <ScheduleToolbar
            canManage={schedule.canManage}
            scheduleLength={schedule.schedule.length}
            allSelected={schedule.allSelected}
            selectedCount={schedule.selectedIds.length}
            deletingSelected={schedule.deletingSelected}
            confirmingDelete={schedule.confirmingDelete}
            onToggleAll={schedule.toggleAll}
            onDeleteSelected={schedule.requestDeleteSelected}
            onClearSelection={schedule.clearSelection}
          />

          <div className="divide-y divide-slate-100">
            {schedule.sortedSchedule.map((item, index) => {
              const selected = schedule.selectedIds.includes(item.id);
              const menuOpen = schedule.menuId === item.id;
              const deleting = schedule.deletingId === item.id;
              const duplicating = schedule.duplicatingId === item.id;

              const disabled =
                schedule.saving ||
                schedule.deletingSelected ||
                deleting ||
                duplicating ||
                schedule.confirmingDelete;

              return (
                <ScheduleItem
                  key={item.id}
                  item={item}
                  index={index}
                  canManage={schedule.canManage}
                  selected={selected}
                  menuOpen={menuOpen}
                  deleting={deleting}
                  duplicating={duplicating}
                  disabled={disabled}
                  onToggleSelected={() => schedule.toggleSelected(item.id)}
                  onDragStart={() => schedule.setDragged(item.id)}
                  onDragEnd={() => schedule.setDragged(null)}
                  onDragOver={(event) => {
                    if (schedule.canManage) {
                      event.preventDefault();
                    }
                  }}
                  onDrop={() => {
                    if (schedule.draggedId !== null) {
                      schedule.reorder(schedule.draggedId, item.id);
                    }
                  }}
                  onToggleMenu={() =>
                    schedule.setMenuId(menuOpen ? null : item.id)
                  }
                  onEdit={() => schedule.openEdit(item)}
                  onDuplicate={() => void schedule.duplicateItem(item)}
                  onDelete={() => schedule.requestDeleteItem(item)}
                />
              );
            })}

            {schedule.sortedSchedule.length === 0 && (
              <ScheduleEmptyState
                canManage={schedule.canManage}
                busy={
                  schedule.saving ||
                  schedule.resetting ||
                  schedule.confirmingDelete
                }
                onCreate={schedule.openCreate}
              />
            )}
          </div>

          {schedule.sortedSchedule.length > 0 && (
            <div className="border-t border-slate-100 bg-slate-50/60 px-4 py-3 sm:px-5">
              <div className="flex flex-col gap-2 text-[10px] text-slate-400 sm:flex-row sm:items-center sm:justify-between">
                <span>
                  {schedule.canManage
                    ? "Gunakan checkbox untuk bulk action atau drag item untuk mengubah urutan."
                    : "Mode read-only: schedule hanya dapat dilihat."}
                </span>

                <span className="font-semibold text-slate-500">
                  Total {formatDuration(schedule.totalDuration)}
                </span>
              </div>
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
