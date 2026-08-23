import { CalendarDays, CheckCircle2, ListChecks } from "lucide-react";

import type { Report, ReportStatus, ReportType, DeliveryState } from "./types";

const monthMap: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  Mei: 4,
  Jun: 5,
  Jul: 6,
  Agu: 7,
  Sep: 8,
  Okt: 9,
  Nov: 10,
  Des: 11,
};

export function simulateDelay(duration: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, duration);
  });
}

export function parseReportDate(report: Report) {
  const [day, month, year] = report.date.split(" ");

  const monthIndex = monthMap[month ?? ""];

  const [hour, minute] = report.time.split(":").map(Number);

  if (
    !day ||
    !year ||
    monthIndex === undefined ||
    Number.isNaN(hour) ||
    Number.isNaN(minute)
  ) {
    return 0;
  }

  return new Date(
    Number(year),
    monthIndex,
    Number(day),
    hour,
    minute,
  ).getTime();
}

export function getReportHref(type: ReportType) {
  if (type === "Evaluasi") {
    return "/evaluasi";
  }

  if (type === "Polling") {
    return "/polling";
  }

  return "/schedule";
}

export function getReportTypeIcon(type: ReportType) {
  if (type === "Evaluasi") {
    return CheckCircle2;
  }

  if (type === "Polling") {
    return ListChecks;
  }

  return CalendarDays;
}

export function getReportTypeTone(type: ReportType) {
  if (type === "Evaluasi") {
    return "bg-indigo-50 text-indigo-600";
  }

  if (type === "Polling") {
    return "bg-violet-50 text-violet-600";
  }

  return "bg-sky-50 text-sky-600";
}

export function getReportStatusTone(status: ReportStatus) {
  if (status === "Terkirim") {
    return "bg-emerald-50 text-emerald-700";
  }

  if (status === "Terjadwal") {
    return "bg-amber-50 text-amber-700";
  }

  return "bg-slate-100 text-slate-600";
}

export function getDeliveryTone(state: DeliveryState) {
  if (state === "preparing") {
    return "bg-amber-50 text-amber-700";
  }

  if (state === "sending") {
    return "bg-indigo-50 text-indigo-700";
  }

  if (state === "sent") {
    return "bg-emerald-50 text-emerald-700";
  }

  if (state === "failed") {
    return "bg-red-50 text-red-700";
  }

  return "bg-slate-100 text-slate-500";
}

export function getDeliveryLabel(state: DeliveryState) {
  if (state === "preparing") {
    return "Preparing";
  }

  if (state === "sending") {
    return "Sending";
  }

  if (state === "sent") {
    return "Sent";
  }

  if (state === "failed") {
    return "Failed";
  }

  return "";
}
