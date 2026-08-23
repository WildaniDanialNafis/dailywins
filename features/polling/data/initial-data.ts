import type { Polling } from "../types";

export const initialPollings: Polling[] = [
  {
    id: 1,
    title: "Ibadah Wajib Hari Ini",
    options: [
      "Shalat 5 waktu di awal waktu",
      "Shalat dhuha",
      "Membaca Al-Qur'an",
    ],
  },
  {
    id: 2,
    title: "Habit Positif Hari Ini",
    options: [
      "Belajar / membaca buku",
      "Healthy routine",
      "Berkarya",
      "Refleksi",
    ],
  },
  {
    id: 3,
    title: "Fokus Utama Hari Ini",
    options: ["Deep Work"],
  },
];
