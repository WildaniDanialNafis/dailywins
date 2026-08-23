"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarClock,
  CalendarDays,
  ClipboardCheck,
  ListChecks,
} from "lucide-react";

import { useAuth } from "@/components/auth/auth-context";
import { useWorkspace } from "@/components/workspace/workspace-context";

import { initialTodaySchedule } from "../data/initial-data";
import type { QuickAction } from "../types";
import { calculateCompletionPercentage, getScheduleItemKey } from "../utils";

export function useDashboard() {
  const { hasPermission } = useAuth();

  const { whatsappConnected, activeGroup } = useWorkspace();

  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());

  const [refreshing, setRefreshing] = useState(false);

  const [lastUpdated, setLastUpdated] = useState("Baru saja");

  const canManageEvaluation = hasPermission("evaluasi.manage");

  const canManagePolling = hasPermission("polling.manage");

  const canManageSchedule = hasPermission("schedule.manage");

  const canManageDailySchedule = hasPermission("daily-schedule.manage");

  const canViewDailySchedule = hasPermission("daily-schedule.view");

  const canViewReports = hasPermission("reports.view");

  const canViewWhatsApp = hasPermission("whatsapp.view");

  const completionCount = completedItems.size;

  const completionPercentage = calculateCompletionPercentage(
    completionCount,
    initialTodaySchedule.length,
  );

  const nextActivity = useMemo(
    () =>
      initialTodaySchedule.find(
        (item) =>
          !completedItems.has(getScheduleItemKey(item.time, item.activity)),
      ),
    [completedItems],
  );

  const quickActions = useMemo<QuickAction[]>(
    () =>
      [
        canManageEvaluation
          ? {
              href: "/evaluasi",
              title: "Buat Evaluasi",
              description: "Kelola kategori, kegiatan, dan susunan evaluasi.",
              icon: ClipboardCheck,
              tone: "bg-indigo-50 text-indigo-600",
            }
          : null,

        canManagePolling
          ? {
              href: "/polling",
              title: "Buat Polling",
              description: "Buat pertanyaan dan pilihan jawaban.",
              icon: ListChecks,
              tone: "bg-violet-50 text-violet-600",
            }
          : null,

        canManageSchedule
          ? {
              href: "/schedule",
              title: "Atur Schedule",
              description: "Tentukan aktivitas dilakukan pada hari apa.",
              icon: CalendarDays,
              tone: "bg-sky-50 text-sky-600",
            }
          : null,

        canManageDailySchedule
          ? {
              href: "/daily-schedule",
              title: "Atur Daily Schedule",
              description: "Tentukan jam dan urutan aktivitas.",
              icon: CalendarClock,
              tone: "bg-amber-50 text-amber-600",
            }
          : null,
      ].filter((action): action is QuickAction => action !== null),
    [
      canManageEvaluation,
      canManagePolling,
      canManageSchedule,
      canManageDailySchedule,
    ],
  );

  function toggleScheduleItem(time: string, activity: string) {
    const key = getScheduleItemKey(time, activity);

    setCompletedItems((current) => {
      const next = new Set(current);

      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }

      return next;
    });
  }

  async function refreshDashboard() {
    if (refreshing) {
      return;
    }

    setRefreshing(true);

    try {
      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 650);
      });

      setLastUpdated("Baru saja");
    } finally {
      setRefreshing(false);
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLastUpdated("Beberapa saat lalu");
    }, 12000);

    return () => window.clearTimeout(timer);
  }, [lastUpdated]);

  return {
    todaySchedule: initialTodaySchedule,

    recentCompletedCount: completionCount,

    completionPercentage,
    nextActivity,

    completedItems,
    toggleScheduleItem,

    refreshing,
    lastUpdated,
    refreshDashboard,

    quickActions,

    canViewDailySchedule,
    canViewReports,
    canViewWhatsApp,

    whatsappConnected,
    activeGroup,
  };
}
