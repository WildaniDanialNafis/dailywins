import type { WeekDay, WeeklyItem } from "../types";

export const APP_NAME = "DailyWins";

export const days: WeekDay[] = [
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
  "Minggu",
];

export const initialItems: WeeklyItem[] = [
  {
    id: 1,
    day: "Senin",
    activity: "Weekly Planning",
  },
  {
    id: 2,
    day: "Senin",
    activity: "Deep Work",
  },
  {
    id: 3,
    day: "Selasa",
    activity: "Learning Session",
  },
  {
    id: 4,
    day: "Rabu",
    activity: "Exercise",
  },
  {
    id: 5,
    day: "Kamis",
    activity: "Project Review",
  },
  {
    id: 6,
    day: "Jumat",
    activity: "Weekly Reflection",
  },
];
