"use client";

import { useMemo } from "react";

import { ReadOnlyBanner } from "@/components/auth/read-only-banner";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { usePageLoading } from "@/components/ui/loading-state";
import { PageSkeleton } from "@/components/ui/skeleton";
import { Toast } from "@/components/ui/toast";
import { DeliveryGate } from "@/components/whatsapp/delivery-gate";

import { ScheduleHeader } from "./schedule-header";
import { ScheduleList } from "./schedule-list";
import { ScheduleSidebar } from "./schedule-sidebar";
import { ScheduleWeekOverview } from "./schedule-week-overview";

import { useSchedule } from "../hooks/use-schedule";

export function SchedulePage() {
  const pageLoading = usePageLoading();

  const schedule = useSchedule();

  const deleteDialogDescription = useMemo(
    () =>
      schedule.deleteTarget
        ? `"${schedule.deleteTarget.activity}" pada ${schedule.deleteTarget.day} akan dihapus dari Schedule.`
        : "",
    [schedule.deleteTarget],
  );

  if (pageLoading) {
    return <PageSkeleton />;
  }

  return (
    <div className="min-h-svh">
      <ConfirmDialog
        open={Boolean(schedule.deleteTarget)}
        title="Hapus aktivitas?"
        description={deleteDialogDescription}
        confirmLabel="Hapus aktivitas"
        loading={schedule.confirmingDelete}
        onCancel={schedule.closeDeleteDialog}
        onConfirm={() => void schedule.confirmDelete()}
      />

      <Toast
        open={Boolean(schedule.toast)}
        type={schedule.toast?.type}
        title={schedule.toast?.title}
        message={schedule.toast?.message ?? ""}
        onClose={() => schedule.setToast(null)}
      />

      <DeliveryGate
        open={schedule.deliveryGateOpen}
        onClose={() => schedule.setDeliveryGateOpen(false)}
      />

      <div className="mx-auto w-full max-w-370 px-4 py-5 sm:px-6 sm:py-7 xl:px-8">
        <ScheduleHeader
          canSend={schedule.canSend}
          totalActivities={schedule.totalActivities}
          deliveryState={schedule.deliveryState}
          deliveryBusy={schedule.deliveryBusy}
          onSend={() => void schedule.requestSend()}
        />

        <ReadOnlyBanner />

        <ScheduleWeekOverview
          days={schedule.days}
          counts={schedule.counts}
          activeDay={schedule.activeDay}
          currentDayIndex={schedule.currentDayIndex}
          currentItemsCount={schedule.currentItems.length}
          totalActivities={schedule.totalActivities}
          activeDays={schedule.activeDays}
          deliveryReady={
            schedule.whatsappConnected && Boolean(schedule.activeGroup)
          }
          onSelectDay={schedule.selectDay}
          onPrevious={() => schedule.moveDay(-1)}
          onNext={() => schedule.moveDay(1)}
        />

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <ScheduleList
            activeDay={schedule.activeDay}
            currentItemsCount={schedule.currentItems.length}
            visibleItems={schedule.visibleItems}
            canManage={schedule.canManage}
            saving={schedule.saving}
            deletingId={schedule.deletingId}
            duplicatingId={schedule.duplicatingId}
            editingId={schedule.editingId}
            editingName={schedule.editingName}
            menuId={schedule.menuId}
            search={schedule.search}
            newActivity={schedule.newActivity}
            onSearchChange={schedule.setSearch}
            onClearSearch={() => schedule.setSearch("")}
            onNewActivityChange={schedule.setNewActivity}
            onAddActivity={() => void schedule.addActivity()}
            onEditingNameChange={schedule.setEditingName}
            onSaveEdit={() => void schedule.saveEdit()}
            onCancelEdit={schedule.cancelEdit}
            onStartEdit={schedule.startEdit}
            onDuplicate={(item) => void schedule.duplicateItem(item)}
            onRequestDelete={schedule.requestDeleteItem}
            onToggleMenu={schedule.setMenuId}
            onAdd={() => schedule.setSearch("")}
          />

          <ScheduleSidebar
            activeDay={schedule.activeDay}
            currentItemsCount={schedule.currentItems.length}
            totalActivities={schedule.totalActivities}
            activeDays={schedule.activeDays}
            canSend={schedule.canSend}
            whatsappConnected={schedule.whatsappConnected}
            activeGroupName={schedule.activeGroup?.name}
            deliveryState={schedule.deliveryState}
            deliveryBusy={schedule.deliveryBusy}
            deliveryError={schedule.deliveryError}
            onSend={() => void schedule.requestSend()}
            onResetDelivery={schedule.resetDeliveryState}
          />
        </div>

        <footer className="mt-8 border-t border-slate-200/80 py-5 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} DailyWins. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
