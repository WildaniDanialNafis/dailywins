import type { Category, EvaluationItem } from "../types";

export const initialCategories: Category[] = [
  {
    id: 1,
    name: "Ibadah",
    activities: [
      {
        id: 101,
        name: "Shalat 5 waktu di awal waktu",
      },
      {
        id: 102,
        name: "Shalat dhuha",
      },
      {
        id: 103,
        name: "Membaca Al-Qur'an",
      },
    ],
  },
  {
    id: 2,
    name: "Kesehatan",
    activities: [
      {
        id: 201,
        name: "Olahraga",
      },
      {
        id: 202,
        name: "Minum air yang cukup",
      },
    ],
  },
  {
    id: 3,
    name: "Produktivitas",
    activities: [
      {
        id: 301,
        name: "Deep Work",
      },
      {
        id: 302,
        name: "Menyelesaikan prioritas",
      },
      {
        id: 303,
        name: "Membaca buku",
      },
    ],
  },
  {
    id: 4,
    name: "Refleksi",
    activities: [
      {
        id: 401,
        name: "Evaluasi diri",
      },
      {
        id: 402,
        name: "Mencatat progres",
      },
    ],
  },
];

export const initialEvaluation: EvaluationItem[] = [
  {
    id: 1,
    activityId: 101,
  },
  {
    id: 2,
    activityId: 201,
  },
  {
    id: 3,
    activityId: 301,
  },
  {
    id: 4,
    activityId: 303,
  },
];
