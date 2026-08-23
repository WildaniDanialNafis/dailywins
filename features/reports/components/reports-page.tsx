"use client";

import { usePageLoading } from "@/components/ui/loading-state";
import { PageSkeleton } from "@/components/ui/skeleton";
import { Toast } from "@/components/ui/toast";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { ReadOnlyBanner } from "@/components/auth/read-only-banner";

import { BarChart3, CheckCircle2, Clock3, FileText } from "lucide-react";

import { useReports } from "../hooks/use-reports";

import { ReportsHeader } from "./reports-header";
import { ReportStatCard } from "./report-stat-card";
import { ReportsFilters } from "./reports-filters";
import { ReportItem } from "./report-item";
import { EmptyReports } from "./empty-reports";
import { ReportsPagination } from "./reports-pagination";

export function ReportsPage() {
  const pageLoading = usePageLoading();

  const reports = useReports();

  if (pageLoading) {
    return <PageSkeleton />;
  }

  return (
    <div className="min-h-svh">
      <ConfirmDialog
        open={reports.reportToDelete !== null}
        title="Hapus laporan?"
        description={
          reports.reportToDelete
            ? `"${reports.reportToDelete.title}" akan dihapus dari riwayat laporan. Tindakan ini tidak dapat dibatalkan.`
            : ""
        }
        confirmLabel="Hapus laporan"
        loading={reports.confirmingDelete}
        onCancel={reports.closeDeleteDialog}
        onConfirm={() => void reports.confirmDeleteReport()}
      />

      <Toast
        open={Boolean(reports.toast)}
        type={reports.toast?.type}
        title={reports.toast?.title}
        message={reports.toast?.message ?? ""}
        onClose={() => reports.setToast(null)}
      />

      <div className="mx-auto w-full max-w-370 px-4 py-5 sm:px-6 sm:py-7 xl:px-8">
        <ReportsHeader
          connected={reports.whatsappConnected}
          activeGroup={reports.activeGroup?.name ?? null}
        />

        <ReadOnlyBanner />

        <section className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <ReportStatCard
            label="Total"
            value={String(reports.reports.length)}
            description="Semua aktivitas"
            icon={BarChart3}
            tone="bg-indigo-50 text-indigo-600"
          />

          <ReportStatCard
            label="Terkirim"
            value={String(reports.totalSent)}
            description="Berhasil dikirim"
            icon={CheckCircle2}
            tone="bg-emerald-50 text-emerald-600"
          />

          <ReportStatCard
            label="Terjadwal"
            value={String(reports.totalScheduled)}
            description="Menunggu"
            icon={Clock3}
            tone="bg-amber-50 text-amber-600"
          />

          <ReportStatCard
            label="Draft"
            value={String(reports.totalDraft)}
            description="Belum dikirim"
            icon={FileText}
            tone="bg-slate-100 text-slate-500"
          />
        </section>

        <ReportsFilters
          search={reports.search}
          typeFilter={reports.typeFilter}
          statusFilter={reports.statusFilter}
          sortKey={reports.sortKey}
          sortDirection={reports.sortDirection}
          resultCount={reports.sortedReports.length}
          pageStart={reports.pageStart}
          pageEnd={reports.pageEnd}
          hasActiveFilters={reports.hasActiveFilters}
          onSearchChange={reports.setSearchValue}
          onTypeChange={reports.setTypeFilterValue}
          onStatusChange={reports.setStatusFilterValue}
          onSortChange={reports.handleSortChange}
          onReset={reports.clearFilters}
        />

        <section className="overflow-visible rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-4 py-4 sm:px-5">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-indigo-500">
                  History
                </p>

                <h2 className="mt-1 text-lg font-bold tracking-tight text-slate-900">
                  Riwayat aktivitas
                </h2>
              </div>

              <span className="hidden rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-500 sm:inline-flex">
                {reports.sortedReports.length} hasil
              </span>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {reports.paginatedReports.map((report) => (
              <ReportItem
                key={report.id}
                report={report}
                canSend={reports.canSend}
                canManage={reports.canManage}
                menuOpen={reports.menuId === report.id}
                sending={reports.sendingId === report.id}
                deleting={reports.deletingId === report.id}
                deliveryState={reports.getDeliveryState(report.id)}
                deliveryError={reports.deliveryErrors[report.id]}
                busy={reports.busy}
                onToggleMenu={() =>
                  reports.setMenuId(
                    reports.menuId === report.id ? null : report.id,
                  )
                }
                onCloseMenu={() => reports.setMenuId(null)}
                onSend={() => void reports.sendReport(report.id)}
                onDelete={() => reports.requestDeleteReport(report.id)}
              />
            ))}

            {reports.paginatedReports.length === 0 && (
              <EmptyReports
                hasFilters={reports.hasActiveFilters}
                onReset={reports.clearFilters}
              />
            )}
          </div>

          {reports.sortedReports.length > 0 && (
            <ReportsPagination
              page={reports.page}
              totalPages={reports.totalPages}
              pageStart={reports.pageStart}
              pageEnd={reports.pageEnd}
              totalResults={reports.sortedReports.length}
              onPageChange={reports.setPage}
            />
          )}
        </section>

        <footer className="mt-8 border-t border-slate-200/80 py-5 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} DailyWins. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
