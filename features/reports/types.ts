import type { LucideIcon } from "lucide-react";

export type ReportType = "Evaluasi" | "Polling" | "Schedule";

export type ReportStatus = "Terkirim" | "Draft" | "Terjadwal";

export type DeliveryState =
  | "idle"
  | "preparing"
  | "sending"
  | "sent"
  | "failed";

export type SortKey = "date" | "title" | "type" | "status";

export type SortDirection = "asc" | "desc";

export type Report = {
  id: number;
  title: string;
  type: ReportType;
  status: ReportStatus;
  target: string;
  date: string;
  time: string;
  count: string;
};

export type ToastState = {
  type: "success" | "error" | "info";
  title: string;
  message: string;
};

export type ReportMenuProps = {
  report: Report;
  canSend: boolean;
  canManage: boolean;
  sending: boolean;
  deleting: boolean;
  deliveryState: DeliveryState;
  disabled: boolean;
  onClose: () => void;
  onSend: () => void;
  onDelete: () => void;
};

export type StatCardProps = {
  label: string;
  value: string;
  description: string;
  icon: LucideIcon;
  tone: string;
};
