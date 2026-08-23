import { CalendarDays, ClipboardCheck, ListChecks } from "lucide-react";

import type {
  DashboardStats,
  RecentActivity,
  ScheduleItem,
  WorkflowStep,
} from "../types";

export const APP_NAME = "DailyWins";

export const initialTodaySchedule: ScheduleItem[] = [
  {
    time: "05:00",
    activity: "Salat Subuh",
    type: "routine",
  },
  {
    time: "06:00",
    activity: "Olahraga",
    type: "routine",
  },
  {
    time: "08:00",
    activity: "Belajar",
    type: "focus",
  },
  {
    time: "10:00",
    activity: "Membaca Buku",
    type: "learning",
  },
  {
    time: "13:00",
    activity: "Deep Work",
    type: "focus",
  },
];

export const recentActivities: RecentActivity[] = [
  {
    title: "Evaluasi diperbarui",
    description: "Susunan evaluasi berhasil diperbarui.",
    time: "Baru saja",
    icon: ClipboardCheck,
  },
  {
    title: "Polling dibuat",
    description: "Focus Utama Hari Ini",
    time: "10 menit lalu",
    icon: ListChecks,
  },
  {
    title: "Schedule diperbarui",
    description: "Weekly Review ditambahkan ke Jumat.",
    time: "32 menit lalu",
    icon: CalendarDays,
  },
];

export const dashboardStats: DashboardStats = {
  categories: 4,
  activities: 10,
  pollings: 3,
  schedule: 6,
};

export const workflowSteps: WorkflowStep[] = [
  {
    number: "01",
    title: "Buat konten",
    text: "Susun evaluasi, polling, atau schedule.",
  },
  {
    number: "02",
    title: "Atur workflow",
    text: "Tentukan hari, waktu, dan urutan aktivitas.",
  },
  {
    number: "03",
    title: "Siapkan delivery",
    text: "Hubungkan WhatsApp dan pilih active group.",
  },
  {
    number: "04",
    title: "Kirim",
    text: "Distribusikan konten ketika semuanya siap.",
  },
];
