"use client";

import { BarChart3, Check, Users } from "lucide-react";

import { ReadOnlyBanner } from "@/components/auth/read-only-banner";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { usePageLoading } from "@/components/ui/loading-state";
import { PageSkeleton } from "@/components/ui/skeleton";
import { Toast } from "@/components/ui/toast";
import { DeliveryGate } from "@/components/whatsapp/delivery-gate";

import { ActivityLibrary } from "./activity-library";
import { EvaluationDraft } from "./evaluation-draft";
import { EvaluasiHeader } from "./evaluasi-header";
import { StatCard } from "./stat-card";
import { useEvaluasi } from "../hooks/use-evaluasi";

export function EvaluasiPage() {
  const pageLoading = usePageLoading();

  const evaluasi = useEvaluasi();

  if (pageLoading) {
    return <PageSkeleton />;
  }

  const deleteDialogCopy =
    evaluasi.deleteTarget?.type === "category"
      ? {
          title: "Hapus kategori?",
          description: `"${evaluasi.deleteTarget.label}" dan seluruh kegiatan di dalamnya akan dihapus dari library dan susunan evaluasi.`,
          confirmLabel: "Hapus kategori",
        }
      : evaluasi.deleteTarget?.type === "activity"
        ? {
            title: "Hapus kegiatan?",
            description: `"${evaluasi.deleteTarget.label}" akan dihapus dari library dan susunan evaluasi.`,
            confirmLabel: "Hapus kegiatan",
          }
        : {
            title: "Hapus dari evaluasi?",
            description: `"${evaluasi.deleteTarget?.label ?? "Kegiatan ini"}" akan dikeluarkan dari susunan evaluasi, tetapi tetap tersedia di library.`,
            confirmLabel: "Hapus dari evaluasi",
          };

  return (
    <div className="min-h-svh">
      <ConfirmDialog
        open={Boolean(evaluasi.deleteTarget)}
        title={deleteDialogCopy.title}
        description={deleteDialogCopy.description}
        confirmLabel={deleteDialogCopy.confirmLabel}
        loading={evaluasi.confirmingDelete}
        onCancel={evaluasi.closeDeleteDialog}
        onConfirm={() => void evaluasi.confirmDelete()}
      />

      <Toast
        open={Boolean(evaluasi.toast)}
        type={evaluasi.toast?.type}
        title={evaluasi.toast?.title}
        message={evaluasi.toast?.message ?? ""}
        onClose={evaluasi.clearToast}
      />

      <DeliveryGate
        open={evaluasi.deliveryGateOpen}
        onClose={() => evaluasi.setDeliveryGateOpen(false)}
      />

      <div className="mx-auto w-full max-w-370 px-4 py-5 sm:px-6 sm:py-7 xl:px-8">
        <EvaluasiHeader
          canSend={evaluasi.canSend}
          readyForSend={evaluasi.readyForSend}
          deliveryBusy={evaluasi.deliveryBusy}
          deliveryState={evaluasi.deliveryState}
          onSend={() => void evaluasi.requestSend()}
          onResetDelivery={evaluasi.resetDeliveryState}
        />

        <ReadOnlyBanner />

        <section className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard
            label="Kategori"
            value={String(evaluasi.categories.length)}
            description="Kategori kegiatan"
            icon={BarChart3}
            tone="bg-indigo-50 text-indigo-600"
          />

          <StatCard
            label="Kegiatan"
            value={String(evaluasi.totalActivities)}
            description="Master kegiatan"
            icon={Users}
            tone="bg-emerald-50 text-emerald-600"
          />

          <StatCard
            label="Disusun"
            value={String(evaluasi.evaluationPreview.length)}
            description={`${evaluasi.selectedCategoryCount} kategori terpakai`}
            icon={Check}
            tone="bg-violet-50 text-violet-600"
          />

          <StatCard
            label="WhatsApp"
            value={evaluasi.whatsappConnected ? "Ready" : "Optional"}
            description={
              evaluasi.whatsappConnected
                ? (evaluasi.activeGroup?.name ?? "Pilih grup")
                : "Connect saat send"
            }
            icon={Users}
            tone={
              evaluasi.whatsappConnected
                ? "bg-emerald-50 text-emerald-600"
                : "bg-slate-100 text-slate-500"
            }
          />
        </section>

        <ActivityLibrary
          canManage={evaluasi.canManage}
          categories={evaluasi.categories}
          filteredCategories={evaluasi.filteredCategories}
          selectedActivityIds={evaluasi.selectedActivityIds}
          expandedCategoryIds={evaluasi.expandedCategoryIds}
          categoryMenuId={evaluasi.categoryMenuId}
          editingCategoryId={evaluasi.editingCategoryId}
          editingCategoryName={evaluasi.editingCategoryName}
          editingActivityId={evaluasi.editingActivityId}
          editingActivityName={evaluasi.editingActivityName}
          activityCategoryId={evaluasi.activityCategoryId}
          newCategoryName={evaluasi.newCategoryName}
          newActivityName={evaluasi.newActivityName}
          search={evaluasi.search}
          searchActive={evaluasi.searchActive}
          libraryIsEmpty={evaluasi.libraryIsEmpty}
          searchHasNoResults={evaluasi.searchHasNoResults}
          saving={evaluasi.saving}
          deletingCategoryId={evaluasi.deletingCategoryId}
          deletingActivityId={evaluasi.deletingActivityId}
          onSearchChange={evaluasi.setSearch}
          onClearSearch={() => evaluasi.setSearch("")}
          onExpandAll={evaluasi.expandAll}
          onCollapseAll={evaluasi.collapseAll}
          onNewCategoryChange={evaluasi.setNewCategoryName}
          onAddCategory={() => void evaluasi.addCategory()}
          onToggleCategory={evaluasi.toggleCategory}
          onToggleCategoryMenu={(id) =>
            evaluasi.setCategoryMenuId(
              evaluasi.categoryMenuId === id ? null : id,
            )
          }
          onStartEditCategory={evaluasi.startEditCategory}
          onSaveCategory={() => void evaluasi.saveCategory()}
          onCancelEditCategory={evaluasi.cancelEditCategory}
          onChangeCategoryName={evaluasi.setEditingCategoryName}
          onDeleteCategory={evaluasi.requestDeleteCategory}
          onStartEditActivity={evaluasi.startEditActivity}
          onSaveActivity={(id) => void evaluasi.saveActivity(id)}
          onCancelEditActivity={evaluasi.cancelEditActivity}
          onChangeActivityName={evaluasi.setEditingActivityName}
          onDeleteActivity={evaluasi.requestDeleteActivity}
          onSelectActivityCategory={(id) => evaluasi.setActivityCategoryId(id)}
          onChangeNewActivity={evaluasi.setNewActivityName}
          onAddActivity={() => void evaluasi.addActivity()}
          onAddToEvaluation={(id) => void evaluasi.addToEvaluation(id)}
          onCreateFirstCategory={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        />

        <EvaluationDraft
          canManage={evaluasi.canManage}
          canSend={evaluasi.canSend}
          evaluationItems={evaluasi.evaluationItems}
          evaluationPreview={evaluasi.evaluationPreview}
          draggedEvaluationId={evaluasi.draggedEvaluationId}
          removingEvaluationId={evaluasi.removingEvaluationId}
          deliveryState={evaluasi.deliveryState}
          deliveryBusy={evaluasi.deliveryBusy}
          deliveryError={evaluasi.deliveryError}
          whatsappConnected={evaluasi.whatsappConnected}
          activeGroupName={evaluasi.activeGroup?.name}
          onSetDraggedId={evaluasi.setDraggedEvaluationId}
          onDrop={evaluasi.reorderEvaluation}
          onRemove={evaluasi.requestRemoveEvaluation}
          onScrollToLibrary={evaluasi.scrollToLibrary}
          onSend={() => void evaluasi.requestSend()}
          onResetDelivery={evaluasi.resetDeliveryState}
        />

        <footer className="mt-8 border-t border-slate-200/80 py-5 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} DailyWins. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
