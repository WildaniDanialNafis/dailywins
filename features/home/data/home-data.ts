import {
  ArrowRight,
  BarChart3,
  CalendarClock,
  CalendarDays,
  ClipboardCheck,
  Clock3,
  MessageCircle,
  ShieldCheck,
  Users,
  Wifi,
} from "lucide-react";

import type {
  HomeModule,
  HomeStat,
  InfoCardData,
  QuickFact,
  WorkflowPreviewItem,
  WorkflowStep,
} from "../types";

export const APP_NAME = "DailyWins";
export const APP_SUBTITLE = "Operations Workspace";

export const modules: HomeModule[] = [
  {
    title: "Evaluasi",
    description:
      "Kelola kategori, kegiatan, dan susunan evaluasi dalam satu editor.",
    detail: "Library → Susunan → Delivery",
    icon: ClipboardCheck,
    href: "/login?next=/evaluasi",
    tone: "bg-indigo-50 text-indigo-600",
    accent: "border-indigo-100 hover:border-indigo-200",
  },
  {
    title: "Polling",
    description:
      "Buat pertanyaan, kelola pilihan jawaban, lalu kirim saat siap.",
    detail: "Question → Options → Send",
    icon: BarChart3,
    href: "/login?next=/polling",
    tone: "bg-violet-50 text-violet-600",
    accent: "border-violet-100 hover:border-violet-200",
  },
  {
    title: "Schedule",
    description:
      "Tentukan aktivitas berdasarkan hari dan susun weekly workflow.",
    detail: "Week → Activity → Delivery",
    icon: CalendarDays,
    href: "/login?next=/schedule",
    tone: "bg-sky-50 text-sky-600",
    accent: "border-sky-100 hover:border-sky-200",
  },
  {
    title: "Daily Schedule",
    description:
      "Atur jam dan urutan aktivitas harian dengan lebih terstruktur.",
    detail: "Time → Order → Send",
    icon: CalendarClock,
    href: "/login?next=/daily-schedule",
    tone: "bg-amber-50 text-amber-600",
    accent: "border-amber-100 hover:border-amber-200",
  },
];

export const workflowSteps: WorkflowStep[] = [
  {
    label: "Create",
    shortLabel: "Create",
    description: "Siapkan evaluasi, polling, dan schedule.",
    icon: ClipboardCheck,
  },
  {
    label: "Plan",
    shortLabel: "Plan",
    description: "Atur hari, waktu, dan urutan aktivitas.",
    icon: CalendarDays,
  },
  {
    label: "Connect",
    shortLabel: "Connect",
    description: "Hubungkan WhatsApp hanya ketika dibutuhkan.",
    icon: MessageCircle,
  },
  {
    label: "Send",
    shortLabel: "Send",
    description: "Distribusikan ke active group yang dipilih.",
    icon: ArrowRight,
  },
];

export const stats: HomeStat[] = [
  {
    value: "24",
    label: "Aktivitas",
    description: "tersusun",
  },
  {
    value: "03",
    label: "Polling",
    description: "tersimpan",
  },
  {
    value: "07",
    label: "Hari",
    description: "terencana",
  },
  {
    value: "06",
    label: "Slot",
    description: "hari ini",
  },
];

export const quickFacts: QuickFact[] = [
  {
    icon: ShieldCheck,
    label: "Private workspace",
  },
  {
    icon: Wifi,
    label: "WhatsApp optional",
  },
  {
    icon: Users,
    label: "Active group delivery",
  },
];

export const workflowPreview: WorkflowPreviewItem[] = [
  {
    time: "05:00",
    title: "Salat Subuh",
    type: "Routine",
    tone: "bg-emerald-50 text-emerald-700",
  },
  {
    time: "08:00",
    title: "Belajar",
    type: "Focus",
    tone: "bg-indigo-50 text-indigo-700",
  },
  {
    time: "10:00",
    title: "Membaca Buku",
    type: "Learning",
    tone: "bg-violet-50 text-violet-700",
  },
];

export const infoCards: InfoCardData[] = [
  {
    icon: MessageCircle,
    title: "WhatsApp adalah delivery channel",
    description:
      "Workspace tetap bisa digunakan untuk membuat dan mengatur konten tanpa koneksi WhatsApp.",
  },
  {
    icon: ShieldCheck,
    title: "Private workspace",
    description:
      "Akses dimulai dari login, sementara permission menentukan tindakan yang tersedia.",
  },
  {
    icon: Clock3,
    title: "Workflow terstruktur",
    description:
      "Create, plan, connect, lalu send. Setiap tahap memiliki konteks dan status yang jelas.",
  },
];
