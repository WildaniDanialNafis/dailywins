import type { ScheduleBlock } from "./types";

export function toMinutes(value: string) {
  const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(value);

  if (!match) {
    return Number.NaN;
  }

  return Number(match[1]) * 60 + Number(match[2]);
}

export function isValidTime(value: string) {
  return !Number.isNaN(toMinutes(value));
}

export function normalizeTime(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);

  if (digits.length <= 2) {
    return digits;
  }

  return `${digits.slice(0, 2)}:${digits.slice(2)}`;
}

export function getDuration(start: string, end: string) {
  const startMinutes = toMinutes(start);
  const endMinutes = toMinutes(end);

  if (
    Number.isNaN(startMinutes) ||
    Number.isNaN(endMinutes) ||
    endMinutes <= startMinutes
  ) {
    return null;
  }

  return endMinutes - startMinutes;
}

export function formatDuration(minutes: number | null) {
  if (minutes === null) {
    return "—";
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes}m`;
  }

  if (remainingMinutes === 0) {
    return `${hours}j`;
  }

  return `${hours}j ${remainingMinutes}m`;
}

export function formatTime(totalMinutes: number) {
  const safeMinutes = Math.max(0, Math.min(totalMinutes, 24 * 60 - 1));

  const hours = Math.floor(safeMinutes / 60);
  const minutes = safeMinutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0",
  )}`;
}

export function sortSchedule(schedule: ScheduleBlock[]) {
  return [...schedule].sort((a, b) => toMinutes(a.start) - toMinutes(b.start));
}

export function getNextScheduleId(schedule: ScheduleBlock[]) {
  return Math.max(0, ...schedule.map((item) => item.id)) + 1;
}

export function hasOverlappingSchedule(
  schedule: ScheduleBlock[],
  start: number,
  end: number,
  excludeId?: number | null,
) {
  return schedule.some((item) => {
    if (item.id === excludeId) {
      return false;
    }

    const itemStart = toMinutes(item.start);
    const itemEnd = toMinutes(item.end);

    return start < itemEnd && end > itemStart;
  });
}

export function hasDuplicateActivity(
  schedule: ScheduleBlock[],
  activity: string,
  excludeId?: number | null,
) {
  return schedule.some(
    (item) =>
      item.id !== excludeId &&
      item.activity.trim().toLowerCase() === activity.trim().toLowerCase(),
  );
}
