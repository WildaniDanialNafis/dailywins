export type WeekDay =
  | "Senin"
  | "Selasa"
  | "Rabu"
  | "Kamis"
  | "Jumat"
  | "Sabtu"
  | "Minggu";

export type WeeklyItem = {
  id: number;
  day: WeekDay;
  activity: string;
};

export type ToastState = {
  type: "success" | "error" | "info";
  title: string;
  message: string;
};

export type DeliveryState =
  | "idle"
  | "preparing"
  | "sending"
  | "sent"
  | "failed";

export type DeleteTarget = {
  id: number;
  activity: string;
  day: WeekDay;
} | null;
