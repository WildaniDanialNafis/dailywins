import type { DraftState, ScheduleBlock } from "../types";

export const APP_NAME = "DailyWins";

export const initialSchedule: ScheduleBlock[] = [
  {
    id: 1,
    start: "05:00",
    end: "05:30",
    activity: "Salat Subuh",
  },
  {
    id: 2,
    start: "06:00",
    end: "06:30",
    activity: "Olahraga",
  },
  {
    id: 3,
    start: "08:00",
    end: "09:00",
    activity: "Belajar",
  },
  {
    id: 4,
    start: "10:00",
    end: "10:30",
    activity: "Membaca Buku",
  },
  {
    id: 5,
    start: "13:00",
    end: "14:00",
    activity: "Deep Work",
  },
];

export const emptyDraft: DraftState = {
  start: "",
  end: "",
  activity: "",
};
