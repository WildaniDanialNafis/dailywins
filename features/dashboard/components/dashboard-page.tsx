"use client";

import {
  BarChart3,
  CalendarDays,
  ClipboardCheck,
  ListChecks,
} from "lucide-react";

import { PageSkeleton } from "@/components/ui/skeleton";
import { usePageLoading } from "@/components/ui/loading-state";

import {
  dashboardStats,
  recentActivities,
  workflowSteps,
} from "../data/initial-data";
import { useDashboard } from "../hooks/use-dashboard";

import { DashboardHeader } from "./dashboard-header";
import { DashboardStatCard } from "./dashboard-stat-card";
import { DeliveryPanel } from "./delivery-panel";
import { QuickAction } from "./quick-action";
import { RecentActivity } from "./recent-activity";
import { TodaySchedule } from "./today-schedule";
import { WorkflowCard } from "./workflow-card";

export function DashboardPage() {
  const pageLoading = usePageLoading();

  const dashboard = useDashboard();

  if (pageLoading) {
    return <PageSkeleton />;
  }

  return (
    <div className="min-h-svh">
      <div className="mx-auto w-full max-w-370 px-4 py-5 sm:px-6 sm:py-7 xl:px-8">
        <DashboardHeader
          lastUpdated={dashboard.lastUpdated}
          refreshing={dashboard.refreshing}
          onRefresh={() => void dashboard.refreshDashboard()}
        />

        <section
          className={[
            "mb-6 overflow-hidden rounded-2xl border shadow-sm",
            dashboard.whatsappConnected && dashboard.activeGroup
              ? "border-emerald-200"
              : "border-slate-200/80",
          ].join(" ")}
        >
          <div
            className={[
              "px-4 py-4 sm:px-5",
              dashboard.whatsappConnected && dashboard.activeGroup
                ? "bg-emerald-50/60"
                : "bg-white",
            ].join(" ")}
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex min-w-0 items-start gap-3">
                <div
                  className={[
                    "grid h-11 w-11 shrink-0 place-items-center rounded-2xl",
                    dashboard.whatsappConnected && dashboard.activeGroup
                      ? "bg-white text-emerald-600 ring-1 ring-emerald-100"
                      : "bg-slate-50 text-slate-500 ring-1 ring-slate-200",
                  ].join(" ")}
                >
                  <span className="text-sm font-bold">WA</span>
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-bold text-slate-900">Delivery</p>

                    <span
                      className={[
                        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold",
                        dashboard.whatsappConnected && dashboard.activeGroup
                          ? "bg-emerald-100 text-emerald-700"
                          : dashboard.whatsappConnected
                            ? "bg-amber-100 text-amber-700"
                            : "bg-slate-100 text-slate-500",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "h-1.5 w-1.5 rounded-full",
                          dashboard.whatsappConnected && dashboard.activeGroup
                            ? "bg-emerald-500"
                            : dashboard.whatsappConnected
                              ? "bg-amber-500"
                              : "bg-slate-400",
                        ].join(" ")}
                      />

                      {dashboard.whatsappConnected && dashboard.activeGroup
                        ? "Ready"
                        : dashboard.whatsappConnected
                          ? "Connected"
                          : "Optional"}
                    </span>
                  </div>

                  <p className="mt-1 truncate text-xs text-slate-500">
                    {dashboard.whatsappConnected && dashboard.activeGroup
                      ? `Target pengiriman: ${dashboard.activeGroup.name}`
                      : "Hubungkan WhatsApp hanya saat ingin melakukan delivery."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <DashboardStatCard
            label="Kategori"
            value={String(dashboardStats.categories)}
            description="Master evaluasi"
            icon={BarChart3}
            tone="bg-indigo-50 text-indigo-600"
            href="/evaluasi"
          />

          <DashboardStatCard
            label="Kegiatan"
            value={String(dashboardStats.activities)}
            description="Dalam library"
            icon={ClipboardCheck}
            tone="bg-emerald-50 text-emerald-600"
            href="/evaluasi"
          />

          <DashboardStatCard
            label="Polling"
            value={String(dashboardStats.pollings)}
            description="Pertanyaan tersimpan"
            icon={ListChecks}
            tone="bg-violet-50 text-violet-600"
            href="/polling"
          />

          <DashboardStatCard
            label="Schedule"
            value={String(dashboardStats.schedule)}
            description="Aktivitas mingguan"
            icon={CalendarDays}
            tone="bg-sky-50 text-sky-600"
            href="/schedule"
          />
        </section>

        <section className="mb-6 grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(300px,0.75fr)]">
          <TodaySchedule
            items={dashboard.todaySchedule}
            completedItems={dashboard.completedItems}
            completionCount={dashboard.recentCompletedCount}
            completionPercentage={dashboard.completionPercentage}
            nextActivity={dashboard.nextActivity}
            canViewDailySchedule={dashboard.canViewDailySchedule}
            onToggle={dashboard.toggleScheduleItem}
          />

          <DeliveryPanel
            connected={dashboard.whatsappConnected}
            activeGroup={dashboard.activeGroup}
            canViewWhatsApp={dashboard.canViewWhatsApp}
          />
        </section>

        {dashboard.quickActions.length > 0 && (
          <section className="mb-6">
            <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-500">
                  Quick actions
                </p>

                <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900">
                  Mulai dari sini
                </h2>
              </div>

              <p className="text-xs text-slate-400">
                Aksi yang tersedia sesuai permission akun.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {dashboard.quickActions.map((action) => (
                <QuickAction key={action.href} {...action} />
              ))}
            </div>
          </section>
        )}

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.8fr)]">
          <RecentActivity
            items={recentActivities}
            canViewReports={dashboard.canViewReports}
          />

          <WorkflowCard steps={workflowSteps} />
        </section>

        <footer className="mt-8 border-t border-slate-200/80 py-5 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} DailyWins. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
