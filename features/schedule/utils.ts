import type { WeekDay } from "./types";

export function simulateDelay(duration: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, duration);
  });
}

export function getDayCounts(
  items: { day: WeekDay }[],
  days: WeekDay[],
): Record<WeekDay, number> {
  return days.reduce<Record<WeekDay, number>>(
    (result, day) => {
      result[day] = items.filter((item) => item.day === day).length;

      return result;
    },
    {
      Senin: 0,
      Selasa: 0,
      Rabu: 0,
      Kamis: 0,
      Jumat: 0,
      Sabtu: 0,
      Minggu: 0,
    },
  );
}

export function getDeliveryButtonLabel(
  state: "idle" | "preparing" | "sending" | "sent" | "failed",
) {
  switch (state) {
    case "preparing":
      return "Menyiapkan...";
    case "sending":
      return "Mengirim...";
    case "sent":
      return "Terkirim";
    case "failed":
      return "Coba lagi";
    default:
      return "Kirim Schedule";
  }
}
